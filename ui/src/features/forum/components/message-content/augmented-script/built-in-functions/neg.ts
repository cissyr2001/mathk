import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const negFunction: BuiltInFunctionSpec = {
  name: "neg",
  handler: (x: Decimal | number) => new Decimal(x).neg(),
  description: "Returns the negative of x, i.e., -x.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to negate",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The negative of x",
  examples: [
    {
      title: "Negate a positive number",
      code: `@answer = neg(5)
@answer`,
    },
    {
      title: "Negate a negative number",
      code: `@answer = neg(-3.14)
@answer`,
    },
    {
      title: "Change direction",
      code: `@velocity = 10
@opposite = neg(@velocity)
@opposite`,
    },
  ],
}; 