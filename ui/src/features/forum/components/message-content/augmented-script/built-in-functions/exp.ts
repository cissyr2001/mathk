import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const expFunction: BuiltInFunctionSpec = {
  name: "exp",
  handler: (x: Decimal | number) => new Decimal(x).exp(),
  description: "Returns e raised to the power x, e^x.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The exponent",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "e raised to the power x",
  examples: [
    {
      title: "Calculate e^1",
      code: `@answer = exp(1)
@answer`,
    },
    {
      title: "Calculate e^0",
      code: `@answer = exp(0)
@answer`,
    },
    {
      title: "Exponential growth",
      code: `@rate = 0.05
@time = 2
@growth = exp(@rate * @time)
@growth`,
    },
  ],
}; 