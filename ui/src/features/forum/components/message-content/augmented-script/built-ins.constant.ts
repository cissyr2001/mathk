import { BUILT_IN_FUNCTIONS_MAP, BUILT_IN_FUNCTION_SPECS } from "./built-in-functions";
import type { BuiltInFunction } from "./types";

// Note: `evaluateExpression` would be passed or imported if complex args need it here.
// For now, assuming args are pre-evaluated before calling these.

// Get math function names dynamically from BUILT_IN_FUNCTION_SPECS
export const MATH_FUNCTION_NAMES = BUILT_IN_FUNCTION_SPECS
  .filter(spec => !['embedImage', 'showUrl', 'embedWysiwyg', 'createFigure', 'join'].includes(spec.name))
  .map(spec => spec.name);

// Export the functions map from the new structure for backward compatibility
export const BUILT_IN_FUNCTIONS: Record<string, BuiltInFunction> = BUILT_IN_FUNCTIONS_MAP; 