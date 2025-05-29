import Decimal from "decimal.js";
import ReactDOM from 'react-dom/client';
import React from 'react';
import { BUILT_IN_FUNCTIONS } from "../builtIns";
import { MAX_FIGURE_ELEMENTS } from "../constants";
import { evaluateExpression as evalExpr } from "../expressionEvaluator";
import type { FigureContext, AugmentedScriptVars, ScriptLineResult, ValidArgument, Point } from "../types";
import { createErrorElement } from "../utils";
import NumericText from "../../NumericText";

function parseArgs(
  argsString: string,
  runtimeVars: AugmentedScriptVars
): { parsedArgs?: ValidArgument[], errorElement?: HTMLElement } {
  if (!argsString) return { parsedArgs: [] };

  try {
    const parsedArgs = argsString.split(',').map(arg => {
      const trimmedArg = arg.trim();
      if ((trimmedArg.startsWith('"') && trimmedArg.endsWith('"')) ||
        (trimmedArg.startsWith("'") && trimmedArg.endsWith("'"))) {
        return trimmedArg.substring(1, trimmedArg.length - 1);
      }
      
      // Handle variable references starting with @
      if (trimmedArg.startsWith('@')) {
        const varName = trimmedArg.substring(1);
        if (runtimeVars[varName] !== undefined) {
          return runtimeVars[varName];
        }
        throw new Error(`Undefined variable: ${varName}`);
      }
      
      return evalExpr(trimmedArg, runtimeVars);
    });
    return { parsedArgs };
  } catch (e: any) {
    return { errorElement: createErrorElement(`Argument parsing error: ${e.message}`) };
  }
}

export function handleFunctionCall(
  trimmedLine: string,
  runtimeVars: AugmentedScriptVars,
  currentFigureContext: FigureContext | null,
  plainTextHandler: (line: string, rvs: AugmentedScriptVars, fc: FigureContext | null) => ScriptLineResult
): ScriptLineResult {
  const funcCallMatch = trimmedLine.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*\((.*)\)$/);
  if (!funcCallMatch) {
    return plainTextHandler(trimmedLine, runtimeVars, currentFigureContext);
  }

  const funcName = funcCallMatch[1];
  const argsString = funcCallMatch[2].trim();

  if (!BUILT_IN_FUNCTIONS[funcName]) {
    return plainTextHandler(trimmedLine, runtimeVars, currentFigureContext);
  }

  const argParsingResult = parseArgs(argsString, runtimeVars);
  if (argParsingResult.errorElement) {
    return { outputElement: argParsingResult.errorElement, error: true };
  }
  const parsedArgs = argParsingResult.parsedArgs || [];

  let figureContext = currentFigureContext ? { ...currentFigureContext } : null;
  let outputElement: Node | string | null = null;

  if (funcName === "create_figure") {
    figureContext = { elements: 0, points: {} };
    // No direct output, SVG created by point/join
  } else if (funcName === "join" && figureContext) {
    if (!figureContext.svg) { // Ensure SVG exists
      figureContext.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      figureContext.svg.setAttribute("width", "200"); figureContext.svg.setAttribute("height", "100");
      figureContext.svg.style.border = "1px solid #ccc";
      outputElement = figureContext.svg; // This SVG needs to be added to DOM
    }
    if (figureContext.elements >= MAX_FIGURE_ELEMENTS) {
      return { outputElement: createErrorElement(`Max ${MAX_FIGURE_ELEMENTS} fig elements`), error: true };
    }
    if (parsedArgs.length === 2) {
      // Check if both arguments are Point objects
      const p1 = parsedArgs[0];
      const p2 = parsedArgs[1];
      
      if (typeof p1 === 'object' && p1 !== null && 'x' in p1 && 'y' in p1 &&
          typeof p2 === 'object' && p2 !== null && 'x' in p2 && 'y' in p2) {
        const point1 = p1 as Point;
        const point2 = p2 as Point;
        
        if (figureContext.svg) {
          const lineEl = document.createElementNS("http://www.w3.org/2000/svg", "line");
          lineEl.setAttribute("x1", point1.x.toString()); 
          lineEl.setAttribute("y1", point1.y.toString());
          lineEl.setAttribute("x2", point2.x.toString()); 
          lineEl.setAttribute("y2", point2.y.toString());
          lineEl.setAttribute("stroke", "black");
          lineEl.setAttribute("stroke-width", "1");
          figureContext.svg.appendChild(lineEl);
          figureContext.elements++;
        }
      } else {
        return { outputElement: createErrorElement(`join requires two Point objects, got: ${typeof p1}, ${typeof p2}`), error: true };
      }
    } else {
      return { outputElement: createErrorElement("join needs 2 points."), error: true };
    }
  } else {
    const result = BUILT_IN_FUNCTIONS[funcName](...parsedArgs);
    if (result instanceof Decimal) {
      // Render numeric results with NumericText component
      const numericElement = document.createElement('span');
      numericElement.className = 'numeric-interpolation';
      
      const root = ReactDOM.createRoot(numericElement);
      root.render(React.createElement(NumericText, { value: result }));
      
      outputElement = numericElement;
    } else if (typeof result === 'object' && 'x' in result && 'y' in result) {
      // Handle Point objects - display as coordinates
      const pointElement = document.createElement('span');
      pointElement.className = 'point-display';
      pointElement.textContent = `(${result.x.toString()}, ${result.y.toString()})`;
      outputElement = pointElement;
    } else {
      outputElement = result as HTMLElement | Text | DocumentFragment;
    }
  }
  return { outputElement, updatedFigureContext: figureContext };
} 