import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const lerpFunction: BuiltInFunctionSpec = {
  name: "lerp",
  handler: (a: Decimal, b: Decimal, t: Decimal) => {
    const clampedT = Decimal.min(Decimal.max(t, new Decimal(0)), new Decimal(1));
    return a.plus(b.minus(a).times(clampedT));
  },
  description: "Linearly interpolates between two values by a factor t (t in [0, 1]).",
  parameters: [
    {
      name: "a",
      type: "Decimal | number",
      description: "The start value",
      required: true,
    },
    {
      name: "b",
      type: "Decimal | number",
      description: "The end value",
      required: true,
    },
    {
      name: "t",
      type: "Decimal | number",
      description: "The interpolation factor between 0 and 1",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The interpolated value between a and b",
  examples: [
    {
      title: "Interpolate between 0 and 10",
      code: `@start = 0
@end = 10
@t = 0.5
@result = lerp(@start, @end, @t)
@result`,
    },
    {
      title: "Interpolate with t=0 (returns start value)",
      code: `@start = 5
@end = 15
@t = 0
@result = lerp(@start, @end, @t)
@result`,
    },
    {
      title: "Interpolate with t=1 (returns end value)",
      code: `@start = 5
@end = 15
@t = 1
@result = lerp(@start, @end, @t)
@result`,
    },
  ],
}; 