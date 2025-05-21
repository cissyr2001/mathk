import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import React, { useRef, useState } from "react";
import MessageContent from "../MessageContent/MessageContent";
import { TextBlockPresets } from "../MessageContent/TextBlockPresets";

type EditorMode = "plain" | "latex" | "html" | "markdown" | "augmented";

interface TextEditorProps {
  value: string;
  onChange: (value: string, mode: EditorMode) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const [mode, setMode] = useState<EditorMode>(TextBlockPresets.augmented.mode);
  const [showModal, setShowModal] = useState(false);
  const [previewContent, setPreviewContent] = useState(value);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
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
        text: `${preset.start}\n${preset.end}`,
        forceMoveMarkers: true,
      };
      editor.executeEdits("insert-block", [operation]);

      // Move cursor to middle of wrapper
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
      const newValue = `${value}${preset.start}\n${preset.end}`;
      onChange(newValue, selectedMode);
    }
  };

  const lineCount = value.split("\n").length;
  const showLineNumbers = lineCount > 50;

  return (
    <div className="mb-4">
      <button
        className="mb-2 btn btn-default btn-sm"
        onClick={() => setShowModal(true)}
      >
        Add Text Block
      </button>

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
