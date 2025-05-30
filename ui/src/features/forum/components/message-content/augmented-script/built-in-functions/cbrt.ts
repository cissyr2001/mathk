import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const cbrtFunction: BuiltInFunctionSpec = {
  name: "cbrt",
  handler: (x: Decimal | number) => new Decimal(x).pow(new Decimal(1).div(3)),
  description: "Returns the cube root of x.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to find the cube root of",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The cube root of x",
  examples: [
    {
      title: "Cube root of 27",
      code: `@answer = cbrt(27)
@answer`,
    },
    {
      title: "Cube root of 8",
      code: `@answer = cbrt(8)
@answer`,
    },
    {
      title: "Cube root of negative number",
      code: `@answer = cbrt(-8)
@answer`,
    },
  ],
}; 