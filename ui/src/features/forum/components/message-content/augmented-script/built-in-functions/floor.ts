import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const floorFunction: BuiltInFunctionSpec = {
  name: "floor",
  handler: (x: Decimal | number) => new Decimal(x).floor(),
  description: "Returns the greatest integer less than or equal to x.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to floor",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The floor of x",
  examples: [
    {
      title: "Floor of positive decimal",
      code: `@answer = floor(3.7)
@answer`,
    },
    {
      title: "Floor of negative decimal",
      code: `@answer = floor(-2.3)
@answer`,
    },
    {
      title: "Floor of integer",
      code: `@answer = floor(5)
@answer`,
    },
  ],
}; 