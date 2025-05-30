import React, { useState, useEffect } from "react";
import type { BuiltInFunctionSpec } from "../components/message-content/augmented-script/types";
import CodeEditor from "../components/code-editor/code-editor.component";
import type { EditorMode } from "../types/forum-types.type";
import MessageContent from "../components/message-content/message-content.component";
import { BUILT_IN_FUNCTION_SPECS } from "../components/message-content/augmented-script/built-in-functions";

const DocumentationPage: React.FC = () => {
    const [selectedFunction, setSelectedFunction] = useState<BuiltInFunctionSpec | null>(
        BUILT_IN_FUNCTION_SPECS[0] || null
    );

    const categoryOrder = ["Math Functions", "Geometry Functions", "Content Embedding Functions"];

    const categorizeFunction = (funcSpec: BuiltInFunctionSpec): string => {
        if (["sin", "cos", "sqrt"].includes(funcSpec.name)) {
            return "Math Functions";
        }
        if (["point", "create_figure"].includes(funcSpec.name)) {
            return "Geometry Functions";
        }
        return "Content Embedding Functions";
    };

    const categorizedFunctions = categoryOrder.reduce((acc, category) => {
        acc[category] = BUILT_IN_FUNCTION_SPECS.filter(spec => categorizeFunction(spec) === category);
        return acc;
    }, {} as Record<string, BuiltInFunctionSpec[]>);

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="flex flex-row">
                <div className="flex-1 overflow-y-auto">
                    <h2 className="text-xl font-bold text-[color:var(--color-text-primary)]">
                        Augmented Script Functions
                    </h2>
                    <div className=" p-[var(--spacing-md)]">
                        {categoryOrder.map((category) => (
                            <div key={category} className="mb-[var(--spacing-lg)]">
                                <h3 className="text-sm font-semibold text-[color:var(--color-text-secondary)] uppercase tracking-wide mb-[var(--spacing-sm)]">
                                    {category}
                                </h3>
                                <div className="space-y-1">
                                    {categorizedFunctions[category].map((funcSpec) => (
                                        <button
                                            key={funcSpec.name}
                                            onClick={() => setSelectedFunction(funcSpec)}
                                            className={`w-full text-left px-[var(--spacing-sm)] py-[var(--spacing-xs)] rounded-[var(--border-radius-sm)] text-sm transition-colors ${selectedFunction?.name === funcSpec.name
                                                ? "bg-[color:var(--color-primary)] text-white"
                                                : "text-[color:var(--color-text-primary)] hover:bg-[color:var(--color-gray-light)]"
                                                }`}
                                        >
                                            <code className="font-mono">{funcSpec.name}()</code>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-3 overflow-y-auto">
                    <div className="flex-1 ">
                        <div className="p-[var(--spacing-md)]">
                            {selectedFunction ? (
                                <div>
                                    {/* Function Header */}
                                    <div className="mb-[var(--spacing-lg)]">
                                        <h1 className="text-3xl font-bold mb-[var(--spacing-sm)] text-[color:var(--color-text-primary)]">
                                            <code className="font-mono bg-[color:var(--color-gray-light)] px-[var(--spacing-sm)] py-[var(--spacing-xs)] rounded-[var(--border-radius-sm)]">
                                                {selectedFunction.name}()
                                            </code>
                                        </h1>
                                        <p className="text-[color:var(--color-text-secondary)] text-lg">
                                            {selectedFunction.description}
                                        </p>
                                    </div>

                                    {/* Parameters */}
                                    <div className="mb-[var(--spacing-lg)]">
                                        <h2 className="text-xl font-semibold mb-[var(--spacing-md)] text-[color:var(--color-text-primary)]">
                                            Parameters
                                        </h2>
                                        {selectedFunction.parameters.length > 0 ? (
                                            <div className="space-y-[var(--spacing-sm)]">
                                                {selectedFunction.parameters.map((param, index) => (
                                                    <div key={index} className="bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-[var(--border-radius-md)] p-[var(--spacing-md)]">
                                                        <div className="flex items-center gap-[var(--spacing-sm)] mb-[var(--spacing-xs)]">
                                                            <code className="font-mono font-semibold text-[color:var(--color-primary)]">
                                                                {param.name}
                                                            </code>
                                                            <span className="text-sm text-[color:var(--color-text-secondary)]">
                                                                ({param.type})
                                                            </span>
                                                            {param.required && (
                                                                <span className="text-xs bg-[color:var(--color-danger)] text-white px-[var(--spacing-xs)] py-1 rounded-[var(--border-radius-sm)]">
                                                                    Required
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-[color:var(--color-text-secondary)]">
                                                            {param.description}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-[color:var(--color-text-secondary)] italic">
                                                This function takes no parameters.
                                            </p>
                                        )}
                                    </div>

                                    {/* Return Value */}
                                    <div className="mb-[var(--spacing-lg)]">
                                        <h2 className="text-xl font-semibold mb-[var(--spacing-md)] text-[color:var(--color-text-primary)]">
                                            Return Value
                                        </h2>
                                        <div className="bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-[var(--border-radius-md)] p-[var(--spacing-md)]">
                                            <div className="flex items-center gap-[var(--spacing-sm)] mb-[var(--spacing-xs)]">
                                                <span className="font-semibold text-[color:var(--color-text-primary)]">Type:</span>
                                                <code className="font-mono text-[color:var(--color-primary)]">
                                                    {selectedFunction.returnType}
                                                </code>
                                            </div>
                                            <p className="text-[color:var(--color-text-secondary)]">
                                                {selectedFunction.returnDescription}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Examples */}
                                    <div className="mb-[var(--spacing-lg)]">
                                        <h2 className="text-xl font-semibold mb-[var(--spacing-md)] text-[color:var(--color-text-primary)]">
                                            Examples
                                        </h2>
                                        <div className="space-y-[var(--spacing-lg)]">
                                            {selectedFunction.examples.map((example, index) => (
                                                <div key={index} className="border border-[color:var(--color-border)] rounded-[var(--border-radius-lg)] overflow-hidden">
                                                    <div className="bg-[color:var(--color-gray-light)] px-[var(--spacing-md)] py-[var(--spacing-sm)] border-b border-[color:var(--color-border)]">
                                                        <h3 className="font-semibold text-[color:var(--color-text-primary)]">
                                                            {example.title}
                                                        </h3>
                                                    </div>
                                                    <div className="p-[var(--spacing-md)]">
                                                        <ExampleEditor code={example.code} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-[color:var(--color-text-secondary)] mt-[var(--spacing-xl)]">
                                    <p>Select a function from the menu to view its documentation.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

interface ExampleEditorProps {
    code: string;
}

const ExampleEditor: React.FC<ExampleEditorProps> = ({ code }) => {
    const [editorValue, setEditorValue] = useState(code);
    const [mode] = useState<EditorMode>("augmented");

    // Update editor value when code prop changes
    useEffect(() => {
        setEditorValue(code);
    }, [code]);

    const handleTextChange = (value: string) => {
        setEditorValue(value);
    };

    return (
        <div className="flex gap-[var(--spacing-md)]">
            {/* Editor */}
            <div className="w-1/2">
                <div className="text-sm font-medium text-[color:var(--color-text-secondary)] mb-[var(--spacing-xs)]">
                    Code
                </div>
                <CodeEditor
                    value={editorValue}
                    onChange={handleTextChange}
                    height="200px"
                    language="plaintext"
                />
            </div>

            {/* Viewer */}
            <div className="w-1/2">
                <div className="text-sm font-medium text-[color:var(--color-text-secondary)] mb-[var(--spacing-xs)]">
                    Output
                </div>
                <div className="min-h-[200px] bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-[var(--border-radius-md)] p-[var(--spacing-md)] overflow-auto">
                    {editorValue.trim() ? (
                        <MessageContent content={editorValue} mode={mode} />
                    ) : (
                        <p className="text-[color:var(--color-text-secondary)] italic">
                            No content to preview
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DocumentationPage; 