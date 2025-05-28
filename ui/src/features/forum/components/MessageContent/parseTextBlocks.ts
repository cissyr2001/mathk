import type { EditorMode } from "../../types/forumTypes";
import { TextBlockPresets } from "./TextBlockPresets";

interface TextBlock {
  type: EditorMode;
  content: string;
}

const AUGMENTED_TYPE: EditorMode = TextBlockPresets.augmented.mode;

export const parseTextBlocks = (text: string): TextBlock[] => {
  const blocks: TextBlock[] = [];
  const lines = text.split('\n');
  let currentBlockType: EditorMode | null = null;
  let currentBlockContent: string[] = [];

  const presetStartTags = Object.values(TextBlockPresets).map(
    (preset) => preset.startTag
  );

  for (const line of lines) {
    const matchingPreset = Object.values(TextBlockPresets).find(
      (preset) => preset.startTag === line.trim()
    );

    if (matchingPreset) {
      // Found a start tag
      if (currentBlockContent.length > 0) {
        // Add the previous block
        blocks.push({
          type: currentBlockType || AUGMENTED_TYPE,
          content: currentBlockContent.join('\n').trim(),
        });
      }
      // Start a new block
      currentBlockType = matchingPreset.mode;
      currentBlockContent = [];
    } else {
      // Not a start tag, add line to current block
      if (currentBlockType === null && line.trim() !== "") {
        // Default to augmented if no block has started yet and line is not empty
        currentBlockType = AUGMENTED_TYPE;
      }
      currentBlockContent.push(line);
    }
  }

  // Add the last block if there's any content
  if (currentBlockContent.length > 0) {
    blocks.push({
      type: currentBlockType || AUGMENTED_TYPE,
      content: currentBlockContent.join('\n').trim(),
    });
  }

  // Filter out empty blocks that might have been created
  const finalBlocks = blocks.filter(block => block.content.length > 0);

  console.log('\nFinal parsed blocks:', finalBlocks);
  return finalBlocks;
};
