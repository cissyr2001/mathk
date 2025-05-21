import katex from "katex";
import { parseAndConvertMath } from "../../../../utils/mathUtils";
import type { IForumThread, IReply, IUser } from "../../types/forumTypes";

interface RenderAugmentedBlockParams {
  content: string;
  item?: IForumThread | IReply;
  currentUser?: IUser | null;
}

export const renderAugmentedBlock = (
  params: RenderAugmentedBlockParams
): HTMLDivElement => {
  const blockDiv = document.createElement("div");
  blockDiv.className = "text-block text-block-augmented";

  parseAndConvertMath(params.content).forEach((segment) => {
    if (typeof segment === "string") {
      const textNode = document.createTextNode(segment);
      blockDiv.appendChild(textNode);
      blockDiv.innerHTML = blockDiv.innerHTML.replace(/\n/g, "<br />");
    } else {
      const mathSpan = document.createElement("span");
      try {
        katex.render(segment.latex, mathSpan, {
          throwOnError: false,
          displayMode: false,
        });
        blockDiv.appendChild(mathSpan);
      } catch (error) {
        console.error(
          "Error rendering LaTeX from AsciiMath:",
          segment.latex,
          error
        );
        const errorSpan = document.createElement("span");
        errorSpan.style.color = "red";
        errorSpan.innerText = `[Math Error: ${segment.latex}]`;
        blockDiv.appendChild(errorSpan);
      }
    }
  });

  return blockDiv;
};
