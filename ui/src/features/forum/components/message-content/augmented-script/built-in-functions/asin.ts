import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const asinFunction: BuiltInFunctionSpec = {
  name: "asin",
  handler: (x: Decimal | number) => Decimal.asin(new Decimal(x)),
  description: "Returns the arcsine of x in radians (x in [-1, 1]).",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The value to find the arcsine of (must be between -1 and 1)",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The arcsine of x in radians",
  examples: [
    {
      title: "Arcsine of 1",
      code: `@answer = asin(1)
@answer`,
    },
    {
      title: "Arcsine of 0.5",
      code: `@answer = asin(0.5)
@answer`,
    },
    {
      title: "Arcsine of 0",
      code: `@answer = asin(0)
@answer`,
    },
  ],
}; 