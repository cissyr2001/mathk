import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

type EditorMode = 'embed' | 'plain' | 'latex' | 'html' | 'markdown';

interface TextEditorProps {
  value: string;
  onChange: (value: string, mode: EditorMode) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const [mode, setMode] = useState<EditorMode>('embed');
  const [showModal, setShowModal] = useState(false);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleTextChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      onChange(newValue, mode);
    }
  };

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  const handleAddTextBlock = (selectedMode: EditorMode) => {
    setShowModal(false);
    let wrapperStart = '';
    let wrapperEnd = '';
    let newMode: EditorMode = mode;

    switch (selectedMode) {
      case 'html':
        wrapperStart = '--- START HTML BLOCK\n';
        wrapperEnd = '\n--- CLOSE HTML BLOCK';
        newMode = 'html';
        break;
      case 'latex':
        wrapperStart = '--- START LATEX BLOCK\n';
        wrapperEnd = '\n--- CLOSE LATEX BLOCK';
        newMode = 'latex';
        break;
      case 'plain':
        wrapperStart = '--- START PLAIN TEXT BLOCK\n';
        wrapperEnd = '\n--- CLOSE PLAIN TEXT BLOCK';
        newMode = 'plain';
        break;
      case 'markdown':
        wrapperStart = '--- START MARKDOWN BLOCK\n';
        wrapperEnd = '\n--- CLOSE MARKDOWN BLOCK';
        newMode = 'markdown';
        break;
    }

    setMode(newMode);

    if (editorRef.current) {
      const editor = editorRef.current;
      const position = editor.getPosition() || { lineNumber: 1, column: 1 };
      const range = new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column);
      const operation = {
        range,
        text: `${wrapperStart}${wrapperEnd}`,
        forceMoveMarkers: true,
      };
      editor.executeEdits('insert-block', [operation]);

      // Move cursor to middle of wrapper
      const newPosition = {
        lineNumber: position.lineNumber + 1,
        column: 1,
      };
      editor.setPosition(newPosition);
      editor.focus();

      // Update value for onChange
      const newValue = editor.getValue();
      onChange(newValue, newMode);
    } else {
      // Fallback if editor not mounted
      const newValue = `${value}${wrapperStart}${wrapperEnd}`;
      onChange(newValue, newMode);
    }
  };

  const lineCount = value.split('\n').length;
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
            <h3 className="text-lg font-semibold mb-[var(--spacing-md)]">Choose Text Block</h3>
            <div className="flex flex-col gap-[var(--spacing-sm)]">
              <button
                className="btn btn-default w-full"
                onClick={() => handleAddTextBlock('html')}
              >
                HTML
              </button>
              <button
                className="btn btn-default w-full"
                onClick={() => handleAddTextBlock('latex')}
              >
                LaTeX
              </button>
              <button
                className="btn btn-default w-full"
                onClick={() => handleAddTextBlock('plain')}
              >
                Plain Text
              </button>
              <button
                className="btn btn-default w-full"
                onClick={() => handleAddTextBlock('markdown')}
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

      <Editor
        height="200px"
        defaultLanguage={mode === 'latex' ? 'latex' : mode === 'html' ? 'html' : mode === 'markdown' ? 'markdown' : 'plaintext'}
        value={value}
        onChange={handleTextChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineNumbers: showLineNumbers ? 'on' : 'off',
          roundedSelection: false,
          contextmenu: false,
          padding: { top: 8, bottom: 8 },
        }}
        className="mt-1 block w-full"
      />
    </div>
  );
};

export default TextEditor;