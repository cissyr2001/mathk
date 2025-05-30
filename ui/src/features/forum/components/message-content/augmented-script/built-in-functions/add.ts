import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const addFunction: BuiltInFunctionSpec = {
  name: "add",
  handler: (a: Decimal | number, b: Decimal | number) => new Decimal(a).add(new Decimal(b)),
  description: "Returns the sum of two numbers, a + b.",
  parameters: [
    {
      name: "a",
      type: "Decimal | number",
      description: "The first number",
      required: true,
    },
    {
      name: "b",
      type: "Decimal | number",
      description: "The second number",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The sum of a and b",
  examples: [
    {
      title: "Add two integers",
      code: `@answer = add(5, 3)
@answer`,
    },
    {
      title: "Add decimal numbers",
      code: `@answer = add(2.5, 1.75)
@answer`,
    },
    {
      title: "Add variables",
      code: `@x = 10
@y = 20
@answer = add(@x, @y)
@answer`,
    },
  ],
}; 