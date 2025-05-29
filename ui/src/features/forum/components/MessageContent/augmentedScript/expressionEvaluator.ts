import Decimal from "decimal.js";
import { BUILT_IN_FUNCTIONS, MATH_FUNCTION_NAMES } from "./builtIns";
import { PREDEFINED_CONSTANTS } from "./constants";
import { evaluateExpression as evaluateExpr } from "./expressionParser";
import { interpolateString } from "./stringUtils";
import type { AugmentedScriptVars, Point } from "./types";

export function evaluateExpression(
  expr: string,
  runtimeVars: AugmentedScriptVars
): Decimal | string | Point {
  const originalExpr = expr.trim();

  // First check if it's a predefined constant
  if (PREDEFINED_CONSTANTS[originalExpr]) return PREDEFINED_CONSTANTS[originalExpr];

  // Then check if it's a direct variable reference
  if (runtimeVars[originalExpr] instanceof Decimal) return runtimeVars[originalExpr] as Decimal;
  
  // Check if it's a Point object
  if (typeof runtimeVars[originalExpr] === 'object' && 
      runtimeVars[originalExpr] !== null &&
      'x' in runtimeVars[originalExpr] && 
      'y' in runtimeVars[originalExpr]) {
    return runtimeVars[originalExpr] as Point;
  }
  
  if (typeof runtimeVars[originalExpr] === 'string') {
    try {
      return new Decimal(runtimeVars[originalExpr] as string);
    }
    catch (e) { /* not a number-like string, proceed */ }
  }
  
  // Handle array variables - they can't be used in mathematical expressions
  if (Array.isArray(runtimeVars[originalExpr])) {
    // Return the array as a string representation through interpolation
    return interpolateString(`@${originalExpr}`, runtimeVars);
  }

  try {
    // First try to evaluate as a mathematical expression
    return evaluateExpr(originalExpr, runtimeVars);
  } catch (e) {
    // If that fails, check if it's a function call
    const funcCallMatch = originalExpr.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\((.*)\)$/);
    if (funcCallMatch) {
      const funcName = funcCallMatch[1];
      const argString = funcCallMatch[2];

      if (BUILT_IN_FUNCTIONS[funcName]) {
        if (MATH_FUNCTION_NAMES.includes(funcName)) {
          try {
            // Split arguments by comma, but not inside parentheses
            const args = argString.split(/,(?![^(]*\))/).map(arg => {
              const result = evaluateExpression(arg.trim(), runtimeVars);
              if (!(result instanceof Decimal)) {
                throw new Error(`Argument to ${funcName} must be numeric: ${arg}`);
              }
              return result;
            });

            const result = BUILT_IN_FUNCTIONS[funcName](...args);
            if (result instanceof Decimal) return result;
            return new Decimal(result.toString());
          } catch (e: any) {
            throw new Error(`Error in ${funcName}: ${e.message}`);
          }
        } else if (funcName === 'point') {
          try {
            // Handle point() function specially
            const args = argString.split(/,(?![^(]*\))/).map(arg => {
              const result = evaluateExpression(arg.trim(), runtimeVars);
              if (!(result instanceof Decimal)) {
                throw new Error(`Argument to point() must be numeric: ${arg}`);
              }
              return result;
            });
            
            if (args.length !== 2) {
              throw new Error(`point() requires exactly 2 arguments, got ${args.length}`);
            }

            return BUILT_IN_FUNCTIONS[funcName](...args) as Point;
          } catch (e: any) {
            throw new Error(`Error in ${funcName}: ${e.message}`);
          }
        }
      }
    }

    // If all else fails, try string interpolation
    return interpolateString(originalExpr, runtimeVars);
  }
} 