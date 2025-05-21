export const TextBlockPresets = {
  html: {
    mode: "html" as const,
    start: "--- START HTML BLOCK",
    end: "--- CLOSE HTML BLOCK",
  },
  latex: {
    mode: "latex" as const,
    start: "--- START LATEX BLOCK",
    end: "--- CLOSE LATEX BLOCK",
  },
  plain: {
    mode: "plain" as const,
    start: "--- START PLAIN TEXT BLOCK",
    end: "--- CLOSE PLAIN TEXT BLOCK",
  },
  markdown: {
    mode: "markdown" as const,
    start: "--- START MARKDOWN BLOCK",
    end: "--- CLOSE MARKDOWN BLOCK",
  },
  augmented: {
    mode: "augmented" as const,
    start: "",
    end: "",
  },
};