import Decimal from "decimal.js";

// Configure Decimal.js for arbitrary precision
Decimal.set({
  precision: 400,  // Increased precision for constants
  rounding: 4,   // ROUND_HALF_UP
  toExpPos: 9e15,  // Show exponential notation for very large numbers
  toExpNeg: -9e15, // Show exponential notation for very small numbers
  maxE: 9e15,      // Maximum allowed exponent
  minE: -9e15      // Minimum allowed exponent
});

// Constant type for better type safety and identification
export type MathConstant = {
  value: Decimal;
  symbol: string;
  name: string;
  category: 'mathematical' | 'physical' | 'geometric';
};

// Create a private object to store the actual values
const _CONSTANTS: Record<string, MathConstant> = {
  // Mathematical Constants
  PI: {
    value: new Decimal("3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196"),
    symbol: "π",
    name: "Pi",
    category: 'mathematical'
  },
  E: {
    value: new Decimal("2.71828182845904523536028747135266249775724709369995957496696762772407663035354759457138217852516642742746639193200305992181741359662904357290033429526059563073813232862794349076323382988075319525101901"),
    symbol: "e",
    name: "Euler's Number",
    category: 'mathematical'
  },
  PHI: {
    value: new Decimal("1.61803398874989484820458683436563811772030917980576286213544862270526046281890244970720720418939113748475408807538689175212663386222353693179318006076672635443338908659593958290563832266131992829026788"),
    symbol: "φ",
    name: "Golden Ratio",
    category: 'mathematical'
  },
  EULER_MASCHERONI: {
    value: new Decimal("0.57721566490153286060651209008240243104215933593992359880576723488486772677766467093694706329174674951463144724980708248096050401448654283622417399764492353625350033374293733773767394279259525824709491"),
    symbol: "γ",
    name: "Euler-Mascheroni Constant",
    category: 'mathematical'
  },
  CONWAY_CONSTANT: {
    value: new Decimal("1.30357726903429639125709911215255189073070250465940487575486139062855088785246155712681576686442522562845315696102620221428787120272404473550777989414993442346858263346609788050606546987815114567832268"),
    symbol: "λ",
    name: "Conway's Constant",
    category: 'mathematical'
  },
  KAPREKAR_CONSTANT: {
    value: new Decimal("6174"),
    symbol: "K",
    name: "Kaprekar's Constant",
    category: 'mathematical'
  },
  // Physical Constants
  SPEED_OF_LIGHT: {
    value: new Decimal("299792458"),
    symbol: "c",
    name: "Speed of Light",
    category: 'physical'
  },
  PLANCK_CONSTANT: {
    value: new Decimal("6.62607015e-34"),
    symbol: "h",
    name: "Planck Constant",
    category: 'physical'
  },
  GRAVITATIONAL_CONSTANT: {
    value: new Decimal("6.67430e-11"),
    symbol: "G",
    name: "Gravitational Constant",
    category: 'physical'
  },
  BOLTZMANN_CONSTANT: {
    value: new Decimal("1.380649e-23"),
    symbol: "k",
    name: "Boltzmann Constant",
    category: 'physical'
  },
  // Geometric Constants
  SQRT2: {
    value: new Decimal("1.41421356237309504880168872420969807856967187537694807317667973799073247846210703885038753432764157273501384623091229702492483605585073721264412149709993583141322266592750559275579995050115278206057147"),
    symbol: "√2",
    name: "Square Root of 2",
    category: 'geometric'
  },
  SQRT3: {
    value: new Decimal("1.73205080756887729352744634150587236694280525381038062805580697945193301690880003708114618675724857567562614141540670302996994509499895247881165551209437364852809323190230558206797482010108467492326501"),
    symbol: "√3",
    name: "Square Root of 3",
    category: 'geometric'
  },
  SQRT5: {
    value: new Decimal("2.23606797749978969640917366873127623544061835961152572427089724541052092563780489941441440837878227496950817615077378379225326772444707386358636012153345270886677817319187916581127664532263985658053577"),
    symbol: "√5",
    name: "Square Root of 5",
    category: 'geometric'
  }
};

// Create a proxy that returns just the Decimal values for compatibility
export const CONSTANTS = new Proxy(_CONSTANTS, {
  get(target, prop: string) {
    if (prop in target) {
      return target[prop].value;
    }
    return undefined;
  }
});

// Create a map for constant identification
export const CONSTANT_IDENTIFIERS = new Map<string, string>();
Object.entries(_CONSTANTS).forEach(([key, constant]) => {
  CONSTANT_IDENTIFIERS.set(constant.value.toString(), key);
  CONSTANT_IDENTIFIERS.set(constant.symbol, key);
});

// Resource Limits
export const MAX_BAR_CHART_POINTS = 10;
export const MAX_FIGURE_ELEMENTS = 100;
export const MAX_IMAGE_SIZE_MB = 1; // Currently unused, for future implementation

// TODO: Define approved domains for images
// export const APPROVED_IMAGE_DOMAINS: string[] = ["math.example.com"]; 