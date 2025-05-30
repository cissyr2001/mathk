import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const multiplyFunction: BuiltInFunctionSpec = {
  name: "multiply",
  handler: (a: Decimal | number, b: Decimal | number) => new Decimal(a).mul(new Decimal(b)),
  description: "Returns the product, a * b.",
  parameters: [
    {
      name: "a",
      type: "Decimal | number",
      description: "The first factor",
      required: true,
    },
    {
      name: "b",
      type: "Decimal | number",
      description: "The second factor",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The product of a and b",
  examples: [
    {
      title: "Multiply two integers",
      code: `@answer = multiply(4, 6)
@answer`,
    },
    {
      title: "Multiply decimal numbers",
      code: `@answer = multiply(2.5, 3.2)
@answer`,
    },
    {
      title: "Multiply variables",
      code: `@length = 5
@width = 8
@area = multiply(@length, @width)
@area`,
    },
  ],
}; 