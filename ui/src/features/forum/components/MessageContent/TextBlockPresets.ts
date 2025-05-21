export const TextBlockPresets: { [key: string]: { start: string; end: string } } = {
  html: {
    start: "--- START HTML BLOCK",
    end: "--- CLOSE HTML BLOCK",
  },
  latex: {
    start: "--- START LATEX BLOCK",
    end: "--- CLOSE LATEX BLOCK",
  },
  plain: {
    start: "--- START PLAIN TEXT BLOCK",
    end: "--- CLOSE PLAIN TEXT BLOCK",
  },
  markdown: {
    start: "--- START MARKDOWN BLOCK",
    end: "--- CLOSE MARKDOWN BLOCK",
  },
};