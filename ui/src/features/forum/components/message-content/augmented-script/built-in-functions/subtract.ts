import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const subtractFunction: BuiltInFunctionSpec = {
  name: "subtract",
  handler: (a: Decimal | number, b: Decimal | number) => new Decimal(a).sub(new Decimal(b)),
  description: "Returns the difference, a - b.",
  parameters: [
    {
      name: "a",
      type: "Decimal | number",
      description: "The minuend (number to subtract from)",
      required: true,
    },
    {
      name: "b",
      type: "Decimal | number",
      description: "The subtrahend (number to subtract)",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The difference of a and b",
  examples: [
    {
      title: "Subtract two integers",
      code: `@answer = subtract(10, 3)
@answer`,
    },
    {
      title: "Subtract decimal numbers",
      code: `@answer = subtract(5.75, 2.25)
@answer`,
    },
    {
      title: "Subtract variables",
      code: `@x = 15
@y = 7
@answer = subtract(@x, @y)
@answer`,
    },
  ],
}; 