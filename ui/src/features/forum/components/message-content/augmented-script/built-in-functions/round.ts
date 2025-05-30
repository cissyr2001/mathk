import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const roundFunction: BuiltInFunctionSpec = {
  name: "round",
  handler: (x: Decimal | number) => new Decimal(x).round(),
  description: "Rounds x to the nearest integer.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to round",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The rounded value of x",
  examples: [
    {
      title: "Round up",
      code: `@answer = round(3.7)
@answer`,
    },
    {
      title: "Round down",
      code: `@answer = round(3.2)
@answer`,
    },
    {
      title: "Round exactly half",
      code: `@answer = round(2.5)
@answer`,
    },
  ],
}; 