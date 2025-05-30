import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const deg2radFunction: BuiltInFunctionSpec = {
  name: "deg2rad",
  handler: (x: Decimal | number) => new Decimal(x).mul(Decimal.acos(-1)).div(180),
  description: "Converts x from degrees to radians.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The angle in degrees",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The angle in radians",
  examples: [
    {
      title: "Convert 180 degrees to radians",
      code: `@answer = deg2rad(180)
@answer`,
    },
    {
      title: "Convert 90 degrees to radians",
      code: `@answer = deg2rad(90)
@answer`,
    },
    {
      title: "Convert 45 degrees to radians",
      code: `@degrees = 45
@radians = deg2rad(@degrees)
@radians`,
    },
  ],
}; 