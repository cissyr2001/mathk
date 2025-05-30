import Decimal from "decimal.js";
import ReactDOM from 'react-dom/client';
import React from 'react';
import NumericText from "../numeric-text.component";
import type { AugmentedScriptValue, AugmentedScriptArray, AugmentedScriptVars } from "./types";
import { shouldRenderAsHtmlElement } from "./utils";

export interface InterpolationResult {
  fragment: DocumentFragment;
  hasNumericValues: boolean;
}

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
  return String(value);
}

/**
 * Converts an array to a readable string format like "[1, 2, [3, 4]]"
 */
function arrayToString(arr: AugmentedScriptArray): string {
  const elements = arr.map(element => valueToString(element));
  return `[${elements.join(', ')}]`;
}

/**
 * Enhanced interpolation that can render numeric values as interactive components
 */
export function interpolateStringEnhanced(
  str: string,
  runtimeVars: AugmentedScriptVars
): InterpolationResult {
  const fragment = document.createDocumentFragment();
  let hasNumericValues = false;
  let lastIndex = 0;

  // Find all variable references
  const varPattern = /@([a-zA-Z0-9_]+)/g;
  let match;

  while ((match = varPattern.exec(str)) !== null) {
    const varName = match[1];
    const matchStart = match.index;
    const matchEnd = matchStart + match[0].length;

    // Add text before this variable
    if (matchStart > lastIndex) {
      const textBefore = str.substring(lastIndex, matchStart);
      fragment.appendChild(document.createTextNode(textBefore));
    }

    if (varName in runtimeVars) {
      const value = runtimeVars[varName];

      if (value instanceof Decimal || (typeof value === 'number' && !isNaN(value))) {
        const decimalValue = value instanceof Decimal ? value : new Decimal(value);

        // Check if the number should be rendered as HTML element
        if (shouldRenderAsHtmlElement(decimalValue)) {
          // This is a numeric value with 9+ significant figures - render with NumericText component
          hasNumericValues = true;
          const numericElement = document.createElement('span');
          numericElement.className = 'numeric-interpolation';

          const root = ReactDOM.createRoot(numericElement);
          root.render(React.createElement(NumericText, { value: decimalValue }));

          fragment.appendChild(numericElement);
        } else {
          // Render as plain text for numbers with fewer than 9 significant figures
          fragment.appendChild(document.createTextNode(decimalValue.toString()));
        }
      } else if (typeof value === 'string') {
        // String interpolation
        fragment.appendChild(document.createTextNode(value));
      } else if (Array.isArray(value)) {
        // Array interpolation - display as formatted text
        const arrayText = arrayToString(value);
        fragment.appendChild(document.createTextNode(arrayText));
      } else {
        // Other types - convert to string
        fragment.appendChild(document.createTextNode(String(value)));
      }
    } else {
      // Unknown variable
      fragment.appendChild(document.createTextNode(`[Unknown var: ${varName}]`));
    }

    lastIndex = matchEnd;
  }

  // Add remaining text
  if (lastIndex < str.length) {
    const textAfter = str.substring(lastIndex);
    fragment.appendChild(document.createTextNode(textAfter));
  }

  return { fragment, hasNumericValues };
}

/**
 * Fallback function that works like the original interpolateString for compatibility
 */
export function interpolateStringSimple(
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