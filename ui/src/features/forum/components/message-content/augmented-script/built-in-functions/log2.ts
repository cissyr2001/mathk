import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const log2Function: BuiltInFunctionSpec = {
  name: "log2",
  handler: (x: Decimal | number) => {
    const xDecimal = new Decimal(x);
    if (xDecimal.lte(0)) {
      throw new Error('Cannot calculate base-2 logarithm of non-positive number');
    }

    try {
      return xDecimal.log(2);
    } catch (error) {
      if (error instanceof Error && error.message.includes('overflow')) {
        throw new Error('Result too large to calculate');
      }
      throw error;
    }
  },
  description: "Calculates the base-2 logarithm of x (log₂ x). Special cases: log₂(1) = 0, log₂(2) = 1, log₂(0.5) = -1. Throws an error for non-positive inputs.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to find the base-2 logarithm of (must be positive)",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The base-2 logarithm of x",
  examples: [
    {
      title: "Basic base-2 logarithm calculations",
      code: `// Special cases
@one = 1
@two = 2
@half = 0.5

@log2_1 = log2(@one)    // log₂(1) = 0
@log2_2 = log2(@two)    // log₂(2) = 1
@log2_0_5 = log2(@half) // log₂(0.5) = -1

// Powers of 2
@four = 4
@eight = 8
@sixteen = 16
@thirtyTwo = 32

@log2_4 = log2(@four)      // log₂(4) = 2
@log2_8 = log2(@eight)     // log₂(8) = 3
@log2_16 = log2(@sixteen)  // log₂(16) = 4
@log2_32 = log2(@thirtyTwo) // log₂(32) = 5

// Results
\`log₂(1) = @log2_1\`
\`log₂(2) = @log2_2\`
\`log₂(0.5) = @log2_0_5\`
\`log₂(4) = @log2_4\`
\`log₂(8) = @log2_8\`
\`log₂(16) = @log2_16\`
\`log₂(32) = @log2_32\``,
    },
    {
      title: "Base-2 logarithm with fractions and non-powers of 2",
      code: `// Fractions of powers of 2
@quarter = 0.25
@eighth = 0.125
@sixteenth = 0.0625

@log2_0_25 = log2(@quarter)     // log₂(0.25) = -2
@log2_0_125 = log2(@eighth)     // log₂(0.125) = -3
@log2_0_0625 = log2(@sixteenth) // log₂(0.0625) = -4

// Non-power-of-2 values
@three = 3
@five = 5
@seven = 7

@log2_3 = log2(@three) // log₂(3) ≈ 1.585
@log2_5 = log2(@five)  // log₂(5) ≈ 2.322
@log2_7 = log2(@seven) // log₂(7) ≈ 2.807

// Results
\`log₂(0.25) = @log2_0_25\`
\`log₂(0.125) = @log2_0_125\`
\`log₂(0.0625) = @log2_0_0625\`
\`log₂(3) = @log2_3\`
\`log₂(5) = @log2_5\`
\`log₂(7) = @log2_7\``,
    },
  ],
}; 