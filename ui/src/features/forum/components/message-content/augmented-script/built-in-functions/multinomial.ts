import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const multinomialFunction: BuiltInFunctionSpec = {
  name: "multinomial",
  handler: (...args: Decimal[]) => {
    if (args.length < 2) {
      throw new Error("multinomial requires at least 2 arguments");
    }
    
    // Calculate n = sum of all k_i
    const n = args.reduce((sum, k) => sum.plus(k), new Decimal(0));
    
    // Calculate n! / (k1! * k2! * ... * km!)
    let result = new Decimal(1);
    for (let i = 1; i <= n.toNumber(); i++) {
      result = result.times(i);
    }
    
    for (const k of args) {
      for (let i = 1; i <= k.toNumber(); i++) {
        result = result.dividedBy(i);
      }
    }
    
    return result;
  },
  description: "Returns the multinomial coefficient n! / (k1! * k2! * ... * km!) where n = k1 + k2 + ... + km.",
  parameters: [
    {
      name: "k1, k2, ..., km",
      type: "Decimal | number",
      description: "The values k1, k2, ..., km (at least 2 arguments required)",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The multinomial coefficient",
  examples: [
    {
      title: "Calculate multinomial coefficient for (3,2,1)",
      code: `@k1 = 3
@k2 = 2
@k3 = 1
@result = multinomial(@k1, @k2, @k3)
@result`,
    },
    {
      title: "Calculate multinomial coefficient for (2,2,2)",
      code: `@k1 = 2
@k2 = 2
@k3 = 2
@result = multinomial(@k1, @k2, @k3)
@result`,
    },
    {
      title: "Calculate multinomial coefficient for (1,1,1,1)",
      code: `@k1 = 1
@k2 = 1
@k3 = 1
@k4 = 1
@result = multinomial(@k1, @k2, @k3, @k4)
@result`,
    },
  ],
}; 