import Decimal from "decimal.js";
import ReactDOM from 'react-dom/client';
import React from 'react';
import { createErrorElement, shouldRenderAsHtmlElement } from "../utils";
import type { ScriptLineResult, AugmentedScriptVars, FigureContext, AugmentedScriptValue, Point } from "../types";
import NumericText from "../../numeric-text.component";

export function handleVariableRender(
  trimmedLine: string,
  runtimeVars: AugmentedScriptVars,
  currentFigureContext: FigureContext | null
): ScriptLineResult {
  // Check if this is exactly a variable reference (e.g., "@VARNAME")
  const varMatch = trimmedLine.match(/^@([a-zA-Z0-9_]+)$/);
  if (!varMatch) {
    // Not a variable-only line, should be handled by another handler
    return { outputElement: createErrorElement(`Invalid variable reference: ${trimmedLine}`), error: true };
  }

  const varName = varMatch[1];
  
  if (!(varName in runtimeVars)) {
    return { outputElement: createErrorElement(`Undefined variable: @${varName}`), error: true };
  }

  const value = runtimeVars[varName];
  let outputElement: Node | string | null = null;

  try {
    outputElement = renderValue(value);
  } catch (e: any) {
    return { outputElement: createErrorElement(`Error rendering variable @${varName}: ${e.message}`), error: true };
  }

  return { outputElement, updatedFigureContext: currentFigureContext };
}

function renderValue(value: AugmentedScriptValue): Node | string {
  if (value instanceof Decimal) {
    // Check if the number has fewer than 9 significant figures
    if (!shouldRenderAsHtmlElement(value)) {
      // Render as plain text for numbers with fewer than 9 significant figures
      return document.createTextNode(value.toString());
    }
    
    // Render numeric values with NumericText component for numbers with 9+ significant figures
    const numericElement = document.createElement('span');
    numericElement.className = 'numeric-interpolation';
    
    const root = ReactDOM.createRoot(numericElement);
    root.render(React.createElement(NumericText, { value }));
    
    return numericElement;
  } else if (typeof value === 'object' && value !== null && 'x' in value && 'y' in value) {
    // Handle Point objects - display as coordinates
    const point = value as Point;
    const pointElement = document.createElement('span');
    pointElement.className = 'point-display';
    pointElement.textContent = `(${point.x.toString()}, ${point.y.toString()})`;
    return pointElement;
  } else if (Array.isArray(value)) {
    // Handle arrays - display as formatted text
    const arrayElement = document.createElement('span');
    arrayElement.className = 'array-display';
    arrayElement.textContent = formatArray(value);
    return arrayElement;
  } else if (typeof value === 'string') {
    // Handle string values
    return document.createTextNode(value);
  } else {
    // Fallback for other types
    return document.createTextNode(String(value));
  }
}

function formatArray(arr: AugmentedScriptValue[]): string {
  const formatItem = (item: AugmentedScriptValue): string => {
    if (item instanceof Decimal) {
      return item.toString();
    } else if (typeof item === 'object' && item !== null && 'x' in item && 'y' in item) {
      const point = item as Point;
      return `(${point.x.toString()}, ${point.y.toString()})`;
    } else if (Array.isArray(item)) {
      return formatArray(item);
    } else {
      return String(item);
    }
  };

  return '[' + arr.map(formatItem).join(', ') + ']';
} 