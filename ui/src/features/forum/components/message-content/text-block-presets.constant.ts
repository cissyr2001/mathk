export interface TextBlockPreset {
  mode: "html" | "latex" | "plain" | "markdown" | "augmented";
  startTag: string;
}

export const TextBlockPresets: Record<string, TextBlockPreset> = {
  html: {
    mode: "html" as const,
    startTag: "--- HTML",
  },
  latex: {
    mode: "latex" as const,
    startTag: "--- LATEX",
  },
  plain: {
    mode: "plain" as const,
    startTag: "--- PLAIN TEXT",
  },
  markdown: {
    mode: "markdown" as const,
    startTag: "--- MARKDOWN",
  },
  augmented: {
    mode: "augmented" as const,
    startTag: "--- AS",
  },
};