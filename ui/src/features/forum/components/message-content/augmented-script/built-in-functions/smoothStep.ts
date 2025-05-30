import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const smoothStepFunction: BuiltInFunctionSpec = {
  name: "smoothStep",
  handler: (x: Decimal) => {
    const clampedX = Decimal.min(Decimal.max(x, new Decimal(0)), new Decimal(1));
    // x * x * (3 - 2 * x)
    return clampedX.times(clampedX).times(new Decimal(3).minus(clampedX.times(2)));
  },
  description: "Returns a smooth interpolation of x between 0 and 1 using a cubic Hermite interpolation.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The input value to interpolate",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The smoothly interpolated value between 0 and 1",
  examples: [
    {
      title: "Smooth step at x=0.5",
      code: `@x = 0.5
@result = smoothStep(@x)
@result`,
    },
    {
      title: "Smooth step at x=0 (returns 0)",
      code: `@x = 0
@result = smoothStep(@x)
@result`,
    },
    {
      title: "Smooth step at x=1 (returns 1)",
      code: `@x = 1
@result = smoothStep(@x)
@result`,
    },
  ],
}; 