import type { AugmentedScriptVars, AugmentedScriptValue, AugmentedScriptArray, Point } from "./types";
import Decimal from "decimal.js";

/**
 * Converts an AugmentedScriptValue to a string representation
 */
function valueToString(value: AugmentedScriptValue): string {
  if (value instanceof Decimal) {
    return value.toString();
  }
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value)) {
    return arrayToString(value);
  }
  if (typeof value === 'object' && 'x' in value && 'y' in value) {
    const point = value as Point;
    return `(${point.x.toString()}, ${point.y.toString()})`;
  }
  return String(value);
}

/**
 * Converts an array to a readable string format like "[1, 2, [3, 4]]"
 */
function arrayToString(arr: AugmentedScriptArray): string {
  const elements = arr.map(element => valueToString(element));
  return `[${elements.join(', ')}]`;
}

export function interpolateString(
  str: string,
  runtimeVars: AugmentedScriptVars
): string {
  return str.replace(/@([a-zA-Z0-9_]+)/g, (_match, varName) => {
    if (varName in runtimeVars) {
      const value = runtimeVars[varName];
      return valueToString(value);
    }
    return `[Unknown var: ${varName}]`;
  });
} 