import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const rad2degFunction: BuiltInFunctionSpec = {
  name: "rad2deg",
  handler: (x: Decimal | number) => new Decimal(x).mul(180).div(Decimal.acos(-1)),
  description: "Converts x from radians to degrees.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The angle in radians",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The angle in degrees",
  examples: [
    {
      title: "Convert π radians to degrees",
      code: `@pi = acos(-1)
@answer = rad2deg(@pi)
@answer`,
    },
    {
      title: "Convert π/2 radians to degrees",
      code: `@pi_half = acos(-1) / 2
@answer = rad2deg(@pi_half)
@answer`,
    },
    {
      title: "Convert radians to degrees",
      code: `@radians = 1.5708
@degrees = rad2deg(@radians)
@degrees`,
    },
  ],
}; 