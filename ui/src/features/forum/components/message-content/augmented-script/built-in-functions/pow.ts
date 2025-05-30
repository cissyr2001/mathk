import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const powFunction: BuiltInFunctionSpec = {
  name: "pow",
  handler: (x: Decimal | number, y: Decimal | number) => new Decimal(x).pow(new Decimal(y)),
  description: "Returns x raised to the power y, x^y.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The base",
      required: true,
    },
    {
      name: "y",
      type: "Decimal | number",
      description: "The exponent",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "x raised to the power y",
  examples: [
    {
      title: "Calculate 2 to the power of 3",
      code: `@answer = pow(2, 3)
@answer`,
    },
    {
      title: "Calculate square root using fractional exponent",
      code: `@answer = pow(16, 0.5)
@answer`,
    },
    {
      title: "Calculate compound interest",
      code: `@principal = 1000
@rate = 1.05
@years = 3
@amount = multiply(@principal, pow(@rate, @years))
@amount`,
    },
  ],
}; 