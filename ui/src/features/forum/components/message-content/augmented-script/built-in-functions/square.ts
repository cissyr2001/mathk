import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const squareFunction: BuiltInFunctionSpec = {
  name: "square",
  handler: (x: Decimal | number) => new Decimal(x).pow(2),
  description: "Calculates x squared (x^2) for any real number.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to square",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "x squared",
  examples: [
    {
      title: "Calculate various squares",
      code: `@pos = 5
@decimal = 2.5
@neg = -3
@zero = 0

@squarePos = square(@pos)
@squareDecimal = square(@decimal)
@squareNeg = square(@neg)
@squareZero = square(@zero)

\`"square(5)" = @squarePos\`
\`"square(2.5)" = @squareDecimal\`
\`"square(-3)" = @squareNeg\`
\`"square(0)" = @squareZero\``,
    },
  ],
}; 