import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";
import { CONSTANTS } from "../constants.constant";

export const cosFunction: BuiltInFunctionSpec = {
  name: "cos",
  handler: (x: Decimal) => {
    // Check if x is a multiple of π/2
    const pi = CONSTANTS.PI as unknown as Decimal;
    const piOver2 = pi.dividedBy(2);
    const remainder = x.mod(piOver2);
    
    // For exact multiples of π/2, return 0, 1, or -1
    if (remainder.isZero()) {
      const quotient = x.dividedBy(piOver2);
      if (quotient.mod(2).isZero()) {
        return new Decimal(1);
      } else if (quotient.mod(4).equals(1) || quotient.mod(4).equals(3)) {
        return new Decimal(0);
      } else {
        return new Decimal(-1);
      }
    }
    
    // For other values, use Decimal.cos with high precision
    return Decimal.cos(x).toDP(10);
  },
  description: "Calculates the cosine of a number (in radians). Returns the cosine value as a decimal. Special cases: cos(0) = 1, cos(π/2) = 0, cos(π) = -1, cos(3π/2) = 0. The function handles multiples of π/2 efficiently.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The angle in radians",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The cosine of the input angle",
  examples: [
    {
      title: "Cosine calculations with various angles",
      code: `// Special cases (0, π/2, π, 3π/2)
@zero = 0
@pi = PI
@piOver2 = PI / 2
@threePiOver2 = 3 * PI / 2

@cosZero = cos(@zero)
@cosPiOver2 = cos(@piOver2)
@cosPi = cos(@pi)
@cosThreePiOver2 = cos(@threePiOver2)

// Common angles (π/6, π/4, π/3)
@piOver6 = PI / 6
@piOver4 = PI / 4
@piOver3 = PI / 3

@cosPiOver6 = cos(@piOver6)
@cosPiOver4 = cos(@piOver4)
@cosPiOver3 = cos(@piOver3)

// Converting degrees to radians
@degrees = 60
@radians = @degrees * PI / 180
@cos60Degrees = cos(@radians)

// Results
\`"cos(0)" = @cosZero\`
\`"cos(π/2)" = @cosPiOver2\`
\`"cos(π)" = @cosPi\`
\`"cos(3π/2)" = @cosThreePiOver2\`
\`"cos(π/6)" = @cosPiOver6\`
\`"cos(π/4)" = @cosPiOver4\`
\`"cos(π/3)" = @cosPiOver3\`
\`"cos(60°)" = @cos60Degrees\``,
    },
  ],
}; 