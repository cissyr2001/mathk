import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const sqrtFunction: BuiltInFunctionSpec = {
  name: "sqrt",
  handler: (val: Decimal | number) => new Decimal(val).sqrt(),
  description: "Calculates the square root of a number. Returns the square root as a decimal.",
  parameters: [
    {
      name: "val",
      type: "Decimal | number",
      description: "The number to calculate the square root of",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The square root of the input value",
  examples: [
    {
      title: "Calculate square root of 16",
      code: `@answer = sqrt(16)
@answer`,
    },
    {
      title: "Calculate square root of 2",
      code: `@answer = sqrt(2)
@answer`,
    },
    {
      title: "Calculate square root of a variable",
      code: `@number = 25
@answer = sqrt(@number)
@answer`,
    },
  ],
}; 