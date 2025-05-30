import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const cosFunction: BuiltInFunctionSpec = {
  name: "cos",
  handler: (x: Decimal) => Decimal.cos(x),
  description: "Calculates the cosine of a number (in radians). Returns the cosine value as a decimal.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The angle in radians",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The cosine of the input angle",
  examples: [
    {
      title: "Calculate cosine of 0",
      code: `@answer = cos(0)
@answer`,
    },
    {
      title: "Calculate cosine of π",
      code: `@answer = cos(PI)
@answer`,
    },
    {
      title: "Calculate cosine of 60 degrees",
      code: `@degrees = 60
@radians = @degrees * PI / 180
@answer = cos(@radians)
@answer`,
    },
  ],
}; 