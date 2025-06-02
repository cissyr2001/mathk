import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";
import { CONSTANTS } from "../constants.constant";

export const atanFunction: BuiltInFunctionSpec = {
  name: "atan",
  handler: (input: Decimal): Decimal => {
    // Handle special cases
    if (input.isZero()) {
      return new Decimal(0);
    }
    if (input.isNaN() || !input.isFinite()) {
      throw new Error('Invalid input: Input must be a finite number');
    }

    // For very large values, return π/2 or -π/2
    if (input.abs().gt(1e10)) {
      const piOverTwo = CONSTANTS.PI.dividedBy(2);
      return input.isPositive() ? piOverTwo.toDP(10) : piOverTwo.neg().toDP(10);
    }

    // Calculate arctangent with high precision
    return Decimal.atan(input).toDP(10);
  },
  description: "Calculates the arctangent (inverse tangent) of a number. Returns the angle in radians. Special cases: atan(0) = 0, atan(1) = π/4 ≈ 0.7853981634, atan(∞) = π/2 ≈ 1.5707963268.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to calculate arctangent for",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The arctangent in radians",
  examples: [
    {
      title: "Arctangent calculations with various values",
      code: `// Special cases
@zero = 0
@one = 1
@negOne = -1

@atanZero = atan(@zero)  // atan(0) = 0
@atanOne = atan(@one)    // atan(1) = π/4
@atanNegOne = atan(-1)   // atan(-1) = -π/4

// Common values
@atanSqrt3 = atan(1.732050808)  // atan(√3) = π/3
@atanHalf = atan(0.5)           // atan(0.5) ≈ 0.4636476090
@atanTwo = atan(2)              // atan(2) ≈ 1.1071487178

// Converting to degrees
@atanHalfDegrees = atan(0.5) * 180 / PI // atan(0.5) ≈ 26.565°

// Results
\`"atan(0)" = @atanZero\`
\`"atan(1)" = @atanOne\`
\`"atan(-1)" = @atanNegOne\`
\`"atan(√3)" = @atanSqrt3\`
\`"atan(0.5)" = @atanHalf\`
\`"atan(2)" = @atanTwo\`
\`"atan(0.5) in degrees" = @atanHalfDegrees\``,
    },
  ],
}; 