import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const cubeFunction: BuiltInFunctionSpec = {
  name: "cube",
  handler: (x: Decimal | number) => new Decimal(x).pow(3),
  description: "Calculates x cubed (x^3) for any real number.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The number to cube",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "x cubed",
  examples: [
    {
      title: "Calculate various cubes",
      code: `@pos = 3
@decimal = 2.5
@neg = -2
@zero = 0

@cubePos = cube(@pos)
@cubeDecimal = cube(@decimal)
@cubeNeg = cube(@neg)
@cubeZero = cube(@zero)

\`"cube(3)" = @cubePos\`
\`"cube(2.5)" = @cubeDecimal\`
\`"cube(-2)" = @cubeNeg\`
\`"cube(0)" = @cubeZero\``,
    },
  ],
}; 