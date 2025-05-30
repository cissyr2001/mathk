import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const ceilFunction: BuiltInFunctionSpec = {
  name: "ceil",
  handler: (x: Decimal | number) => new Decimal(x).ceil(),
  description: "Returns the smallest integer greater than or equal to x.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to ceil",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The ceiling of x",
  examples: [
    {
      title: "Ceiling of positive decimal",
      code: `@answer = ceil(3.2)
@answer`,
    },
    {
      title: "Ceiling of negative decimal",
      code: `@answer = ceil(-2.7)
@answer`,
    },
    {
      title: "Ceiling of integer",
      code: `@answer = ceil(5)
@answer`,
    },
  ],
}; 