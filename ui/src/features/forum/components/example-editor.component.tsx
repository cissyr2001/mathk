import React, { useEffect, useState } from "react";
import TextEditor from "./text-editor/text-editor.component";
import type { EditorMode } from "../types/forum-types.type";

interface ExampleEditorProps {
    code: string;
}

const ExampleEditor: React.FC<ExampleEditorProps> = ({ code }) => {
    const [editorValue, setEditorValue] = useState(code);
    const [mode] = useState<EditorMode>("augmented");

    useEffect(() => {
        setEditorValue(code);
    }, [code]);

    const handleTextChange = (value: string, newMode: EditorMode) => {
        setEditorValue(value);
    };

    const key = `editor-${code}`;

    return (
        <div className="w-full">
            <TextEditor
                key={key}
                value={editorValue}
                onChange={handleTextChange}
                showButtons={false}
            />
        </div>
    );
};

export default ExampleEditor; 