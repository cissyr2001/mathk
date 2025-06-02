import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const asinFunction: BuiltInFunctionSpec = {
  name: "asin",
  handler: (x: Decimal | number) => {
    const xDecimal = new Decimal(x);
    if (xDecimal.lessThan(-1) || xDecimal.greaterThan(1)) {
      throw new Error('Input must be between -1 and 1 inclusive');
    }
    return Decimal.asin(xDecimal).toDP(10);
  },
  description: "Calculates the arcsine (inverse sine) of a number. Returns the angle in radians. The input must be between -1 and 1 inclusive. Special cases: asin(0) = 0, asin(1) = π/2, asin(-1) = -π/2. Throws an error for inputs outside [-1, 1].",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number between -1 and 1 inclusive",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The arcsine of the input in radians",
  examples: [
    {
      title: "Arcsine calculations with various values",
      code: `// Special cases (0, 1, -1)
@zero = 0
@one = 1
@negOne = -1

@asinZero = asin(@zero)    // asin(0) = 0
@asinOne = asin(@one)      // asin(1) = π/2
@asinNegOne = asin(@negOne) // asin(-1) = -π/2

// Common values (0.5, 0.7071, 0.8660)
@half = 0.5
@sqrt2Over2 = 0.7071
@sqrt3Over2 = 0.8660

@asinHalf = asin(@half)        // asin(0.5) = π/6
@asinSqrt2Over2 = asin(@sqrt2Over2) // asin(0.7071) ≈ π/4
@asinSqrt3Over2 = asin(@sqrt3Over2) // asin(0.8660) ≈ π/3

// Converting to degrees
@asinHalfDegrees = asin(@half) * 180 / PI // asin(0.5) = 30°

// Results
\`"asin(0)" = @asinZero\`
\`"asin(1)" = @asinOne\`
\`"asin(-1)" = @asinNegOne\`
\`"asin(0.5)" = @asinHalf\`
\`"asin(0.7071)" = @asinSqrt2Over2\`
\`"asin(0.8660)" = @asinSqrt3Over2\`
\`"asin(0.5) in degrees" = @asinHalfDegrees\``,
    },
  ],
}; 