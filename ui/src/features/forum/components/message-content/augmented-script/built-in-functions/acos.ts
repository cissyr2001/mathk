import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";
import { CONSTANTS } from "../constants.constant";

export const acosFunction: BuiltInFunctionSpec = {
  name: "acos",
  handler: (x: Decimal | number) => {
    const xDecimal = new Decimal(x);
    if (xDecimal.lessThan(-1) || xDecimal.greaterThan(1)) {
      throw new Error('Input must be between -1 and 1 inclusive');
    }
    return Decimal.acos(xDecimal).toDP(10);
  },
  description: "Calculates the arccosine (inverse cosine) of a number. Returns the angle in radians. The input must be between -1 and 1 inclusive. Special cases: acos(1) = 0, acos(0) = π/2, acos(-1) = π. Throws an error for inputs outside [-1, 1].",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number between -1 and 1 inclusive",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The arccosine of the input in radians",
  examples: [
    {
      title: "Arccosine calculations with various values",
      code: `// Special cases (1, 0, -1)
@one = 1
@zero = 0
@negOne = -1

@acosOne = acos(@one)      // acos(1) = 0
@acosZero = acos(@zero)    // acos(0) = π/2
@acosNegOne = acos(@negOne) // acos(-1) = π

// Common values (0.5, 0.7071, 0.8660)
@half = 0.5
@sqrt2Over2 = 0.7071
@sqrt3Over2 = 0.8660

@acosHalf = acos(@half)        // acos(0.5) = π/3
@acosSqrt2Over2 = acos(@sqrt2Over2) // acos(0.7071) ≈ π/4
@acosSqrt3Over2 = acos(@sqrt3Over2) // acos(0.8660) ≈ π/6

// Converting to degrees
@acosHalfDegrees = acos(@half) * 180 / PI // acos(0.5) = 60°

// Results
\`"acos(1)" = @acosOne\`
\`"acos(0)" = @acosZero\`
\`"acos(-1)" = @acosNegOne\`
\`"acos(0.5)" = @acosHalf\`
\`"acos(0.7071)" = @acosSqrt2Over2\`
\`"acos(0.8660)" = @acosSqrt3Over2\`
\`"acos(0.5) in degrees" = @acosHalfDegrees\``,
    },
  ],
}; 