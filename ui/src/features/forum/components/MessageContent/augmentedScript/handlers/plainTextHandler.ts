import asciimath2latex from 'asciimath-to-latex'; import katex from "katex";
import { interpolateStringEnhanced, interpolateStringSimple } from "../enhancedStringUtils";
import { createErrorElement } from "../utils";
import type { ScriptLineResult, AugmentedScriptVars, FigureContext } from "../types";
import { convertAsciiMathToLatex } from "mathlive";

export function handlePlainText(
  trimmedLine: string,
  runtimeVars: AugmentedScriptVars,
  _figureContext: FigureContext | null // Not used by plain text directly
): ScriptLineResult {
  const p = document.createElement("p");

  // Use enhanced interpolation to detect numeric values
  const interpolationResult = interpolateStringEnhanced(trimmedLine, runtimeVars);
  let interpolated: string;
  let baseFragment: DocumentFragment;

  if (interpolationResult.hasNumericValues) {
    // Use the enhanced interpolation result
    baseFragment = interpolationResult.fragment;
    // For KaTeX processing, we need a string representation
    const tempDiv = document.createElement('div');
    tempDiv.appendChild(interpolationResult.fragment.cloneNode(true));
    interpolated = tempDiv.innerHTML;
  } else {
    // Use simple string interpolation
    interpolated = interpolateStringSimple(trimmedLine, runtimeVars);
    baseFragment = document.createDocumentFragment();
    baseFragment.appendChild(document.createTextNode(interpolated));
  }

  try {
    if (interpolated.includes('`')) {
      // Handle inline KaTeX in the interpolated content
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;

      // If we have numeric values, we need to work with the DOM elements directly
      if (interpolationResult.hasNumericValues) {
        // For now, append the base fragment and handle KaTeX separately
        // This is a simplified approach - in a production system, you might want
        // more sophisticated KaTeX integration with numeric components
        p.appendChild(baseFragment);
      } else {
        // Original KaTeX processing for simple text
        interpolated.replace(/`([^`]+)`/g, (match, mathContent, offset) => {
          if (offset > lastIndex) {
            fragment.appendChild(document.createTextNode(interpolated.substring(lastIndex, offset)));
          }
          const mathSpan = document.createElement("span");
          console.log('mathContent', mathContent);
          katex.render(asciimath2latex(mathContent), mathSpan, { throwOnError: false, displayMode: true });
          fragment.appendChild(mathSpan);
          lastIndex = offset + match.length;
          return ''; // Required by replace
        });
        if (lastIndex < interpolated.length) {
          fragment.appendChild(document.createTextNode(interpolated.substring(lastIndex)));
        }
        p.appendChild(fragment);
      }
    } else {
      // No KaTeX, just append the interpolated content
      p.appendChild(baseFragment);
    }
  } catch (e: any) {
    console.error("Error rendering inline KaTeX:", e);
    p.textContent = interpolated; // Fallback
    p.appendChild(createErrorElement("KaTeX rendering error in text line."));
    return { outputElement: p, error: true }; // error considered true for rendering issues
  }
  return { outputElement: p };
} 