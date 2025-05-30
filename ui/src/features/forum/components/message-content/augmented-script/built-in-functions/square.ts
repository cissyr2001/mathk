import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const squareFunction: BuiltInFunctionSpec = {
  name: "square",
  handler: (x: Decimal | number) => new Decimal(x).pow(2),
  description: "Returns x squared, x^2.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to square",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "x squared",
  examples: [
    {
      title: "Square of 5",
      code: `@answer = square(5)
@answer`,
    },
    {
      title: "Square of decimal",
      code: `@answer = square(2.5)
@answer`,
    },
    {
      title: "Calculate area of square",
      code: `@side = 4
@area = square(@side)
@area`,
    },
  ],
}; 