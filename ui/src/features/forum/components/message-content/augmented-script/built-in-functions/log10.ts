import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const log10Function: BuiltInFunctionSpec = {
  name: "log10",
  handler: (x: Decimal | number) => new Decimal(x).log(10),
  description: "Returns the base-10 logarithm of x (assumes x > 0).",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to find the base-10 logarithm of (must be positive)",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The base-10 logarithm of x",
  examples: [
    {
      title: "Log base 10 of 100",
      code: `@answer = log10(100)
@answer`,
    },
    {
      title: "Log base 10 of 10",
      code: `@answer = log10(10)
@answer`,
    },
    {
      title: "Calculate pH",
      code: `@h_concentration = 0.001
@ph = neg(log10(@h_concentration))
@ph`,
    },
  ],
}; 