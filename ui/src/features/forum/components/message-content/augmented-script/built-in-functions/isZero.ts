import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const isZeroFunction: BuiltInFunctionSpec = {
  name: "isZero",
  handler: (x: Decimal) => new Decimal(x.isZero() ? 1 : 0),
  description: "Returns true if x is zero, false otherwise.",
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
      title: "Check if 0 is zero",
      code: `@x = 0
@result = isZero(@x)
@result`,
    },
    {
      title: "Check if 3 is zero",
      code: `@x = 3
@result = isZero(@x)
@result`,
    },
    {
      title: "Check if -0 is zero",
      code: `@x = -0
@result = isZero(@x)
@result`,
    },
  ],
}; 