import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const logFunction: BuiltInFunctionSpec = {
  name: "log",
  handler: (base: Decimal | number, x: Decimal | number) => {
    const baseDecimal = new Decimal(base);
    const xDecimal = new Decimal(x);

    // Validate inputs
    if (baseDecimal.lte(0)) {
      throw new Error('Base must be a positive number not equal to 1');
    }
    if (baseDecimal.eq(1)) {
      throw new Error('Base must be a positive number not equal to 1');
    }
    if (xDecimal.lte(0)) {
      throw new Error('Input must be a positive number');
    }

    try {
      return Decimal.log(xDecimal, baseDecimal).toDP(10);
    } catch (error) {
      if (error instanceof Error && error.message.includes('overflow')) {
        throw new Error('Result too large to calculate');
      }
      throw error;
    }
  },
  description: "Calculates the logarithm of x with base b (log_b(x)). Special cases: log_b(1) = 0, log_b(b) = 1. Throws error for invalid base (≤ 0 or = 1) or non-positive input.",
  parameters: [
    {
      name: "base",
      type: "Decimal | number",
      description: "The logarithm base (must be positive and not equal to 1)",
      required: true,
    },
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to calculate logarithm for (must be positive)",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The logarithm of x with base b",
  examples: [
    {
      title: "Logarithm calculations with various bases and values",
      code: `// Special cases
@one = 1
@two = 2
@ten = 10

@logOne = log(@two, @one)    // log₂(1) = 0
@logBase = log(@two, @two)   // log₂(2) = 1

// Common logarithms
@logTen = log(@ten, @ten)    // log₁₀(10) = 1
@logHundred = log(@ten, 100) // log₁₀(100) = 2
@logThousand = log(@ten, 1000) // log₁₀(1000) = 3

// Natural logarithm (base e)
@e = 2.7182818285
@lnTen = log(@e, @ten)       // ln(10) ≈ 2.3025850930

// Results
\`"log₂(1)" = @logOne\`
\`"log₂(2)" = @logBase\`
\`"log₁₀(10)" = @logTen\`
\`"log₁₀(100)" = @logHundred\`
\`"log₁₀(1000)" = @logThousand\`
\`"ln(10)" = @lnTen\``,
    },
  ],
}; 