import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const absFunction: BuiltInFunctionSpec = {
  name: "abs",
  handler: (x: Decimal | number) => new Decimal(x).abs(),
  description: "Returns the absolute value of x.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to find the absolute value of",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The absolute value of x",
  examples: [
    {
      title: "Calculate absolute values and distances",
      code: `@negative = -5
@positive = 3.14
@point1 = 10
@point2 = 15

@absNegative = abs(@negative)
@absPositive = abs(@positive)
@distance = abs(@point1 - @point2)

\`"abs(-5)" = @absNegative\`
\`"abs(3.14)" = @absPositive\`
\`Distance between points = @distance\``,
    },
  ],
}; 