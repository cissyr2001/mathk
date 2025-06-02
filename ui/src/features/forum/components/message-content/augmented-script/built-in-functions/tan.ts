import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const tanFunction: BuiltInFunctionSpec = {
  name: "tan",
  handler: (x: Decimal | number) => {
    const input = new Decimal(x);
    const pi = Decimal.acos(-1);
    const piOver2 = pi.dividedBy(2);

    // Check for undefined values (odd multiples of π/2)
    const remainder = input.mod(piOver2);
    if (remainder.isZero()) {
      const quotient = input.dividedBy(piOver2);
      if (!quotient.mod(2).isZero()) {
        throw new Error('Tangent is undefined for odd multiples of π/2');
      }
      return new Decimal(0);
    }

    // Check for exact π/2 or 3π/2
    if (input.eq(piOver2) || input.eq(piOver2.times(3))) {
      throw new Error('Tangent is undefined for odd multiples of π/2');
    }

    // Calculate tangent with high precision
    return Decimal.tan(input).toDP(10);
  },
  description: "Calculates the tangent of an angle in radians. Special cases: tan(0) = 0, tan(π/4) = 1, tan(π/3) = √3 ≈ 1.732050808. Throws error for odd multiples of π/2 where tangent is undefined.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The angle in radians",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The tangent of the angle",
  examples: [
    {
      title: "Tangent calculations with various angles",
      code: `// Special cases
@zero = 0
@pi = 3.1415926536
@piOver4 = @pi / 4
@piOver3 = @pi / 3

@tanZero = tan(@zero)      // tan(0) = 0
@tanPiOver4 = tan(@piOver4)  // tan(π/4) = 1
@tanPiOver3 = tan(@piOver3)  // tan(π/3) = √3

// Common angles
@tanPiOver6 = tan(@pi / 6)    // tan(π/6) ≈ 0.5773502692
@tanPiOver2 = tan(@pi / 2)    // Error: undefined
@tanPi = tan(@pi)             // tan(π) = 0

// Results
\`"tan(0)" = @tanZero\`
\`"tan(π/4)" = @tanPiOver4\`
\`"tan(π/3)" = @tanPiOver3\`
\`"tan(π/6)" = @tanPiOver6\`
\`"tan(π)" = @tanPi\``,
    },
  ],
}; 