import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const isIntegerFunction: BuiltInFunctionSpec = {
  name: "isInteger",
  handler: (x: Decimal) => new Decimal(x.isInteger() ? 1 : 0),
  description: "Returns true if x is an integer, false otherwise.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to check",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "1 if x is an integer, 0 otherwise",
  examples: [
    {
      title: "Check if 5 is an integer",
      code: `@x = 5
@result = isInteger(@x)
@result`,
    },
    {
      title: "Check if 3.14 is an integer",
      code: `@x = 3.14
@result = isInteger(@x)
@result`,
    },
    {
      title: "Check if -2 is an integer",
      code: `@x = -2
@result = isInteger(@x)
@result`,
    },
  ],
}; 