import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const clamp01Function: BuiltInFunctionSpec = {
  name: "clamp01",
  handler: (x: Decimal) => Decimal.min(Decimal.max(x, new Decimal(0)), new Decimal(1)),
  description: "Clamps a value to the range [0, 1].",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The value to clamp",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The clamped value between 0 and 1",
  examples: [
    {
      title: "Clamp a value between 0 and 1",
      code: `@value = 1.5
@clamped = clamp01(@value)
@clamped`,
    },
    {
      title: "Clamp a negative value",
      code: `@value = -0.5
@clamped = clamp01(@value)
@clamped`,
    },
    {
      title: "Clamp a value already in range",
      code: `@value = 0.7
@clamped = clamp01(@value)
@clamped`,
    },
  ],
}; 