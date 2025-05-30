import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const tanFunction: BuiltInFunctionSpec = {
  name: "tan",
  handler: (x: Decimal | number) => Decimal.tan(new Decimal(x)),
  description: "Returns the tangent of x (x in radians, x ≠ π/2 + kπ).",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The angle in radians",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The tangent of the input angle",
  examples: [
    {
      title: "Calculate tangent of π/4",
      code: `@angle = PI / 4
@answer = tan(@angle)
@answer`,
    },
    {
      title: "Calculate tangent of 0",
      code: `@answer = tan(0)
@answer`,
    },
    {
      title: "Calculate tangent of 45 degrees",
      code: `@degrees = 45
@radians = @degrees * PI / 180
@answer = tan(@radians)
@answer`,
    },
  ],
}; 