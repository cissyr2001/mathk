import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const logFunction: BuiltInFunctionSpec = {
  name: "log",
  handler: (base: Decimal | number, x: Decimal | number) => new Decimal(x).log(new Decimal(base)),
  description: "Returns the logarithm of x with the specified base (assumes x > 0, base > 0, base ≠ 1).",
  parameters: [
    {
      name: "base",
      type: "Decimal | number",
      description: "The base of the logarithm (must be positive and not equal to 1)",
      required: true,
    },
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to find the logarithm of (must be positive)",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The logarithm of x with the specified base",
  examples: [
    {
      title: "Log base 3 of 27",
      code: `@answer = log(3, 27)
@answer`,
    },
    {
      title: "Log base 5 of 125",
      code: `@answer = log(5, 125)
@answer`,
    },
    {
      title: "Custom base logarithm",
      code: `@base = 7
@value = 49
@answer = log(@base, @value)
@answer`,
    },
  ],
}; 