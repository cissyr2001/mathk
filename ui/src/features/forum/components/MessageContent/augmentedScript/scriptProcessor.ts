import type { AugmentedScriptVars, FigureContext, ScriptLineResult } from "./types";
import { handleVariableAssignment } from "./handlers/variableAssignmentHandler";
import { handleFunctionCall } from "./handlers/functionCallHandler";
import { handlePlainText } from "./handlers/plainTextHandler";
import { createErrorElement, validateRuntimeVars } from "./utils";

export function processLine(
  line: string,
  runtimeVars: AugmentedScriptVars,
  currentFigureContext: FigureContext | null
): ScriptLineResult {
  const trimmedLine = line.trim();
  if (!trimmedLine) return {}; // Skip empty lines

  try {
    let result: ScriptLineResult;
    
    // Always treat lines starting with # as plain text
    if (trimmedLine.startsWith("#")) {
      result = handlePlainText(trimmedLine, runtimeVars, currentFigureContext);
    } else if (trimmedLine.startsWith("@")) {
      result = handleVariableAssignment(trimmedLine, runtimeVars, currentFigureContext);
    } else {
      // Function calls or plain text. handleFunctionCall will delegate to plainText if not a func.
      result = handleFunctionCall(trimmedLine, runtimeVars, currentFigureContext, handlePlainText);
    }

    // Validate runtime variables after each line execution
    validateRuntimeVars(runtimeVars);
    
    return result;
  } catch (e: any) {
    console.error("Error processing line:", trimmedLine, e);
    return {
      outputElement: createErrorElement(`Process error: "${trimmedLine}". ${e.message}`),
      error: true,
    };
  }
} 