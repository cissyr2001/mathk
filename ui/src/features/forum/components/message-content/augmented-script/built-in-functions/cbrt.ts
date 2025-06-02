import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const cbrtFunction: BuiltInFunctionSpec = {
  name: "cbrt",
  handler: (x: Decimal | number) => {
    const num = new Decimal(x);
    // Handle negative numbers by taking absolute value and negating result
    if (num.isNegative()) {
      return num.abs().pow(new Decimal(1).div(3)).neg().toDP(10);
    }
    return num.pow(new Decimal(1).div(3)).toDP(10);
  },
  description: "Calculates the cube root of x (cbrt x). Handles negative and positive values.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to find the cube root of",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The cube root of x",
  examples: [
    {
      title: "Calculate various cube roots",
      code: `@pos = 27
@small = 8
@neg = -8
@zero = 0

@cbrtPos = cbrt(@pos)
@cbrtSmall = cbrt(@small)
@cbrtNeg = cbrt(@neg)
@cbrtZero = cbrt(@zero)

\`"cbrt(27)" = @cbrtPos\`
\`"cbrt(8)" = @cbrtSmall\`
\`"cbrt(-8)" = @cbrtNeg\`
\`"cbrt(0)" = @cbrtZero\``,
    },
  ],
}; 