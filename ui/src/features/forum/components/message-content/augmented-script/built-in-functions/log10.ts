import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";
import { CONSTANTS } from "../constants.constant";

export const log10Function: BuiltInFunctionSpec = {
  name: "log10",
  handler: (x: Decimal | number) => {
    const xDecimal = new Decimal(x);
    if (xDecimal.lte(0)) {
      throw new Error('Cannot calculate base-10 logarithm of non-positive number');
    }
    return xDecimal.log(10);
  },
  description: "Calculates the base-10 logarithm of x (log₁₀ x). Special cases: log₁₀(1) = 0, log₁₀(10) = 1, log₁₀(100) = 2, log₁₀(0.1) = -1. Throws an error for non-positive inputs.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to find the base-10 logarithm of (must be positive)",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The base-10 logarithm of x",
  examples: [
    {
      title: "Base-10 logarithm calculations with various values",
      code: `// Special cases
@one = 1
@ten = 10
@hundred = 100
@thousand = 1000

@log10_1 = log10(@one)      // log₁₀(1) = 0
@log10_10 = log10(@ten)     // log₁₀(10) = 1
@log10_100 = log10(@hundred) // log₁₀(100) = 2
@log10_1000 = log10(@thousand) // log₁₀(1000) = 3

// Decimal numbers
@tenth = 0.1
@hundredth = 0.01
@thousandth = 0.001

@log10_0_1 = log10(@tenth)      // log₁₀(0.1) = -1
@log10_0_01 = log10(@hundredth) // log₁₀(0.01) = -2
@log10_0_001 = log10(@thousandth) // log₁₀(0.001) = -3

// Non-integer powers of 10
@sqrt10 = 3.1622776602
@cubeRoot10 = 2.1544346900

@log10_sqrt10 = log10(@sqrt10)     // log₁₀(√10) = 0.5
@log10_cubeRoot10 = log10(@cubeRoot10) // log₁₀(∛10) ≈ 0.3333333333

// Results
\`log₁₀(1) = @log10_1\`
\`log₁₀(10) = @log10_10\`
\`log₁₀(100) = @log10_100\`
\`log₁₀(1000) = @log10_1000\`
\`log₁₀(0.1) = @log10_0_1\`
\`log₁₀(0.01) = @log10_0_01\`
\`log₁₀(0.001) = @log10_0_001\`
\`log₁₀(√10) = @log10_sqrt10\`
\`log₁₀(∛10) = @log10_cubeRoot10\``,
    },
  ],
}; 