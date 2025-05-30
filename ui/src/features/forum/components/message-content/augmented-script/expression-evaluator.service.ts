/**
 * @deprecated This service is deprecated. Please use evaluateExpression from expression-parser.service.ts instead.
 * This file is kept for backward compatibility and will be removed in a future version.
 */

import Decimal from "decimal.js";
import { PREDEFINED_CONSTANTS } from "./constants.constant";
import { evaluateExpression as evaluateExpr } from "./expression-parser.service";
import { interpolateString } from "./string-utils";
import type { AugmentedScriptVars, Point } from "./types";

export function evaluateExpression(
  expr: string,
  runtimeVars: AugmentedScriptVars,
  builtInFunctions: Record<string, Function> = {}
): Decimal | string | Point {
  // Forward to the new implementation
  return evaluateExpr(expr, runtimeVars, builtInFunctions);
}

export function evaluateExpressionOld(
  expr: string,
  runtimeVars: AugmentedScriptVars,
  builtInFunctions: Record<string, Function> = {}
): Decimal | string | Point {
  const originalExpr = expr.trim();

  // Handle string literals
  if ((originalExpr.startsWith('"') && originalExpr.endsWith('"')) ||
    (originalExpr.startsWith("'") && originalExpr.endsWith("'"))) {
    return originalExpr.slice(1, -1);
  }

  // Handle variable references
  if (originalExpr.startsWith('@')) {
    const varName = originalExpr.substring(1);
    const value = runtimeVars[varName];
    if (value === undefined) {
      throw new Error(`Undefined variable: ${varName}`);
    }
    if (value instanceof Decimal) {
      return value;
    }
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'object' && 'x' in value && 'y' in value) {
      return value as Point;
    }
    throw new Error(`Unsupported variable type: ${typeof value}`);
  }

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
    return evaluateExpr(originalExpr, runtimeVars, builtInFunctions);
  } catch (e) {
    // If that fails, check if it's a function call
    const funcCallMatch = originalExpr.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*\((.*)\)$/);
    if (funcCallMatch) {
      const funcName = funcCallMatch[1];
      const argString = funcCallMatch[2].trim();

      if (funcName === 'point') {
        // Handle point() function specially
        const args = argString.split(/,(?![^(]*\))/).map(arg => {
          const result = evaluateExpression(arg.trim(), runtimeVars, builtInFunctions);
          if (!(result instanceof Decimal)) {
            throw new Error(`Argument to point() must be numeric: ${arg}`);
          }
          return result;
        });

        if (args.length !== 2) {
          throw new Error('point() requires exactly 2 arguments');
        }

        return {
          x: args[0],
          y: args[1]
        };
      }

      // Handle other functions
      const func = builtInFunctions[funcName];
      if (!func) {
        throw new Error(`Unknown function: ${funcName}`);
      }

      // Split arguments by comma, but not inside parentheses
      const args = argString.split(/,(?![^(]*\))/).map(arg => {
        const result = evaluateExpression(arg.trim(), runtimeVars, builtInFunctions);
        if (!(result instanceof Decimal)) {
          throw new Error(`Argument to ${funcName} must be numeric: ${arg}`);
        }
        return result;
      });

      const result = func(...args);
      if (result instanceof Decimal) {
        return result;
      }
      if (typeof result === 'string') {
        return result;
      }
      if (typeof result === 'object' && 'x' in result && 'y' in result) {
        return result as Point;
      }
      throw new Error(`Unsupported return type from function ${funcName}: ${typeof result}`);
    }

    // If it's not a function call, try to evaluate as a string
    return originalExpr;
  }
} 