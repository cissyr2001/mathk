import type Decimal from "decimal.js";
import type { IForumThread, IReply, IUser } from "../../../types/forum-types.type";

export interface RenderAugmentedBlockParams {
  content: string;
  item?: IForumThread | IReply;
  currentUser?: IUser | null;
}

export type ValidArgument = string | number | Decimal | Record<string, any> | any[];

export type BuiltInFunction = (
  ...args: any[]
) => HTMLElement | Text | DocumentFragment | string | Decimal | SVGSVGElement | Point;

export interface BuiltInFunctionExample {
  title: string;
  code: string;
}

export interface BuiltInFunctionSpec {
  name: string;
  handler: BuiltInFunction;
  description: string;
  parameters: {
    name: string;
    type: string;
    description: string;
    required?: boolean;
  }[];
  returnType: string;
  returnDescription: string;
  examples: BuiltInFunctionExample[];
}

export interface Point {
  x: Decimal;
  y: Decimal;
}

export type AugmentedScriptValue = Decimal | string | AugmentedScriptArray | Point;
export type AugmentedScriptArray = AugmentedScriptValue[];
export type AugmentedScriptVars = Record<string, AugmentedScriptValue>;

export interface FigurePoint {
  x: Decimal;
  y: Decimal;
}

export interface FigureContext {
  elements: number;
  points: Record<string, FigurePoint>;
  svg?: SVGSVGElement;
}

export interface ScriptLineResult {
  outputElement?: Node | string | null;
  updatedFigureContext?: FigureContext | null;
  error?: boolean; // Indicates if an error occurred that should halt further processing by current line
}

export interface AugmentedScriptUtils {
  sanitizeHtml: (html: string) => string;
  isValidUrl: (url: string, checkDomain?: boolean) => boolean;
  createErrorElement: (message: string) => HTMLElement;
  appendOutputElement: (
    mainBlockDiv: HTMLDivElement,
    outputElement: Node | string | null,
    figureContext: FigureContext | null
  ) => void;
}

export interface ExpressionEvaluator {
  interpolateString: (str: string, runtimeVars: AugmentedScriptVars) => string;
  evaluateExpression: (
    expr: string,
    runtimeVars: AugmentedScriptVars,
    predefinedConstants: Record<string, Decimal>,
    builtInMathFunctions: Record<string, BuiltInFunction>
  ) => Decimal | string;
} 