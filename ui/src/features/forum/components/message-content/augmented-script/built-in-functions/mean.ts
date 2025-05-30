import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const meanFunction: BuiltInFunctionSpec = {
  name: "mean",
  handler: (list: (Decimal | number)[]): Decimal => {
    const sum = list.reduce((acc: Decimal, val) => acc.add(new Decimal(val)), new Decimal(0));
    return sum.div(list.length);
  },
  description: "Returns the arithmetic mean of the numbers in the list.",
  parameters: [
    {
      name: "list",
      type: "Array<Decimal | number>",
      description: "The list of numbers to calculate the mean of",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The arithmetic mean of the numbers in the list",
  examples: [
    {
      title: "Mean of integers",
      code: `@numbers = [1, 2, 3, 4, 5]
@answer = mean(@numbers)
@answer`,
    },
    {
      title: "Mean of test scores",
      code: `@scores = [85, 92, 78, 96, 89]
@average = mean(@scores)
@average`,
    },
    {
      title: "Mean of decimals",
      code: `@values = [2.5, 3.7, 1.8, 4.2]
@avg = mean(@values)
@avg`,
    },
  ],
}; 