import Decimal from 'decimal.js';
import type { AugmentedScriptVars, AugmentedScriptValue, AugmentedScriptArray } from './types';

export interface ArrayAssignment {
  variableName: string;
  arrayValue: AugmentedScriptArray;
}

/**
 * Parses array assignment expressions like "@ARR = [@X, @Y, [123]]"
 * Strict rules:
 * - Only @VARNAME or numeric literals allowed as non-array values
 * - Multi-layer arrays supported
 * - Numeric values parsed as high precision Decimal
 */
export function parseArrayAssignment(expression: string, vars: AugmentedScriptVars): ArrayAssignment {
  const trimmed = expression.trim();
  
  // Check if it matches the pattern "@VARNAME = [...]"
  const assignmentMatch = trimmed.match(/^@([a-zA-Z0-9_]+)\s*=\s*(.+)$/);
  if (!assignmentMatch) {
    throw new Error('Invalid array assignment syntax. Expected: @VARNAME = [...]');
  }
  
  const variableName = assignmentMatch[1];
  const arrayExpression = assignmentMatch[2].trim();
  
  // Parse the array expression
  const arrayValue = parseArrayExpression(arrayExpression, vars);
  
  return {
    variableName,
    arrayValue
  };
}

/**
 * Recursively parses array expressions like "[@X, @Y, [123]]"
 */
function parseArrayExpression(expression: string, vars: AugmentedScriptVars): AugmentedScriptArray {
  const trimmed = expression.trim();
  
  // Must start with [ and end with ]
  if (!trimmed.startsWith('[') || !trimmed.endsWith(']')) {
    throw new Error('Array expression must be enclosed in square brackets');
  }
  
  // Handle empty array
  const content = trimmed.slice(1, -1).trim();
  if (content === '') {
    return [];
  }
  
  // Parse array elements
  const elements = parseArrayElements(content, vars);
  
  return elements;
}

/**
 * Parses the content inside array brackets, handling nested arrays and proper comma separation
 */
function parseArrayElements(content: string, vars: AugmentedScriptVars): AugmentedScriptArray {
  const elements: AugmentedScriptArray = [];
  let currentElement = '';
  let bracketDepth = 0;
  let i = 0;
  
  while (i < content.length) {
    const char = content[i];
    
    if (char === '[') {
      bracketDepth++;
      currentElement += char;
    } else if (char === ']') {
      bracketDepth--;
      currentElement += char;
    } else if (char === ',' && bracketDepth === 0) {
      // Found a top-level comma, process the current element
      const element = parseArrayElement(currentElement.trim(), vars);
      elements.push(element);
      currentElement = '';
    } else {
      currentElement += char;
    }
    
    i++;
  }
  
  // Process the last element
  if (currentElement.trim()) {
    const element = parseArrayElement(currentElement.trim(), vars);
    elements.push(element);
  }
  
  return elements;
}

/**
 * Parses a single array element - can be @VARNAME, numeric literal, or nested array
 */
function parseArrayElement(element: string, vars: AugmentedScriptVars): AugmentedScriptValue {
  const trimmed = element.trim();
  
  // Check if it's a nested array
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return parseArrayExpression(trimmed, vars);
  }
  
  // Check if it's a variable reference (@VARNAME)
  if (trimmed.startsWith('@')) {
    const varName = trimmed.substring(1);
    if (!/^[a-zA-Z0-9_]+$/.test(varName)) {
      throw new Error(`Invalid variable name: ${varName}`);
    }
    
    if (!(varName in vars)) {
      throw new Error(`Undefined variable: ${varName}`);
    }
    
    return vars[varName];
  }
  
  // Check if it's a numeric literal
  if (/^\d*\.?\d+([eE][-+]?\d+)?$/.test(trimmed)) {
    try {
      return new Decimal(trimmed);
    } catch (e) {
      throw new Error(`Invalid numeric value: ${trimmed}`);
    }
  }
  
  // If none of the above, it's invalid
  throw new Error(`Invalid array element: ${trimmed}. Only @VARNAME or numeric values are allowed.`);
}

/**
 * Checks if an expression is an array assignment
 */
export function isArrayAssignment(expression: string): boolean {
  const trimmed = expression.trim();
  return /^@[a-zA-Z0-9_]+\s*=\s*\[/.test(trimmed);
} 