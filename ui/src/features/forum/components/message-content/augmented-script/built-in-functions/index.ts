import type { BuiltInFunctionSpec } from "../types";

// Existing functions
import { sinFunction } from "./sin";
import { cosFunction } from "./cos";
import { sqrtFunction } from "./sqrt";
import { pointFunction } from "./point";
import { joinFunction } from "./join";

// Basic arithmetic functions
import { addFunction } from "./add";
import { subtractFunction } from "./subtract";
import { multiplyFunction } from "./multiply";
import { divideFunction } from "./divide";
import { modFunction } from "./mod";
import { absFunction } from "./abs";
import { negFunction } from "./neg";
import { recipFunction } from "./recip";

// Rounding functions
import { floorFunction } from "./floor";
import { ceilFunction } from "./ceil";
import { roundFunction } from "./round";
import { truncFunction } from "./trunc";
import { signFunction } from "./sign";

// Comparison functions
import { minFunction } from "./min";
import { maxFunction } from "./max";
import { clampFunction } from "./clamp";

// Powers and exponents
import { powFunction } from "./pow";
import { squareFunction } from "./square";
import { cubeFunction } from "./cube";
import { cbrtFunction } from "./cbrt";
import { expFunction } from "./exp";
import { lnFunction } from "./ln";
import { log10Function } from "./log10";
import { log2Function } from "./log2";
import { logFunction } from "./log";

// Trigonometric functions
import { tanFunction } from "./tan";
import { asinFunction } from "./asin";
import { acosFunction } from "./acos";
import { atanFunction } from "./atan";
import { deg2radFunction } from "./deg2rad";
import { rad2degFunction } from "./rad2deg";

// Statistical functions
import { sumFunction } from "./sum";
import { productFunction } from "./product";
import { meanFunction } from "./mean";
import { createFigureFunction } from "./create-figure";
import { embedImageFunction } from "./embed-image";
import { embedWysiwygFunction } from "./embed-wysiwyg";
import { showUrlFunction } from "./show-url";

// Additional mathematical functions
import { catalanFunction } from "./catalan";
import { bellFunction } from "./bell";
import { stirlingS1Function } from "./stirlingS1";
import { stirlingS2Function } from "./stirlingS2";
import { multinomialFunction } from "./multinomial";
import { signumFunction } from "./signum";
import { isZeroFunction } from "./isZero";
import { isNegativeFunction } from "./isNegative";
import { isPositiveFunction } from "./isPositive";
import { isIntegerFunction } from "./isInteger";
import { ceilDivFunction } from "./ceilDiv";
import { fractFunction } from "./fract";
import { smoothStepFunction } from "./smoothStep";
import { lerpFunction } from "./lerp";
import { clamp01Function } from "./clamp01";

export const BUILT_IN_FUNCTION_SPECS: BuiltInFunctionSpec[] = [
  // Basic arithmetic functions
  addFunction,
  subtractFunction,
  multiplyFunction,
  divideFunction,
  modFunction,
  absFunction,
  negFunction,
  recipFunction,

  // Rounding functions
  floorFunction,
  ceilFunction,
  roundFunction,
  truncFunction,
  signFunction,

  // Comparison functions
  minFunction,
  maxFunction,
  clampFunction,

  // Powers and exponents
  powFunction,
  squareFunction,
  cubeFunction,
  cbrtFunction,
  expFunction,
  lnFunction,
  log10Function,
  log2Function,
  logFunction,

  // Trigonometric functions
  sinFunction,
  cosFunction,
  tanFunction,
  asinFunction,
  acosFunction,
  atanFunction,
  deg2radFunction,
  rad2degFunction,

  // Statistical functions
  sumFunction,
  productFunction,
  meanFunction,

  // Math functions
  sqrtFunction,

  // Geometry functions
  pointFunction,
  createFigureFunction,
  joinFunction,

  // Content embedding functions
  embedImageFunction,
  showUrlFunction,
  embedWysiwygFunction,

  // Additional mathematical functions
  catalanFunction,
  bellFunction,
  stirlingS1Function,
  stirlingS2Function,
  multinomialFunction,
  signumFunction,
  isZeroFunction,
  isNegativeFunction,
  isPositiveFunction,
  isIntegerFunction,
  ceilDivFunction,
  fractFunction,
  smoothStepFunction,
  lerpFunction,
  clamp01Function,
];

// Create a lookup map for compatibility with existing code
export const BUILT_IN_FUNCTIONS_MAP: Record<string, any> = {};
BUILT_IN_FUNCTION_SPECS.forEach(spec => {
  BUILT_IN_FUNCTIONS_MAP[spec.name] = spec.handler;
});

// Add special handling for join function - it's handled in the function call handler
BUILT_IN_FUNCTIONS_MAP["join"] = () => document.createDocumentFragment();

// Export all functions
export * from "./add";
export * from "./subtract";
export * from "./multiply";
export * from "./divide";
export * from "./mod";
export * from "./abs";
export * from "./neg";
export * from "./recip";
export * from "./floor";
export * from "./ceil";
export * from "./round";
export * from "./trunc";
export * from "./sign";
export * from "./min";
export * from "./max";
export * from "./clamp";
export * from "./pow";
export * from "./square";
export * from "./cube";
export * from "./cbrt";
export * from "./exp";
export * from "./ln";
export * from "./log10";
export * from "./log2";
export * from "./log";
export * from "./tan";
export * from "./asin";
export * from "./acos";
export * from "./atan";
export * from "./deg2rad";
export * from "./rad2deg";
export * from "./sum";
export * from "./product";
export * from "./mean";
export * from "./sin";
export * from "./cos";
export * from "./sqrt";
export * from "./point";
export * from "./create-figure";
export * from "./join";
export * from "./embed-image";
export * from "./show-url";
export * from "./embed-wysiwyg";
export * from "./catalan";
export * from "./bell";
export * from "./stirlingS1";
export * from "./stirlingS2";
export * from "./multinomial";
export * from "./signum";
export * from "./isZero";
export * from "./isNegative";
export * from "./isPositive";
export * from "./isInteger";
export * from "./ceilDiv";
export * from "./fract";
export * from "./smoothStep";
export * from "./lerp";
export * from "./clamp01"; 