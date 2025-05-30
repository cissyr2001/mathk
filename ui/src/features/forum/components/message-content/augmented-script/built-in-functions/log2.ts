import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const log2Function: BuiltInFunctionSpec = {
  name: "log2",
  handler: (x: Decimal | number) => new Decimal(x).log(2),
  description: "Returns the base-2 logarithm of x (assumes x > 0).",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to find the base-2 logarithm of (must be positive)",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The base-2 logarithm of x",
  examples: [
    {
      title: "Log base 2 of 8",
      code: `@answer = log2(8)
@answer`,
    },
    {
      title: "Log base 2 of 2",
      code: `@answer = log2(2)
@answer`,
    },
    {
      title: "Calculate bits needed",
      code: `@values = 256
@bits = log2(@values)
@bits`,
    },
  ],
}; 