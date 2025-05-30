import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const clampFunction: BuiltInFunctionSpec = {
  name: "clamp",
  handler: (x: Decimal | number, a: Decimal | number, b: Decimal | number) => {
    const val = new Decimal(x);
    const min = new Decimal(a);
    const max = new Decimal(b);
    
    if (val.lessThan(min)) return min;
    if (val.greaterThan(max)) return max;
    return val;
  },
  description: "Returns x constrained to the range [a, b].",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The value to clamp",
      required: true,
    },
    {
      name: "a",
      type: "Decimal | number",
      description: "The minimum value of the range",
      required: true,
    },
    {
      name: "b",
      type: "Decimal | number",
      description: "The maximum value of the range",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The value x constrained to the range [a, b]",
  examples: [
    {
      title: "Clamp value within range",
      code: `@answer = clamp(5, 0, 10)
@answer`,
    },
    {
      title: "Clamp value below minimum",
      code: `@answer = clamp(-3, 0, 10)
@answer`,
    },
    {
      title: "Clamp value above maximum",
      code: `@answer = clamp(15, 0, 10)
@answer`,
    },
  ],
}; 