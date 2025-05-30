import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const recipFunction: BuiltInFunctionSpec = {
  name: "recip",
  handler: (x: Decimal | number) => new Decimal(1).div(new Decimal(x)),
  description: "Returns the reciprocal, 1/x (assumes x ≠ 0).",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to find the reciprocal of (must not be zero)",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The reciprocal of x",
  examples: [
    {
      title: "Reciprocal of 2",
      code: `@answer = recip(2)
@answer`,
    },
    {
      title: "Reciprocal of a fraction",
      code: `@answer = recip(0.25)
@answer`,
    },
    {
      title: "Convert rate units",
      code: `@miles_per_hour = 60
@hours_per_mile = recip(@miles_per_hour)
@hours_per_mile`,
    },
  ],
}; 