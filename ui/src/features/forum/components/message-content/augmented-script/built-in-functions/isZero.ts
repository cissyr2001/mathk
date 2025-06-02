import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const isZeroFunction: BuiltInFunctionSpec = {
  name: "isZero",
  handler: (x: Decimal) => new Decimal(x.isZero() ? 1 : 0),
  description: "Returns true if x is zero, false otherwise. Handles both positive and negative zero.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to check",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "1 if x is zero, 0 otherwise",
  examples: [
    {
      title: "Checking various numbers for zero",
      code: `// Basic cases
@zero = 0
@one = 1
@negOne = -1
@small = 0.0000001
@large = 1000000

// Check each number
@isZeroZero = isZero(@zero)      // true
@isZeroOne = isZero(@one)        // false
@isZeroNegOne = isZero(@negOne)  // false
@isZeroSmall = isZero(@small)    // false
@isZeroLarge = isZero(@large)    // false

// Results
\`"isZero(0)" = @isZeroZero\`
\`"isZero(1)" = @isZeroOne\`
\`"isZero(-1)" = @isZeroNegOne\`
\`"isZero(0.0000001)" = @isZeroSmall\`
\`"isZero(1000000)" = @isZeroLarge\``,
    },
  ],
}; 