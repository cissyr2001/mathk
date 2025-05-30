import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const isPositiveFunction: BuiltInFunctionSpec = {
  name: "isPositive",
  handler: (x: Decimal) => new Decimal(x.isPositive() ? 1 : 0),
  description: "Returns true if x is positive, false otherwise.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to check",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "1 if x is positive, 0 otherwise",
  examples: [
    {
      title: "Check if 5 is positive",
      code: `@x = 5
@result = isPositive(@x)
@result`,
    },
    {
      title: "Check if -3 is positive",
      code: `@x = -3
@result = isPositive(@x)
@result`,
    },
    {
      title: "Check if 0 is positive",
      code: `@x = 0
@result = isPositive(@x)
@result`,
    },
  ],
}; 