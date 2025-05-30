import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const bellFunction: BuiltInFunctionSpec = {
  name: "bell",
  handler: (n: Decimal) => {
    if (!n.isInteger()) {
      throw new Error("n must be an integer");
    }
    if (n.isNegative()) {
      throw new Error("n must be non-negative");
    }
    
    // Use the recurrence relation: B(n+1) = sum(k=0 to n) of C(n,k)*B(k)
    const memo: { [key: number]: Decimal } = {};
    
    function bell(n: number): Decimal {
      if (memo[n]) return memo[n];
      if (n === 0) return new Decimal(1);
      
      let sum = new Decimal(0);
      for (let k = 0; k < n; k++) {
        // Calculate C(n-1,k)
        let c = new Decimal(1);
        for (let i = 0; i < k; i++) {
          c = c.times(n - 1 - i).dividedBy(i + 1);
        }
        sum = sum.plus(c.times(bell(k)));
      }
      
      memo[n] = sum;
      return sum;
    }
    
    return bell(n.toNumber());
  },
  description: "Returns the nth Bell number, which counts the number of ways to partition a set of n elements.",
  parameters: [
    {
      name: "n",
      type: "Decimal | number",
      description: "The index of the Bell number to calculate",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The nth Bell number",
  examples: [
    {
      title: "Calculate B(4)",
      code: `@n = 4
@result = bell(@n)
@result`,
    },
    {
      title: "Calculate B(5)",
      code: `@n = 5
@result = bell(@n)
@result`,
    },
    {
      title: "Calculate B(0)",
      code: `@n = 0
@result = bell(@n)
@result`,
    },
  ],
}; 