import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const sumFunction: BuiltInFunctionSpec = {
  name: "sum",
  handler: (list: (Decimal | number)[]): Decimal => {
    return list.reduce((acc: Decimal, val) => acc.add(new Decimal(val)), new Decimal(0));
  },
  description: "Returns the sum of all numbers in the list.",
  parameters: [
    {
      name: "list",
      type: "Array<Decimal | number>",
      description: "The list of numbers to sum",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The sum of all numbers in the list",
  examples: [
    {
      title: "Sum of integers",
      code: `@numbers = [1, 2, 3, 4, 5]
@answer = sum(@numbers)
@answer`,
    },
    {
      title: "Sum of decimals",
      code: `@values = [1.5, 2.3, 3.7]
@answer = sum(@values)
@answer`,
    },
    {
      title: "Sum of mixed numbers",
      code: `@data = [10, 20.5, 15, 7.25]
@total = sum(@data)
@total`,
    },
  ],
}; 