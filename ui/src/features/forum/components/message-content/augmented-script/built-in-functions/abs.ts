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
      title: "Absolute value of negative number",
      code: `@answer = abs(-5)
@answer`,
    },
    {
      title: "Absolute value of positive number",
      code: `@answer = abs(3.14)
@answer`,
    },
    {
      title: "Distance calculation",
      code: `@point1 = 10
@point2 = 15
@distance = abs(@point1 - @point2)
@distance`,
    },
  ],
}; 