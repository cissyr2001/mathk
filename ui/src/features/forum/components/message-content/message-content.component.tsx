import React, { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom/client';
import katex from "katex";
import "katex/dist/katex.min.css";
import "./message-content.css";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import type { EditorMode } from "../../types/forum-types.type";
import useAuthStore from "../../../auth/hooks/use-auth-store.hook";
import { parseTextBlocks } from "./parse-text-blocks.util";
import { renderAugmentedBlock } from "./render-augmented-block.util";
import { TextBlockPresets } from "./text-block-presets.constant";
import { PREDEFINED_CONSTANTS } from "./augmented-script/constants.constant";
import { interpolateString } from "./augmented-script/string-utils";
import { interpolateStringEnhanced, interpolateStringSimple } from "./augmented-script/enhanced-string-utils.util";

interface MessageContentProps {
  content: string;
  mode: EditorMode;
  showSourceButton?: boolean;
}

const MessageContent: React.FC<MessageContentProps> = ({ content, mode, showSourceButton = false }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();
  const [showSource, setShowSource] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = "";

      if (!content.trim()) {
        contentRef.current.innerHTML =
          '<p class="text-[color:var(--color-text-secondary)] italic">Type something to preview result here</p>';
        return;
      }

      if (showSource) {
        const pre = document.createElement('pre');
        pre.className = 'text-[color:var(--color-text-secondary)] text-sm p-4 bg-[color:var(--color-bg-secondary)] rounded';
        pre.textContent = content;
        contentRef.current.appendChild(pre);
        return;
      }

      const runtimeVars = { ...PREDEFINED_CONSTANTS };

      if (mode === TextBlockPresets.plain.mode) {
        const interpolationResult = interpolateStringEnhanced(content, runtimeVars);
        if (interpolationResult.hasNumericValues) {
          // Use enhanced interpolation with React components
          contentRef.current.appendChild(interpolationResult.fragment);
        } else {
          // Use simple interpolation
          const interpolated = interpolateStringSimple(content, runtimeVars);
          const textContent = document.createTextNode(interpolated);
          contentRef.current.appendChild(textContent);
        }
        contentRef.current.innerHTML = contentRef.current.innerHTML.replace(
          /\n/g,
          "<br />"
        );
      } else if (mode === TextBlockPresets.latex.mode) {
        const interpolated = interpolateString(content, runtimeVars);
        try {
          katex.render(interpolated, contentRef.current, {
            throwOnError: false,
            displayMode: true,
          });
        } catch (error) {
          console.error("Error rendering LaTeX:", interpolated, error);
          contentRef.current.innerHTML = `<span style="color: red;">Error rendering LaTeX: ${interpolated}</span>`;
        }
      } else {
        // Parse into text blocks
        const blocks = parseTextBlocks(content);

        blocks.forEach((block) => {
          const blockDiv = document.createElement("div");
          blockDiv.className = `text-block text-block-${block.type}`;

          switch (block.type) {
            case TextBlockPresets.html.mode:
              // For HTML blocks, use enhanced interpolation
              const htmlInterpolationResult = interpolateStringEnhanced(block.content, runtimeVars);
              if (htmlInterpolationResult.hasNumericValues) {
                blockDiv.appendChild(htmlInterpolationResult.fragment);
              } else {
                const interpolatedHtml = interpolateStringSimple(block.content, runtimeVars);
                blockDiv.innerHTML = interpolatedHtml;
              }
              break;
            case TextBlockPresets.latex.mode:
              const interpolated = interpolateString(block.content, runtimeVars);
              try {
                katex.render(interpolated, blockDiv, {
                  throwOnError: false,
                  displayMode: true,
                });
              } catch (error) {
                console.error(
                  "Error rendering LaTeX block:",
                  interpolated,
                  error
                );
                blockDiv.innerHTML = `<span style="color: red;">Error rendering LaTeX: ${interpolated}</span>`;
              }
              break;
            case TextBlockPresets.plain.mode:
              const plainInterpolationResult = interpolateStringEnhanced(block.content, runtimeVars);
              if (plainInterpolationResult.hasNumericValues) {
                blockDiv.appendChild(plainInterpolationResult.fragment);
              } else {
                const interpolatedPlain = interpolateStringSimple(block.content, runtimeVars);
                blockDiv.appendChild(document.createTextNode(interpolatedPlain));
              }
              blockDiv.innerHTML = blockDiv.innerHTML.replace(/\n/g, "<br />");
              break;
            case TextBlockPresets.markdown.mode:
              const markdownInterpolationResult = interpolateStringEnhanced(block.content, runtimeVars);
              if (markdownInterpolationResult.hasNumericValues) {
                // For markdown with numeric values, we need to handle this specially
                // Create a temporary container to get the interpolated content as HTML
                const tempDiv = document.createElement('div');
                tempDiv.appendChild(markdownInterpolationResult.fragment);
                const interpolatedMarkdown = tempDiv.innerHTML;
                
                const MarkdownContent = () => (
                  <ReactMarkdown
                    remarkPlugins={[remarkMath, remarkGfm]}
                    rehypePlugins={[rehypeKatex, rehypeRaw]}
                  >
                    {interpolatedMarkdown}
                  </ReactMarkdown>
                );
                const markdownElement = document.createElement('div');
                const root = ReactDOM.createRoot(markdownElement);
                root.render(<MarkdownContent />);
                blockDiv.appendChild(markdownElement);
              } else {
                const interpolatedMarkdown = interpolateStringSimple(block.content, runtimeVars);
                const MarkdownContent = () => (
                  <ReactMarkdown
                    remarkPlugins={[remarkMath, remarkGfm]}
                    rehypePlugins={[rehypeKatex, rehypeRaw]}
                  >
                    {interpolatedMarkdown}
                  </ReactMarkdown>
                );
                const markdownElement = document.createElement('div');
                const root = ReactDOM.createRoot(markdownElement);
                root.render(<MarkdownContent />);
                blockDiv.appendChild(markdownElement);
              }
              break;
            case TextBlockPresets.augmented.mode:
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
  }, [content, mode, user, showSource]);

  return (
    <div className="relative">
      <div ref={contentRef} className="message-content"></div>
      {showSourceButton && (
        <button
          onClick={() => setShowSource(!showSource)}
          className="absolute bottom-2 right-2 text-[color:var(--color-text-secondary)] text-sm hover:text-[color:var(--color-text-primary)] transition-colors"
        >
          {showSource ? 'Show Rendered' : 'Show Source'}
        </button>
      )}
    </div>
  );
};

export default MessageContent;
