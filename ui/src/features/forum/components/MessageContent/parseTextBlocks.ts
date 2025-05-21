import type { EditorMode } from "../../types/forumTypes";
import { TextBlockPresets } from "./TextBlockPresets";

interface TextBlock {
  type: EditorMode;
  content: string;
}

export const parseTextBlocks = (text: string): TextBlock[] => {
  const blocks: TextBlock[] = [];
  let remainingText = text;
  let lastIndex = 0;

  while (remainingText.length > 0) {
    let foundBlock = false;
    let earliestStart = remainingText.length;
    let matchedPattern = null;

    // Find the earliest block start
    for (const pattern of Object.values(TextBlockPresets)) {
      const startIndex = remainingText.indexOf(pattern.start);
      if (startIndex !== -1 && startIndex < earliestStart) {
        earliestStart = startIndex;
        matchedPattern = pattern;
      }
    }

    if (matchedPattern && earliestStart !== remainingText.length) {
      // Add text before the block as Augmented Script
      if (earliestStart > 0) {
        blocks.push({
          type: "augmented",
          content: remainingText.substring(0, earliestStart),
        });
      }

      // Find the end of the block
      const startLength = matchedPattern.start.length;
      const endIndex = remainingText.indexOf(
        matchedPattern.end,
        earliestStart + startLength
      );

      if (endIndex !== -1) {
        const blockContent = remainingText.substring(
          earliestStart + startLength,
          endIndex
        );
        const blockType = Object.keys(TextBlockPresets).find(
          (key) => TextBlockPresets[key].start === matchedPattern.start
        ) as EditorMode;
        blocks.push({
          type: blockType,
          content: blockContent.trim(),
        });
        remainingText = remainingText.substring(
          endIndex + matchedPattern.end.length
        );
        lastIndex = 0;
      } else {
        // No end tag found, treat the rest as Augmented Script
        blocks.push({
          type: "augmented",
          content: remainingText,
        });
        remainingText = "";
      }
      foundBlock = true;
    } else {
      // No more blocks found, treat the rest as Augmented Script
      blocks.push({
        type: "augmented",
        content: remainingText,
      });
      remainingText = "";
    }
  }

  return blocks;
};
