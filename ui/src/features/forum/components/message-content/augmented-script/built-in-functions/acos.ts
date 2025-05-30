import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const acosFunction: BuiltInFunctionSpec = {
  name: "acos",
  handler: (x: Decimal | number) => Decimal.acos(new Decimal(x)),
  description: "Returns the arccosine of x in radians (x in [-1, 1]).",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The value to find the arccosine of (must be between -1 and 1)",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The arccosine of x in radians",
  examples: [
    {
      title: "Arccosine of 1",
      code: `@answer = acos(1)
@answer`,
    },
    {
      title: "Arccosine of 0",
      code: `@answer = acos(0)
@answer`,
    },
    {
      title: "Arccosine of -1",
      code: `@answer = acos(-1)
@answer`,
    },
  ],
}; 