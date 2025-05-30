import Decimal from "decimal.js";

// Configure Decimal.js for arbitrary precision
Decimal.set({ 
  precision: 50,  // 0 means no arbitrary limit on precision
  rounding: 4,   // ROUND_HALF_UP
  toExpPos: 9e15,  // Show exponential notation for very large numbers
  toExpNeg: -9e15, // Show exponential notation for very small numbers
  maxE: 9e15,      // Maximum allowed exponent
  minE: -9e15      // Minimum allowed exponent
});

export const PREDEFINED_CONSTANTS: Record<string, Decimal> = {
  // Use string literals to maintain maximum precision for constants
  PI: new Decimal("3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196"),
  E: new Decimal("2.71828182845904523536028747135266249775724709369995957496696762772407663035354759457138217852516642742746639193200305992181741359662904357290033429526059563073813232862794349076323382988075319525101901"),
  SQRT2: new Decimal("1.41421356237309504880168872420969807856967187537694807317667973799073247846210703885038753432764157273501384623091229702492483605585073721264412149709993583141322266592750559275579995050115278206057147")
};

// Resource Limits
export const MAX_BAR_CHART_POINTS = 10;
export const MAX_FIGURE_ELEMENTS = 100;
export const MAX_IMAGE_SIZE_MB = 1; // Currently unused, for future implementation

// TODO: Define approved domains for images
// export const APPROVED_IMAGE_DOMAINS: string[] = ["math.example.com"]; 