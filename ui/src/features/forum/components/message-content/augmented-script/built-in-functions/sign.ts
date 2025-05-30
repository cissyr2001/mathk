import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const signFunction: BuiltInFunctionSpec = {
  name: "sign",
  handler: (x: Decimal | number) => {
    const val = new Decimal(x);
    if (val.isZero()) return new Decimal(0);
    if (val.isPositive()) return new Decimal(1);
    return new Decimal(-1);
  },
  description: "Returns the sign of x: 1 if x > 0, -1 if x < 0, 0 if x = 0.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to find the sign of",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The sign of x (-1, 0, or 1)",
  examples: [
    {
      title: "Sign of positive number",
      code: `@answer = sign(5.7)
@answer`,
    },
    {
      title: "Sign of negative number",
      code: `@answer = sign(-3.2)
@answer`,
    },
    {
      title: "Sign of zero",
      code: `@answer = sign(0)
@answer`,
    },
  ],
}; 