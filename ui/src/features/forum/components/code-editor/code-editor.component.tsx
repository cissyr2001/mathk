import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import React, { useRef } from "react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: string;
  language?: string;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  value, 
  onChange, 
  height = "200px", 
  language = "plaintext",
  readOnly = false 
}) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleTextChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      onChange(newValue);
    }
  };

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor
  ) => {
    editorRef.current = editor;
  };

  return (
    <Editor
      height={height}
      defaultLanguage={language}
      value={value}
      onChange={handleTextChange}
      onMount={handleEditorDidMount}
      options={{
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        lineNumbers: "on",
        roundedSelection: false,
        contextmenu: false,
        padding: { top: 8, bottom: 8 },
        wordWrap: "on",
        readOnly: readOnly,
        theme: "vs-light",
      }}
      className="border border-[color:var(--color-border)] rounded-[var(--border-radius-md)]"
    />
  );
};

export default CodeEditor; 