import React, { useState } from 'react';

type EditorMode = 'embed' | 'plain' | 'latex';

interface TextEditorProps {
  // Add props for initial value, onChange, etc. later
  value: string;
  onChange: (value: string, mode: EditorMode) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  // Local state for mode, could potentially use a Zustand store for more complex state
  const [mode, setMode] = useState<EditorMode>('embed'); // Default mode

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value as EditorMode);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value, mode);
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="editorMode" className="block text-sm font-medium text-gray-700">
          Text Mode:
        </label>
        <select
          id="editorMode"
          name="editorMode"
          value={mode}
          onChange={handleModeChange}
          className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="embed">Embed Mode (AsciiMath in \` \`)</option>
          <option value="plain">Plain Text Mode</option>
          <option value="latex">LaTeX Mode</option>
        </select>
      </div>
      <textarea
        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
        rows={6}
        value={value}
        onChange={handleTextChange}
        placeholder={`Enter your text in ${mode} mode...`}
      ></textarea>
      {/* Placeholder for preview later */}
      {/* <div>Preview: ...</div> */}
    </div>
  );
};

export default TextEditor;