import type { BuiltInFunctionSpec } from "../components/message-content/augmented-script/types";

export const categoryOrder = [
    "Basic Arithmetic",
    "Rounding & Comparison",
    "Powers & Logarithms",
    "Trigonometric Functions",
    "Statistical Functions",
    "Geometry Functions",
    "Content Embedding",
    "Number Properties",
    "Advanced Math"
];

export const categorizeFunction = (funcSpec: BuiltInFunctionSpec): string => {
    // Basic Arithmetic
    if (["add", "subtract", "multiply", "divide", "mod", "abs", "neg", "recip"].includes(funcSpec.name)) {
        return "Basic Arithmetic";
    }
    // Rounding & Comparison
    if (["floor", "ceil", "round", "trunc", "sign", "min", "max", "clamp", "clamp01"].includes(funcSpec.name)) {
        return "Rounding & Comparison";
    }
    // Powers & Logarithms
    if (["pow", "square", "cube", "cbrt", "sqrt", "exp", "ln", "log10", "log2", "log"].includes(funcSpec.name)) {
        return "Powers & Logarithms";
    }
    // Trigonometric Functions
    if (["sin", "cos", "tan", "asin", "acos", "atan", "deg2rad", "rad2deg"].includes(funcSpec.name)) {
        return "Trigonometric Functions";
    }
    // Statistical Functions
    if (["sum", "product", "mean"].includes(funcSpec.name)) {
        return "Statistical Functions";
    }
    // Geometry Functions
    if (["point", "create_figure", "join"].includes(funcSpec.name)) {
        return "Geometry Functions";
    }
    // Content Embedding
    if (["embedImage", "showUrl", "embedWysiwyg"].includes(funcSpec.name)) {
        return "Content Embedding";
    }
    // Number Properties
    if (["isZero", "isNegative", "isPositive", "isInteger", "signum"].includes(funcSpec.name)) {
        return "Number Properties";
    }
    // Advanced Math
    if (["catalan", "bell", "stirlingS1", "stirlingS2", "multinomial", "smoothStep", "lerp"].includes(funcSpec.name)) {
        return "Advanced Math";
    }
    return "Other";
};

export const formatFunctionSignature = (func: BuiltInFunctionSpec): string => {
    const params = func.parameters.map(param => `${param.name}: ${param.type}`).join(", ");
    return `${func.name}(${params})`;
};

export const formatSimpleFunctionSignature = (func: BuiltInFunctionSpec): string => {
    const params = func.parameters.map(param => param.name).join(", ");
    return `${func.name}(${params})`;
}; 