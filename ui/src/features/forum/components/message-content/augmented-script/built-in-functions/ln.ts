import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const lnFunction: BuiltInFunctionSpec = {
  name: "ln",
  handler: (x: Decimal | number) => {
    const xDecimal = new Decimal(x);
    if (xDecimal.lte(0)) {
      throw new Error('Cannot calculate natural logarithm of non-positive number');
    }
    return xDecimal.ln();
  },
  description: "Calculates the natural logarithm of x (ln x). Special cases: ln(1) = 0, ln(e) = 1. Throws an error for non-positive inputs.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to find the natural logarithm of (must be positive)",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The natural logarithm of x",
  examples: [
    {
      title: "Basic natural logarithm calculations",
      code: `@e = exp(1)
@one = 1
@ten = 10

@lnE = ln(@e)
@lnOne = ln(@one)
@lnTen = ln(@ten)

\`"ln(e)" = @lnE\`
\`"ln(1)" = @lnOne\`
\`"ln(10)" = @lnTen\``,
    },
    {
      title: "Natural logarithm with decimal numbers",
      code: `@half = 0.5
@quarter = 0.25

@lnHalf = ln(@half)
@lnQuarter = ln(@quarter)

\`"ln(0.5)" = @lnHalf\`
\`"ln(0.25)" = @lnQuarter\``,
    },
  ],
}; 