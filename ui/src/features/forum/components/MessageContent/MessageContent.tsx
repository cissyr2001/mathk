import React, { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import type { EditorMode } from "../../types/forumTypes";
import useAuthStore from "../../../auth/hooks/useAuthStore";
import { parseTextBlocks } from "./parseTextBlocks";
import { renderAugmentedBlock } from "./renderAugmentedBlock";

interface MessageContentProps {
  content: string;
  mode: EditorMode;
}
const MessageContent: React.FC<MessageContentProps> = ({ content, mode }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();

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
              blockDiv.appendChild(document.createTextNode(block.content));
              blockDiv.innerHTML = blockDiv.innerHTML.replace(/\n/g, "<br />");
              break;
            case "markdown":
              blockDiv.appendChild(document.createTextNode(block.content));
              blockDiv.innerHTML = blockDiv.innerHTML.replace(/\n/g, "<br />");
              break;
            case "embed":
            case "augmented":
              blockDiv.appendChild(
                renderAugmentedBlock({
                  content: block.content,
                  currentUser: user,
                })
              );
              break;
          }
          contentRef.current?.appendChild(blockDiv);
        });
      }
    }
  }, [content, mode, user]);

  return <div ref={contentRef} className="message-content"></div>;
};

export default MessageContent;
