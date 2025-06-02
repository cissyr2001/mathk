import React, { useState } from "react";
import type { BuiltInFunctionSpec } from "./message-content/augmented-script/types";
import { formatFunctionSignature } from "../utils/function-utils";
import ExampleEditor from "./example-editor.component";

interface FunctionDetailsProps {
    function: BuiltInFunctionSpec;
}

const FunctionDetails: React.FC<FunctionDetailsProps> = ({ function: func }) => {
    const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

    return (
        <div>
            {/* Function Header */}
            <div className="mb-[var(--spacing-lg)]">
                <h1 className="text-3xl font-bold mb-[var(--spacing-sm)]">
                    <code className="font-mono bg-gray-100 px-[var(--spacing-sm)] py-[var(--spacing-xs)] rounded-[var(--border-radius-sm)]">
                        {formatFunctionSignature(func)}
                    </code>
                </h1>
                <p className="text-lg">{func.description}</p>
            </div>

            {/* Collapsible Details Panel */}
            <div className="mb-[var(--spacing-lg)]">
                <button
                    onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
                    className="flex items-center gap-2 hover:opacity-70 transition-colors"
                >
                    <span className="text-xl font-semibold">Details</span>
                    <svg
                        className={`w-5 h-5 transform transition-transform ${isDetailsExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isDetailsExpanded && (
                    <div className="mt-[var(--spacing-md)] space-y-[var(--spacing-lg)]">
                        {/* Parameters */}
                        <div>
                            <h2 className="text-xl font-semibold mb-[var(--spacing-md)]">Parameters</h2>
                            {func.parameters.length > 0 ? (
                                <div className="space-y-[var(--spacing-sm)]">
                                    {func.parameters.map((param, index) => (
                                        <div key={index} className="bg-gray-50 border rounded-[var(--border-radius-md)] p-[var(--spacing-md)]">
                                            <div className="flex items-center gap-[var(--spacing-sm)] mb-[var(--spacing-xs)]">
                                                <code className="font-mono font-semibold">{param.name}</code>
                                                <span className="text-sm opacity-70">({param.type})</span>
                                                {param.required && (
                                                    <span className="text-xs bg-red-500 text-white px-[var(--spacing-xs)] py-1 rounded-[var(--border-radius-sm)]">
                                                        Required
                                                    </span>
                                                )}
                                            </div>
                                            <p className="opacity-70">{param.description}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="opacity-70 italic">This function takes no parameters.</p>
                            )}
                        </div>

                        {/* Return Value */}
                        <div>
                            <h2 className="text-xl font-semibold mb-[var(--spacing-md)]">Return Value</h2>
                            <div className="bg-gray-50 border rounded-[var(--border-radius-md)] p-[var(--spacing-md)]">
                                <div className="flex items-center gap-[var(--spacing-sm)] mb-[var(--spacing-xs)]">
                                    <span className="font-semibold">Type:</span>
                                    <code className="font-mono">{func.returnType}</code>
                                </div>
                                <p className="opacity-70">{func.returnDescription}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Examples */}
            <div className="mb-[var(--spacing-lg)]">
                <h2 className="text-xl font-semibold mb-[var(--spacing-md)]">Examples</h2>
                <div className="space-y-[var(--spacing-lg)]">
                    {func.examples.map((example, index) => (
                        <div key={index} className="overflow-hidden">
                            <div className="bg-gray-100 px-[var(--spacing-md)] py-[var(--spacing-sm)]">
                                <h3 className="font-semibold">{example.title}</h3>
                            </div>
                            <div>
                                <ExampleEditor code={example.code} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FunctionDetails; 