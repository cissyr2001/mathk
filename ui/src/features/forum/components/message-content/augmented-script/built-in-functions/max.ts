import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const maxFunction: BuiltInFunctionSpec = {
  name: "max",
  handler: (a: Decimal | number, b: Decimal | number) => {
    const valA = new Decimal(a);
    const valB = new Decimal(b);
    return valA.greaterThan(valB) ? valA : valB;
  },
  description: "Returns the larger of a or b.",
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
  returnDescription: "The larger of a and b",
  examples: [
    {
      title: "Find maximum of two integers",
      code: `@answer = max(5, 3)
@answer`,
    },
    {
      title: "Find maximum of decimals",
      code: `@answer = max(2.7, 2.9)
@answer`,
    },
    {
      title: "Find maximum score",
      code: `@score1 = 85.5
@score2 = 92.3
@maxScore = max(@score1, @score2)
@maxScore`,
    },
  ],
}; 