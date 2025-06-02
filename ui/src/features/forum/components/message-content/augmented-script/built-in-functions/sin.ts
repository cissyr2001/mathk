import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";
import { CONSTANTS } from "../constants.constant";

export const sinFunction: BuiltInFunctionSpec = {
  name: "sin",
  handler: (x: Decimal) => {
    // Check if x is a multiple of π
    const pi = CONSTANTS.PI as unknown as Decimal;
    const remainder = x.mod(pi);
    if (remainder.isZero()) {
      return new Decimal(0);
    }
    return Decimal.sin(x);
  },
  description: "Calculates the sine of a number (in radians). Returns the sine value as a decimal. Special cases: sin(0) = 0, sin(π/2) = 1, sin(π) = 0, sin(3π/2) = -1. The function handles multiples of π efficiently.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The angle in radians",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The sine of the input angle",
  examples: [
    {
      title: "Sine calculations with various angles",
      code: `// Special cases (0, π/2, π, 3π/2)
@zero = 0
@pi = PI
@piOver2 = PI / 2
@threePiOver2 = 3 * PI / 2

@sinZero = sin(@zero)
@sinPiOver2 = sin(@piOver2)
@sinPi = sin(@pi)
@sinThreePiOver2 = sin(@threePiOver2)

// Common angles (π/6, π/4, π/3)
@piOver6 = PI / 6
@piOver4 = PI / 4
@piOver3 = PI / 3

@sinPiOver6 = sin(@piOver6)
@sinPiOver4 = sin(@piOver4)
@sinPiOver3 = sin(@piOver3)

// Converting degrees to radians
@degrees = 30
@radians = @degrees * PI / 180
@sin30Degrees = sin(@radians)

// Results
\`"sin(0)" = @sinZero\`
\`"sin(π/2)" = @sinPiOver2\`
\`"sin(π)" = @sinPi\`
\`"sin(3π/2)" = @sinThreePiOver2\`
\`"sin(π/6)" = @sinPiOver6\`
\`"sin(π/4)" = @sinPiOver4\`
\`"sin(π/3)" = @sinPiOver3\`
\`"sin(30°)" = @sin30Degrees\``,
    },
  ],
}; 