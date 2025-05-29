import Decimal from "decimal.js";
import { createErrorElement } from "../utils";
import { evaluateExpression as evalExpr } from "../expressionEvaluator";
import { parseArrayAssignment, isArrayAssignment } from "../arrayParser";
import { MAX_FIGURE_ELEMENTS } from "../constants";
import type { ScriptLineResult, AugmentedScriptVars, FigureContext, Point } from "../types";

export function handleVariableAssignment(
  trimmedLine: string,
  runtimeVars: AugmentedScriptVars,
  currentFigureContext: FigureContext | null
): ScriptLineResult {
  // Check if this is an array assignment first
  if (isArrayAssignment(trimmedLine)) {
    try {
      const { variableName, arrayValue } = parseArrayAssignment(trimmedLine, runtimeVars);
      runtimeVars[variableName] = arrayValue;
      return { updatedFigureContext: currentFigureContext }; // No direct output for var assignment
    } catch (e: any) {
      return { outputElement: createErrorElement(`Array assignment error: ${e.message}`), error: true };
    }
  }

  // Handle regular variable assignments
  const parts = trimmedLine.split("=");
  if (parts.length < 2) {
    // This case should ideally be caught by plain text handler if it's just "@Var"
    return { outputElement: document.createTextNode(trimmedLine), error: false };
  }

  const varNameFull = parts[0].trim();
  const expression = parts.slice(1).join("=").trim();

  if (!/^@[a-zA-Z0-9]+$/.test(varNameFull)) {
    return { outputElement: createErrorElement(`Invalid var name: ${varNameFull}`), error: true };
  }
  const varName = varNameFull.substring(1);

  let figureContext = currentFigureContext ? { ...currentFigureContext } : null;

  try {
    const value = evalExpr(expression, runtimeVars);
    
    // Check if the value is a Point object and we have a figure context
    if (typeof value === 'object' && 'x' in value && 'y' in value) {
      const point = value as Point;
      
      if (!figureContext) {
        return { outputElement: createErrorElement(`Point assignment requires a figure context. Call create_figure() first.`), error: true };
      }
      
      if (figureContext.elements >= MAX_FIGURE_ELEMENTS) {
        return { outputElement: createErrorElement(`Max ${MAX_FIGURE_ELEMENTS} fig elements`), error: true };
      }
      
      // Add point to figure context
      figureContext.points[varName] = { x: point.x, y: point.y };
      figureContext.elements++;
      
      // Create SVG on first point if it doesn't exist
      if (!figureContext.svg) {
        figureContext.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        figureContext.svg.setAttribute("width", "200");
        figureContext.svg.setAttribute("height", "100");
        figureContext.svg.style.border = "1px solid #ccc";
      }
      
      // Add circle to SVG
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", point.x.toString());
      circle.setAttribute("cy", point.y.toString());
      circle.setAttribute("r", "2");
      circle.setAttribute("fill", "black");
      figureContext.svg.appendChild(circle);
      
      // Store the point value in runtime variables
      runtimeVars[varName] = point;
      
      // Return the SVG as output element
      return { outputElement: figureContext.svg, updatedFigureContext: figureContext };
    } else {
      // General variable assignment
      runtimeVars[varName] = value;
      return { updatedFigureContext: figureContext }; // No direct output for var assignment
    }
  } catch (e: any) {
    return { outputElement: createErrorElement(`Expression evaluation error: ${e.message}`), error: true };
  }
} 