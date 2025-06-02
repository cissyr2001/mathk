import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const rad2degFunction: BuiltInFunctionSpec = {
  name: "rad2deg",
  handler: (x: Decimal | number) => new Decimal(x).mul(180).div(Decimal.acos(-1)),
  description: "Converts an angle from radians to degrees.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The angle in radians",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The angle in degrees",
  examples: [
    {
      title: "Convert various angles from radians to degrees",
      code: `@pi = acos(-1)
@pi_half = @pi / 2
@neg = -@pi_half
@zero = 0
@decimal = 1.5708

@degPi = rad2deg(@pi)
@degPiHalf = rad2deg(@pi_half)
@degNeg = rad2deg(@neg)
@degZero = rad2deg(@zero)
@degDecimal = rad2deg(@decimal)

\`"rad2deg(π)" = @degPi\`
\`"rad2deg(π/2)" = @degPiHalf\`
\`"rad2deg(-π/2)" = @degNeg\`
\`"rad2deg(0)" = @degZero\`
\`"rad2deg(1.5708)" = @degDecimal\``,
    },
  ],
}; 