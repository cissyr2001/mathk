import React from "react";
import type { BuiltInFunctionSpec } from "./message-content/augmented-script/types";
import { categoryOrder, categorizeFunction, formatSimpleFunctionSignature } from "../utils/function-utils";

interface FunctionListProps {
    functions: BuiltInFunctionSpec[];
    selectedFunction: BuiltInFunctionSpec | null;
    onFunctionSelect: (func: BuiltInFunctionSpec) => void;
}

const FunctionList: React.FC<FunctionListProps> = ({
    functions,
    selectedFunction,
    onFunctionSelect,
}) => {
    const categorizedFunctions = categoryOrder.reduce((acc, category) => {
        acc[category] = functions.filter(spec => categorizeFunction(spec) === category);
        return acc;
    }, {} as Record<string, BuiltInFunctionSpec[]>);

    return (
        <div className="w-1/4 min-w-[300px] overflow-y-auto border-r">
            <h2 className="text-xl font-bold p-[var(--spacing-md)]">
                Augmented Script Functions
            </h2>
            <div className="p-[var(--spacing-md)]">
                {categoryOrder.map((category) => (
                    <div key={category} className="mb-[var(--spacing-lg)]">
                        <h3 className="text-sm font-semibold uppercase tracking-wide mb-[var(--spacing-sm)]">
                            {category}
                        </h3>
                        <div className="space-y-1">
                            {categorizedFunctions[category].map((funcSpec) => (
                                <div
                                    key={funcSpec.name}
                                    onClick={() => onFunctionSelect(funcSpec)}
                                    className={`w-full text-left px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-sm transition-colors cursor-pointer ${
                                        selectedFunction?.name === funcSpec.name
                                            ? "font-medium"
                                            : "hover:opacity-70"
                                    }`}
                                >
                                    <code className="font-mono">{formatSimpleFunctionSignature(funcSpec)}</code>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FunctionList; 