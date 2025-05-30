import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const ceilDivFunction: BuiltInFunctionSpec = {
  name: "ceilDiv",
  handler: (a: Decimal, b: Decimal) => {
    if (b.isZero()) {
      throw new Error("Division by zero");
    }
    return a.dividedBy(b).ceil();
  },
  description: "Returns ceil(a / b) for integers a and b.",
  parameters: [
    {
      name: "a",
      type: "Decimal | number",
      description: "The dividend",
      required: true,
    },
    {
      name: "b",
      type: "Decimal | number",
      description: "The divisor (must not be zero)",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The ceiling of a divided by b",
  examples: [
    {
      title: "Ceiling division of 7 by 3",
      code: `@a = 7
@b = 3
@result = ceilDiv(@a, @b)
@result`,
    },
    {
      title: "Ceiling division of 10 by 2",
      code: `@a = 10
@b = 2
@result = ceilDiv(@a, @b)
@result`,
    },
    {
      title: "Ceiling division of -7 by 3",
      code: `@a = -7
@b = 3
@result = ceilDiv(@a, @b)
@result`,
    },
  ],
}; 