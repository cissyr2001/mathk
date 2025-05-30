import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const lnFunction: BuiltInFunctionSpec = {
  name: "ln",
  handler: (x: Decimal | number) => new Decimal(x).ln(),
  description: "Returns the natural logarithm of x (assumes x > 0).",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to find the natural logarithm of (must be positive)",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The natural logarithm of x",
  examples: [
    {
      title: "Natural logarithm of e",
      code: `@e = exp(1)
@answer = ln(@e)
@answer`,
    },
    {
      title: "Natural logarithm of 1",
      code: `@answer = ln(1)
@answer`,
    },
    {
      title: "Solve for time in exponential decay",
      code: `@initial = 100
@final = 50
@answer = ln(@final / @initial)
@answer`,
    },
  ],
}; 