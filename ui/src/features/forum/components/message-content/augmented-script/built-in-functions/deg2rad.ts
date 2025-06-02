import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const deg2radFunction: BuiltInFunctionSpec = {
  name: "deg2rad",
  handler: (x: Decimal | number) => new Decimal(x).mul(Decimal.acos(-1)).div(180),
  description: "Converts an angle from degrees to radians.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The angle in degrees",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The angle in radians",
  examples: [
    {
      title: "Convert various angles from degrees to radians",
      code: `@pos = 180
@neg = -90
@zero = 0
@decimal = 45.5

@radPos = deg2rad(@pos)
@radNeg = deg2rad(@neg)
@radZero = deg2rad(@zero)
@radDecimal = deg2rad(@decimal)

\`deg2rad(180) = @radPos\`
\`deg2rad(-90) = @radNeg\`
\`deg2rad(0) = @radZero\`
\`deg2rad(45.5) = @radDecimal\``,
    },
  ],
}; 