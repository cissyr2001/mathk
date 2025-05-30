import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const truncFunction: BuiltInFunctionSpec = {
  name: "trunc",
  handler: (x: Decimal | number) => new Decimal(x).trunc(),
  description: "Truncates x to the integer part by removing the decimal.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to truncate",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The truncated value of x",
  examples: [
    {
      title: "Truncate positive decimal",
      code: `@answer = trunc(3.9)
@answer`,
    },
    {
      title: "Truncate negative decimal",
      code: `@answer = trunc(-3.9)
@answer`,
    },
    {
      title: "Truncate integer",
      code: `@answer = trunc(5)
@answer`,
    },
  ],
}; 