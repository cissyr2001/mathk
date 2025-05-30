import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const modFunction: BuiltInFunctionSpec = {
  name: "mod",
  handler: (a: Decimal | number, b: Decimal | number) => new Decimal(a).mod(new Decimal(b)),
  description: "Returns the remainder of a divided by b (modulo operation).",
  parameters: [
    {
      name: "a",
      type: "Decimal | number",
      description: "The dividend",
      required: true,
    },
    {
      name: "b",
      type: "Decimal | number",
      description: "The divisor",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The remainder of a divided by b",
  examples: [
    {
      title: "Find remainder of division",
      code: `@answer = mod(17, 5)
@answer`,
    },
    {
      title: "Check if number is even",
      code: `@number = 8
@remainder = mod(@number, 2)
@remainder`,
    },
    {
      title: "Find remainder with decimals",
      code: `@answer = mod(7.5, 2.3)
@answer`,
    },
  ],
}; 