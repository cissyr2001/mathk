import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const isNegativeFunction: BuiltInFunctionSpec = {
  name: "isNegative",
  handler: (x: Decimal) => new Decimal(x.isNegative() ? 1 : 0),
  description: "Returns true if x is negative, false otherwise.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to check",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "1 if x is negative, 0 otherwise",
  examples: [
    {
      title: "Check if -5 is negative",
      code: `@x = -5
@result = isNegative(@x)
@result`,
    },
    {
      title: "Check if 3 is negative",
      code: `@x = 3
@result = isNegative(@x)
@result`,
    },
    {
      title: "Check if 0 is negative",
      code: `@x = 0
@result = isNegative(@x)
@result`,
    },
  ],
}; 