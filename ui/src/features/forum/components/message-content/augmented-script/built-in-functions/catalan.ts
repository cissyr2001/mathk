import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const catalanFunction: BuiltInFunctionSpec = {
  name: "catalan",
  handler: (n: Decimal) => {
    if (!n.isInteger()) {
      throw new Error("n must be an integer");
    }
    if (n.isNegative()) {
      throw new Error("n must be non-negative");
    }
    // C(n) = (2n)! / (n! * (n+1)!)
    let result = new Decimal(1);
    for (let i = 1; i <= 2 * n.toNumber(); i++) {
      result = result.times(i);
    }
    for (let i = 1; i <= n.toNumber(); i++) {
      result = result.dividedBy(i);
    }
    for (let i = 1; i <= n.toNumber() + 1; i++) {
      result = result.dividedBy(i);
    }
    return result;
  },
  description: "Returns the nth Catalan number, which counts various combinatorial objects like valid parentheses expressions and binary trees.",
  parameters: [
    {
      name: "n",
      type: "Decimal | number",
      description: "The index of the Catalan number to calculate",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The nth Catalan number",
  examples: [
    {
      title: "Calculate C(4)",
      code: `@n = 4\n@result = catalan(@n)\n@result`,
    },
    {
      title: "Calculate C(5)",
      code: `@n = 5\n@result = catalan(@n)\n@result`,
    },
    {
      title: "Calculate C(0)",
      code: `@n = 0\n@result = catalan(@n)\n@result`,
    },
  ],
}; 