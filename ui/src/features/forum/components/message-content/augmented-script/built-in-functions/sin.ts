import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const sinFunction: BuiltInFunctionSpec = {
  name: "sin",
  handler: (x: Decimal) => Decimal.sin(x),
  description: "Calculates the sine of a number (in radians). Returns the sine value as a decimal.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The angle in radians",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The sine of the input angle",
  examples: [
    {
      title: "Calculate sine of π/2",
      code: `@angle = PI / 2
@answer = sin(@angle)
@answer`,
    },
    {
      title: "Calculate sine of 30 degrees",
      code: `@degrees = 30
@radians = @degrees * PI / 180
@answer = sin(@radians)
@answer`,
    },
    {
      title: "Calculate sine of 0",
      code: `@answer = sin(0)
@answer`,
    },
  ],
}; 