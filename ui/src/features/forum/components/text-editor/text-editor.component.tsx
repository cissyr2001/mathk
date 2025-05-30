import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import React, { useRef, useState } from "react";
import MessageContent from "../message-content/message-content.component";
import { TextBlockPresets } from "../message-content/text-block-presets.constant";
import { MathfieldElement } from "mathlive";

type EditorMode = "plain" | "latex" | "html" | "markdown" | "augmented";

interface TextEditorProps {
  value: string;
  onChange: (value: string, mode: EditorMode) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const [mode, setMode] = useState<EditorMode>(TextBlockPresets.augmented.mode);
  const [showModal, setShowModal] = useState(false);
  const [showMathModal, setShowMathModal] = useState(false);
  const [previewContent, setPreviewContent] = useState(value);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const mathfieldRef = useRef<MathfieldElement | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleTextChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      onChange(newValue, mode);
      // Debounce the preview update
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        setPreviewContent(newValue);
      }, 200);
    }
  };

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor
  ) => {
    editorRef.current = editor;
  };

  const handleAddTextBlock = (selectedMode: EditorMode) => {
    setShowModal(false);
    const preset = Object.values(TextBlockPresets).find(
      (p) => p.mode === selectedMode
    );
    if (!preset) return;

    setMode(selectedMode);

    if (editorRef.current) {
      const editor = editorRef.current;
      const position = editor.getPosition() || { lineNumber: 1, column: 1 };
      const range = new monaco.Range(
        position.lineNumber,
        position.column,
        position.lineNumber,
        position.column
      );
      const operation = {
        range,
        text: `${preset.startTag}\n`,
        forceMoveMarkers: true,
      };
      editor.executeEdits("insert-block", [operation]);

      // Move cursor to next line after the start tag
      const newPosition = {
        lineNumber: position.lineNumber + 1,
        column: 1,
      };
      editor.setPosition(newPosition);
      editor.focus();

      // Update value for onChange
      const newValue = editor.getValue();
      onChange(newValue, selectedMode);
    } else {
      // Fallback if editor not mounted
      const newValue = `${value}${preset.startTag}\n`;
      onChange(newValue, selectedMode);
    }
  };

  const handleAddMathExpression = () => {
    if (mathfieldRef.current) {
      const latex = mathfieldRef.current.getValue('latex');
      const asciimath = mathfieldRef.current.getValue('ascii-math');

      // If the expression can be represented in AsciiMath, use it
      if (asciimath && asciimath.trim() !== '') {
        const newValue = editorRef.current?.getValue() || '';
        const position = editorRef.current?.getPosition() || { lineNumber: 1, column: 1 };
        const operation = {
          range: new monaco.Range(
            position.lineNumber,
            position.column,
            position.lineNumber,
            position.column
          ),
          text: `\`${asciimath}\` `,
          forceMoveMarkers: true,
        };
        editorRef.current?.executeEdits('insert-math', [operation]);
      } else {
        // If it's too complex for AsciiMath, use LaTeX block
        handleAddTextBlock(TextBlockPresets.latex.mode);
        const newValue = editorRef.current?.getValue() || '';
        const position = editorRef.current?.getPosition() || { lineNumber: 1, column: 1 };
        const operation = {
          range: new monaco.Range(
            position.lineNumber,
            position.column,
            position.lineNumber,
            position.column
          ),
          text: latex,
          forceMoveMarkers: true,
        };
        editorRef.current?.executeEdits('insert-math', [operation]);
      }
    }
    setShowMathModal(false);
  };

  React.useEffect(() => {
    // Initialize MathLive field when math modal is shown
    if (showMathModal && !mathfieldRef.current) {
      const mathfield = new MathfieldElement();
      mathfield.style.width = '100%';
      mathfield.style.minHeight = '100px';
      mathfield.style.border = '1px solid var(--color-border)';
      mathfield.style.borderRadius = 'var(--border-radius-sm)';
      mathfield.style.padding = 'var(--spacing-sm)';
      mathfield.style.marginBottom = 'var(--spacing-md)';
      mathfieldRef.current = mathfield;
      document.getElementById('math-editor-container')?.appendChild(mathfield);
    }
  }, [showMathModal]);

  const lineCount = value.split("\n").length;
  const showLineNumbers = lineCount > 50;

  return (
    <div className="mb-4">
      <div className="flex gap-2 mb-2">
        <button
          className="btn btn-default btn-sm"
          onClick={() => setShowModal(true)}
        >
          Add Text Block
        </button>
        <button
          className="btn btn-default btn-sm"
          onClick={() => setShowMathModal(true)}
        >
          Add Math Expression
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[color:var(--color-surface)] rounded-[var(--border-radius-md)] p-[var(--spacing-md)] shadow-md border border-[color:var(--color-border)] max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-[var(--spacing-md)]">
              Choose Text Block
            </h3>
            <div className="flex flex-col gap-[var(--spacing-sm)]">
              <button
                className="btn btn-default w-full"
                onClick={() => handleAddTextBlock(TextBlockPresets.html.mode)}
              >
                HTML
              </button>
              <button
                className="btn btn-default w-full"
                onClick={() => handleAddTextBlock(TextBlockPresets.latex.mode)}
              >
                LaTeX
              </button>
              <button
                className="btn btn-default w-full"
                onClick={() => handleAddTextBlock(TextBlockPresets.plain.mode)}
              >
                Plain Text
              </button>
              <button
                className="btn btn-default w-full"
                onClick={() =>
                  handleAddTextBlock(TextBlockPresets.markdown.mode)
                }
              >
                Markdown
              </button>
              <button
                className="btn btn-default w-full mt-[var(--spacing-sm)]"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showMathModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[color:var(--color-surface)] rounded-[var(--border-radius-md)] p-[var(--spacing-md)] shadow-md border border-[color:var(--color-border)] max-w-lg w-full">
            <h3 className="text-lg font-semibold mb-[var(--spacing-md)]">
              Math Expression Editor
            </h3>
            <div id="math-editor-container" className="mb-[var(--spacing-md)]"></div>
            <div className="flex justify-end gap-[var(--spacing-sm)]">
              <button
                className="btn btn-default"
                onClick={() => setShowMathModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleAddMathExpression}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-row gap-[var(--spacing-md)]">
        <div className="w-1/2">
          <Editor
            height="100%"
            defaultLanguage={
              mode === TextBlockPresets.latex.mode
                ? "latex"
                : mode === TextBlockPresets.html.mode
                  ? "html"
                  : mode === TextBlockPresets.markdown.mode
                    ? "markdown"
                    : "plaintext"
            }
            value={value}
            onChange={handleTextChange}
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontSize: 14,
              lineNumbers: showLineNumbers ? "on" : "off",
              roundedSelection: false,
              contextmenu: false,
              padding: { top: 8, bottom: 8 },
              wordWrap: "on",
            }}
            className="mt-1 block w-full h-full"
          />
        </div>
        <div className="w-1/2 min-h-[200px] max-h-[75vh] bg-[color:var(--color-surface)] rounded-[var(--border-radius-md)] p-[var(--spacing-md)] border border-[color:var(--color-border)] overflow-auto">
          {previewContent.trim() ? (
            <MessageContent content={previewContent} mode={mode} />
          ) : (
            <p className="text-[color:var(--color-text-secondary)] italic">
              Type something to preview result here
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
