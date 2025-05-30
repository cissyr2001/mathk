import { PREDEFINED_CONSTANTS } from "./augmented-script/constants.constant";
import { processLine } from "./augmented-script/script-processor.service";
import type { FigureContext, RenderAugmentedBlockParams, AugmentedScriptVars } from "./augmented-script/types";
import { appendOutputElement } from "./augmented-script/utils";

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
