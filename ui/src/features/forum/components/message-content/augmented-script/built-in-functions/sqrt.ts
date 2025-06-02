import Decimal from "decimal.js";
import type { BuiltInFunctionSpec } from "../types";

export const sqrtFunction: BuiltInFunctionSpec = {
  name: "sqrt",
  handler: (x: Decimal) => {
    if (x.isNegative()) {
      throw new Error('Cannot calculate square root of negative number');
    }
    return Decimal.sqrt(x);
  },
  description: "Calculates the square root of a non-negative number. Returns the square root as a decimal. Special cases: sqrt(0) = 0, sqrt(1) = 1, sqrt(4) = 2, sqrt(9) = 3. Throws an error for negative inputs.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The non-negative number to calculate square root for",
      required: true,
    },
  ],
  returnType: "Decimal",
  returnDescription: "The square root of the input number",
  examples: [
    {
      title: "Square root calculations with various values",
      code: `// Special cases (0, 1, 4, 9)
@zero = 0
@one = 1
@four = 4
@nine = 9

@sqrtZero = sqrt(@zero)  // √0 = 0
@sqrtOne = sqrt(@one)    // √1 = 1
@sqrtFour = sqrt(@four)  // √4 = 2
@sqrtNine = sqrt(@nine)  // √9 = 3

// Perfect squares (16, 25, 36)
@sixteen = 16
@twentyFive = 25
@thirtySix = 36

@sqrtSixteen = sqrt(@sixteen)     // √16 = 4
@sqrtTwentyFive = sqrt(@twentyFive) // √25 = 5
@sqrtThirtySix = sqrt(@thirtySix)   // √36 = 6

// Irrational numbers (2, 3, 5)
@two = 2
@three = 3
@five = 5

@sqrtTwo = sqrt(@two)     // √2 ≈ 1.4142135624
@sqrtThree = sqrt(@three) // √3 ≈ 1.7320508076
@sqrtFive = sqrt(@five)   // √5 ≈ 2.2360679775

// Decimal numbers (0.25, 0.5, 1.5)
@quarter = 0.25
@half = 0.5
@oneAndHalf = 1.5

@sqrtQuarter = sqrt(@quarter)     // √0.25 = 0.5
@sqrtHalf = sqrt(@half)          // √0.5 ≈ 0.7071067812
@sqrtOneAndHalf = sqrt(@oneAndHalf) // √1.5 ≈ 1.2247448714

// Results
\`√0 = @sqrtZero\`
\`√1 = @sqrtOne\`
\`√4 = @sqrtFour\`
\`√9 = @sqrtNine\`
\`√16 = @sqrtSixteen\`
\`√25 = @sqrtTwentyFive\`
\`√36 = @sqrtThirtySix\`
\`√2 = @sqrtTwo\`
\`√3 = @sqrtThree\`
\`√5 = @sqrtFive\`
\`√0.25 = @sqrtQuarter\`
\`√0.5 = @sqrtHalf\`
\`√1.5 = @sqrtOneAndHalf\``,
    },
  ],
}; 