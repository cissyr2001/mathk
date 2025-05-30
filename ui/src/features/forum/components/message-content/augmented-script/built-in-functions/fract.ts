import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const fractFunction: BuiltInFunctionSpec = {
  name: "fract",
  handler: (x: Decimal) => {
    const absX = x.abs();
    return absX.minus(absX.floor());
  },
  description: "Returns the fractional part of a number (the part after the decimal point).",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The input number",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The fractional part of the input number",
  examples: [
    {
      title: "Get fractional part of 3.14",
      code: `@x = 3.14
@result = fract(@x)
@result`,
    },
    {
      title: "Get fractional part of -2.7",
      code: `@x = -2.7
@result = fract(@x)
@result`,
    },
    {
      title: "Get fractional part of 5",
      code: `@x = 5
@result = fract(@x)
@result`,
    },
  ],
}; 