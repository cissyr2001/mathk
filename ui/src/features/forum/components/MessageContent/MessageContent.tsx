// src/features/forum/components/MessageContent/MessageContent.tsx
import React, { useEffect, useRef } from "react";
import katex from "katex"; // Import KaTeX library
import "katex/dist/katex.min.css"; // Import KaTeX CSS
import { parseAndConvertMath } from "../../../../utils/mathUtils";
import type { EditorMode } from "../../types/forumTypes";

interface MessageContentProps {
  content: string;
  mode: EditorMode;
}

const MessageContent: React.FC<MessageContentProps> = ({ content, mode }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // Clear previous content
      contentRef.current.innerHTML = "";

      if (mode === "plain") {
        // Render as plain text, preserving line breaks
        // Using textContent to prevent XSS, then replacing line breaks
        const textContent = document.createTextNode(content);
        contentRef.current.appendChild(textContent);
        // Replace text node with HTML content that includes line breaks
        contentRef.current.innerHTML = contentRef.current.innerHTML.replace(
          /\n/g,
          "<br />"
        );
      } else if (mode === "latex") {
        // Render as raw LaTeX (assuming the whole content is LaTeX)
        try {
          katex.render(content, contentRef.current, {
            throwOnError: false, // Don't throw errors, just render them
            displayMode: true, // Render in display mode by default for blocks
          });
        } catch (error) {
          console.error("Error rendering LaTeX:", content, error);
          contentRef.current.innerHTML = `<span style="color: red;">Error rendering LaTeX: ${content}</span>`;
        }
      } else {
        // mode === 'embed' (default)
        // Parse for AsciiMath in backticks and render with KaTeX
        const segments = parseAndConvertMath(content);

        segments.forEach((segment) => {
          if (typeof segment === "string") {
            // Append text segment, preserving line breaks
            const textNode = document.createTextNode(segment);
            contentRef.current?.appendChild(textNode);
            // Replace text node with HTML content that includes line breaks
            contentRef.current!.innerHTML =
              contentRef.current!.innerHTML.replace(/\n/g, "<br />");
          } else {
            // Render LaTeX segment using KaTeX
            const mathSpan = document.createElement("span");
            // Use displayMode: false for inline math
            try {
              katex.render(segment.latex, mathSpan, {
                throwOnError: false,
                displayMode: false, // Inline math
              });
              contentRef.current?.appendChild(mathSpan);
            } catch (error) {
              console.error(
                "Error rendering LaTeX from AsciiMath:",
                segment.latex,
                error
              );
              const errorSpan = document.createElement("span");
              errorSpan.style.color = "red";
              errorSpan.innerText = `[Math Error: ${segment.latex}]`;
              contentRef.current?.appendChild(errorSpan);
            }
          }
        });
      }
    }
  }, [content, mode]); // Re-run effect if content or mode changes

  // Render the content inside a div
  return <div ref={contentRef} className="message-content"></div>;
};

export default MessageContent;
