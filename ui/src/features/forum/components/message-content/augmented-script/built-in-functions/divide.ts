import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const divideFunction: BuiltInFunctionSpec = {
  name: "divide",
  handler: (a: Decimal | number, b: Decimal | number) => new Decimal(a).div(new Decimal(b)),
  description: "Returns the quotient, a / b (assumes b ≠ 0).",
  parameters: [
    {
      name: "a",
      type: "Decimal | number",
      description: "The dividend (number to be divided)",
      required: true,
    },
    {
      name: "b",
      type: "Decimal | number",
      description: "The divisor (number to divide by, must not be zero)",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The quotient of a divided by b",
  examples: [
    {
      title: "Divide two integers",
      code: `@answer = divide(15, 3)
@answer`,
    },
    {
      title: "Divide decimal numbers",
      code: `@answer = divide(7.5, 2.5)
@answer`,
    },
    {
      title: "Calculate unit rate",
      code: `@distance = 120
@time = 2
@speed = divide(@distance, @time)
@speed`,
    },
  ],
}; 