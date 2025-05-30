import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const signumFunction: BuiltInFunctionSpec = {
  name: "signum",
  handler: (x: Decimal) => {
    if (x.isZero()) return new Decimal(0);
    return x.isPositive() ? new Decimal(1) : new Decimal(-1);
  },
  description: "Returns the sign of x (-1 for negative, 0 for zero, 1 for positive).",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to get the sign of",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "-1 if x is negative, 0 if x is zero, 1 if x is positive",
  examples: [
    {
      title: "Get sign of 5",
      code: `@x = 5
@result = signum(@x)
@result`,
    },
    {
      title: "Get sign of -3",
      code: `@x = -3
@result = signum(@x)
@result`,
    },
    {
      title: "Get sign of 0",
      code: `@x = 0
@result = signum(@x)
@result`,
    },
  ],
}; 