import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const expFunction: BuiltInFunctionSpec = {
  name: "exp",
  handler: (x: Decimal | number) => {
    const input = new Decimal(x);

    // Check for very large exponents
    if (input.abs().greaterThan(1000)) {
      throw new Error('Exponent too large');
    }

    // Calculate e^x with high precision
    return Decimal.exp(input).toDP(10);
  },
  description: "Calculates e raised to the power x (e^x). Special cases: exp(0) = 1, exp(1) = e ≈ 2.7182818285. Throws error for very large exponents.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The exponent",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "e raised to the power x",
  examples: [
    {
      title: "Exponential calculations with various inputs",
      code: `// Special cases
@zero = 0
@one = 1

@expZero = exp(@zero)  // e^0 = 1
@expOne = exp(@one)    // e^1 = e

// Positive exponents
@expPositive = exp(2)      // e^2 ≈ 7.3890560989
@expFraction = exp(0.5)    // e^0.5 ≈ 1.6487212707
@expLarge = exp(10)        // e^10 ≈ 22026.4657948067

// Negative exponents
@expNegative = exp(-1)     // e^(-1) ≈ 0.3678794412
@expNegFraction = exp(-0.5)  // e^(-0.5) ≈ 0.6065306597

// Results
\`e^0 = @expZero\`
\`e^1 = @expOne\`
\`e^2 = @expPositive\`
\`e^0.5 = @expFraction\`
\`e^10 = @expLarge\`
\`e^(-1) = @expNegative\`
\`e^(-0.5) = @expNegFraction\``,
    },
  ],
}; 