import { PREDEFINED_CONSTANTS } from "./augmentedScript/constants";
import { processLine } from "./augmentedScript/scriptProcessor";
import type { FigureContext, RenderAugmentedBlockParams, AugmentedScriptVars } from "./augmentedScript/types";
import { appendOutputElement } from "./augmentedScript/utils";

export const renderAugmentedBlock = (
  params: RenderAugmentedBlockParams
): HTMLDivElement => {
  const mainBlockDiv = document.createElement("div");
  mainBlockDiv.className = "text-block text-block-augmented";

  const lines = params.content.split('\n');
  const runtimeVars: AugmentedScriptVars = { ...PREDEFINED_CONSTANTS };
  let figureContext: FigureContext | null = null;

  for (const line of lines) {
    const result = processLine(line, runtimeVars, figureContext);

    if (result.outputElement) {
      appendOutputElement(mainBlockDiv, result.outputElement, figureContext);
    }

    if (result.updatedFigureContext !== undefined) {
      figureContext = result.updatedFigureContext;
    }
  }

  return mainBlockDiv;
};
