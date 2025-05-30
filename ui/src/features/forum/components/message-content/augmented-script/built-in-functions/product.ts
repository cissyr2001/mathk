import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const productFunction: BuiltInFunctionSpec = {
  name: "product",
  handler: (list: (Decimal | number)[]): Decimal => {
    return list.reduce((acc: Decimal, val) => acc.mul(new Decimal(val)), new Decimal(1));
  },
  description: "Returns the product of all numbers in the list.",
  parameters: [
    {
      name: "list",
      type: "Array<Decimal | number>",
      description: "The list of numbers to multiply",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The product of all numbers in the list",
  examples: [
    {
      title: "Product of integers",
      code: `@numbers = [2, 3, 4]
@answer = product(@numbers)
@answer`,
    },
    {
      title: "Product of decimals",
      code: `@values = [1.5, 2.0, 3.0]
@answer = product(@values)
@answer`,
    },
    {
      title: "Calculate factorial-like product",
      code: `@factors = [1, 2, 3, 4, 5]
@result = product(@factors)
@result`,
    },
  ],
}; 