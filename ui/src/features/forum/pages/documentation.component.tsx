import React, { useState } from "react";
import { BUILT_IN_FUNCTION_SPECS } from "../components/message-content/augmented-script/built-in-functions";
import type { BuiltInFunctionSpec } from "../components/message-content/augmented-script/types";
import FunctionList from "../components/function-list.component";
import FunctionDetails from "../components/function-details.component";

const DocumentationPage: React.FC = () => {
    const [selectedFunction, setSelectedFunction] = useState<BuiltInFunctionSpec | null>(
        BUILT_IN_FUNCTION_SPECS[0] || null
    );
    const [isLoading, setIsLoading] = useState(false);

    const handleFunctionSelect = (funcSpec: BuiltInFunctionSpec) => {
        setIsLoading(true);
        setSelectedFunction(null);
        
        setTimeout(() => {
            setSelectedFunction(funcSpec);
            setIsLoading(false);
        }, 100);
    };

    return (
        <div className="flex h-[calc(100vh-var(--spacing-header-padding-top))] overflow-hidden">
            <div className="flex flex-row w-full">
                <FunctionList
                    functions={BUILT_IN_FUNCTION_SPECS}
                    selectedFunction={selectedFunction}
                    onFunctionSelect={handleFunctionSelect}
                />

                <div className="w-3/4 overflow-y-auto">
                    <div className="flex-1">
                        <div className="p-[var(--spacing-md)]">
                            {isLoading ? (
                                <div className="text-center opacity-70 mt-[var(--spacing-xl)]">
                                    <p>Loading...</p>
                                </div>
                            ) : selectedFunction ? (
                                <FunctionDetails function={selectedFunction} />
                            ) : (
                                <div className="text-center opacity-70 mt-[var(--spacing-xl)]">
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

export default DocumentationPage; 