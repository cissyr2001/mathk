import asciimathToLatex from 'asciimath-to-latex';

/**
 * Parses a string for content wrapped in backticks (`) and converts
 * the content within backticks from AsciiMath to LaTeX.
 * The function returns an array of strings and objects, where strings
 * are regular text and objects contain LaTeX content.
 *
 * Example: "This is text `a + b` and more text `c - d`."
 * Result: ["This is text ", { latex: "a + b" }, " and more text ", { latex: "c - d" }, "."]
 *
 * @param text The input string potentially containing AsciiMath in backticks.
 * @returns An array of text segments and LaTeX objects.
 */
export const parseAndConvertMath = (text: string): (string | { latex: string })[] => {
  const result: (string | { latex: string })[] = [];
  const regex = /`(.*?)`/g; // Regex to find content within backticks (non-greedy)
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const mathContent = match[1].trim(); // Content inside backticks

    // Add the text before the current match
    if (match.index > lastIndex) {
      result.push(text.substring(lastIndex, match.index));
    }

    // Convert AsciiMath to LaTeX
    try {
      const latex = asciimathToLatex(mathContent);
      result.push({ latex: latex });
    } catch (error) {
      console.error('Error converting AsciiMath to LaTeX:', mathContent, error);
      // If conversion fails, push the original content as text or a placeholder
      result.push(`\`${mathContent}\` (Conversion Error)`);
    }


    lastIndex = regex.lastIndex;
  }

  // Add any remaining text after the last match
  if (lastIndex < text.length) {
    result.push(text.substring(lastIndex));
  }

  return result;
};

// You might add other math-related utilities here later
// export const renderLaTeX = (latex: string) => { ... } // Function to call KaTeX render