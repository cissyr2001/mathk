import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const stirlingS1Function: BuiltInFunctionSpec = {
  name: "stirlingS1",
  handler: (n: Decimal, k: Decimal) => {
    if (!n.isInteger() || !k.isInteger()) {
      throw new Error("n and k must be integers");
    }
    if (n.isNegative() || k.isNegative()) {
      throw new Error("n and k must be non-negative");
    }
    if (k.greaterThan(n)) {
      return new Decimal(0);
    }
    if (k.isZero()) {
      return n.isZero() ? new Decimal(1) : new Decimal(0);
    }
    if (k.equals(n)) {
      return new Decimal(1);
    }
    
    // Use the recurrence relation: s(n,k) = (n-1)*s(n-1,k) + s(n-1,k-1)
    const memo: { [key: string]: Decimal } = {};
    
    function stirling(n: number, k: number): Decimal {
      const key = `${n},${k}`;
      if (memo[key]) return memo[key];
      
      if (k === 0) return n === 0 ? new Decimal(1) : new Decimal(0);
      if (k > n) return new Decimal(0);
      if (k === n) return new Decimal(1);
      
      const result = new Decimal(n - 1).times(stirling(n - 1, k)).plus(stirling(n - 1, k - 1));
      memo[key] = result;
      return result;
    }
    
    return stirling(n.toNumber(), k.toNumber());
  },
  description: "Returns the Stirling number of the first kind s(n,k), which counts the number of permutations of n elements with exactly k cycles.",
  parameters: [
    {
      name: "n",
      type: "Decimal | number",
      description: "The number of elements",
      required: true,
    },
    {
      name: "k",
      type: "Decimal | number",
      description: "The number of cycles",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The Stirling number of the first kind s(n,k)",
  examples: [
    {
      title: "Calculate s(4,2)",
      code: `@n = 4
@k = 2
@result = stirlingS1(@n, @k)
@result`,
    },
    {
      title: "Calculate s(5,3)",
      code: `@n = 5
@k = 3
@result = stirlingS1(@n, @k)
@result`,
    },
    {
      title: "Calculate s(3,3)",
      code: `@n = 3
@k = 3
@result = stirlingS1(@n, @k)
@result`,
    },
  ],
}; 