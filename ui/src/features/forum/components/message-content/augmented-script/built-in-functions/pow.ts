import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const powFunction: BuiltInFunctionSpec = {
  name: "pow",
  handler: (x: Decimal | number, y: Decimal | number) => {
    const base = new Decimal(x);
    const exponent = new Decimal(y);

    // Check for negative base with non-integer exponent
    if (base.isNegative() && !exponent.isInteger()) {
      throw new Error('Cannot raise negative number to non-integer power');
    }

    // Handle special cases
    if (base.isZero() && exponent.isZero()) {
      return new Decimal(1); // 0^0 = 1
    }

    // Check for 0 raised to negative power
    if (base.isZero() && exponent.isNegative()) {
      throw new Error('Cannot raise 0 to a negative power');
    }

    // Calculate power with high precision
    return base.pow(exponent).toDP(10);
  },
  description: "Calculates x raised to the power y (x^y). Handles integer and fractional exponents, including negative values. Special cases: x^0 = 1 (for x ≠ 0), x^1 = x, 0^0 = 1.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The base number",
      required: true,
    },
    {
      name: "y",
      type: "Decimal | number",
      description: "The exponent",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "x raised to the power y",
  examples: [
    {
      title: 'Power operations with various bases and exponents',
      code: `// Special cases
@base = 2
@zero = 0
@one = 1

@zeroPower = pow(@base, 0)  // 2^0 = 1
@onePower = pow(@base, 1)   // 2^1 = 2
@zeroToZero = pow(@zero, @zero)  // 0^0 = 1

// Integer exponents
@positivePower = pow(@base, 3)    // 2^3 = 8
@negativePower = pow(@base, -2)   // 2^(-2) = 0.25
@largePower = pow(@base, 10)      // 2^10 = 1024

// Fractional exponents (roots)
@sqrt = pow(16, 0.5)      // 16^0.5 = 4 (square root)
@cubeRoot = pow(27, 1/3)  // 27^(1/3) = 3 (cube root)
@fractionalPower = pow(8, 2/3)    // 8^(2/3) = 4
@negativeFractional = pow(4, -0.5)  // 4^(-0.5) = 0.5

// Negative base with integer exponent
@negBase = -2
@negBaseEvenPower = pow(@negBase, 4)  // (-2)^4 = 16
@negBaseOddPower = pow(@negBase, 3)   // (-2)^3 = -8

// Results
\`2^0 = @zeroPower\`
\`2^1 = @onePower\`
\`0^0 = @zeroToZero\`
\`2^3 = @positivePower\`
\`"2^(-2)" = @negativePower\`
\`2^10 = @largePower\`
\`16^0.5 = @sqrt\`
\`"27^(1/3)" = @cubeRoot\`
\`"8^(2/3)" = @fractionalPower\`
\`"4^(-0.5)" = @negativeFractional\`
\`"(-2)^4" = @negBaseEvenPower\`
\`"(-2)^3" = @negBaseOddPower\``,
    },
  ],
}; 