import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const minFunction: BuiltInFunctionSpec = {
  name: "min",
  handler: (a: Decimal | number, b: Decimal | number) => {
    const valA = new Decimal(a);
    const valB = new Decimal(b);
    return valA.lessThan(valB) ? valA : valB;
  },
  description: "Returns the smaller of a or b.",
  parameters: [
    {
      name: "a",
      type: "Decimal | number",
      description: "The first number",
      required: true,
    },
    {
      name: "b",
      type: "Decimal | number",
      description: "The second number",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The smaller of a and b",
  examples: [
    {
      title: "Find minimum of two integers",
      code: `@answer = min(5, 3)
@answer`,
    },
    {
      title: "Find minimum of decimals",
      code: `@answer = min(2.7, 2.9)
@answer`,
    },
    {
      title: "Find minimum temperature",
      code: `@temp1 = 25.5
@temp2 = 23.8
@minTemp = min(@temp1, @temp2)
@minTemp`,
    },
  ],
}; 