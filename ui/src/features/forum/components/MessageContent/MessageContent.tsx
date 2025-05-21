import React, { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import { parseAndConvertMath } from "../../../../utils/mathUtils";
import type { EditorMode } from "../../types/forumTypes";

interface MessageContentProps {
  content: string;
  mode: EditorMode;
}

interface TextBlock {
  type: EditorMode;
  content: string;
}

const MessageContent: React.FC<MessageContentProps> = ({ content, mode }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Function to parse content into text blocks
  const parseTextBlocks = (text: string): TextBlock[] => {
    const blocks: TextBlock[] = [];
    const blockPatterns = [
      {
        type: "html" as EditorMode,
        start: "--- START HTML BLOCK",
        end: "--- CLOSE HTML BLOCK",
      },
      {
        type: "latex" as EditorMode,
        start: "--- START LATEX BLOCK",
        end: "--- CLOSE LATEX BLOCK",
      },
      {
        type: "plain" as EditorMode,
        start: "--- START PLAIN TEXT BLOCK",
        end: "--- CLOSE PLAIN TEXT BLOCK",
      },
      {
        type: "markdown" as EditorMode,
        start: "--- START MARKDOWN BLOCK",
        end: "--- CLOSE MARKDOWN BLOCK",
      },
    ];

    let remainingText = text;
    let lastIndex = 0;

    while (remainingText.length > 0) {
      let foundBlock = false;
      let earliestStart = remainingText.length;
      let matchedPattern = null;

      // Find the earliest block start
      for (const pattern of blockPatterns) {
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
          blocks.push({
            type: matchedPattern.type,
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

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = "";

      if (mode === "plain") {
        const textContent = document.createTextNode(content);
        contentRef.current.appendChild(textContent);
        contentRef.current.innerHTML = contentRef.current.innerHTML.replace(
          /\n/g,
          "<br />"
        );
      } else if (mode === "latex") {
        try {
          katex.render(content, contentRef.current, {
            throwOnError: false,
            displayMode: true,
          });
        } catch (error) {
          console.error("Error rendering LaTeX:", content, error);
          contentRef.current.innerHTML = `<span style="color: red;">Error rendering LaTeX: ${content}</span>`;
        }
      } else {
        // Parse into text blocks
        const blocks = parseTextBlocks(content);

        blocks.forEach((block) => {
          const blockDiv = document.createElement("div");
          blockDiv.className = `text-block text-block-${block.type}`;

          switch (block.type) {
            case "html":
              // Render HTML content (be cautious with raw HTML to prevent XSS)
              blockDiv.innerHTML = block.content;
              break;
            case "latex":
              try {
                katex.render(block.content, blockDiv, {
                  throwOnError: false,
                  displayMode: true,
                });
              } catch (error) {
                console.error(
                  "Error rendering LaTeX block:",
                  block.content,
                  error
                );
                blockDiv.innerHTML = `<span style="color: red;">Error rendering LaTeX: ${block.content}</span>`;
              }
              break;
            case "plain":
            case "augmented":
              blockDiv.appendChild(document.createTextNode(block.content));
              blockDiv.innerHTML = blockDiv.innerHTML.replace(/\n/g, "<br />");
              break;
            case "markdown":
              blockDiv.appendChild(document.createTextNode(block.content));
              blockDiv.innerHTML = blockDiv.innerHTML.replace(/\n/g, "<br />");
              break;
            case "embed":
              parseAndConvertMath(block.content).forEach((segment) => {
                if (typeof segment === "string") {
                  const textNode = document.createTextNode(segment);
                  blockDiv.appendChild(textNode);
                  blockDiv.innerHTML = blockDiv.innerHTML.replace(
                    /\n/g,
                    "<br />"
                  );
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
              break;
          }
          contentRef.current?.appendChild(blockDiv);
        });
      }
    }
  }, [content, mode]);

  return <div ref={contentRef} className="message-content"></div>;
};

export default MessageContent;
