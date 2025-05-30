import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const cubeFunction: BuiltInFunctionSpec = {
  name: "cube",
  handler: (x: Decimal | number) => new Decimal(x).pow(3),
  description: "Returns x cubed, x^3.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to cube",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "x cubed",
  examples: [
    {
      title: "Cube of 3",
      code: `@answer = cube(3)
@answer`,
    },
    {
      title: "Cube of decimal",
      code: `@answer = cube(2.5)
@answer`,
    },
    {
      title: "Calculate volume of cube",
      code: `@side = 4
@volume = cube(@side)
@volume`,
    },
  ],
}; 