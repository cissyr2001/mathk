import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const atanFunction: BuiltInFunctionSpec = {
  name: "atan",
  handler: (x: Decimal | number) => Decimal.atan(new Decimal(x)),
  description: "Returns the arctangent of x in radians.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The value to find the arctangent of",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The arctangent of x in radians",
  examples: [
    {
      title: "Arctangent of 1",
      code: `@answer = atan(1)
@answer`,
    },
    {
      title: "Arctangent of 0",
      code: `@answer = atan(0)
@answer`,
    },
    {
      title: "Find angle from slope",
      code: `@slope = 0.5
@angle = atan(@slope)
@angle`,
    },
  ],
}; 