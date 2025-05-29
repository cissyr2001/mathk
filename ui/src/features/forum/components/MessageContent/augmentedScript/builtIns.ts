import Decimal from "decimal.js";
import katex from "katex";
import { sanitizeHtml, isValidUrl, createErrorElement } from "./utils";
import { MAX_BAR_CHART_POINTS } from "./constants";
import type { BuiltInFunction, Point } from "./types";

// Note: `evaluateExpression` would be passed or imported if complex args need it here.
// For now, assuming args are pre-evaluated before calling these.

export const MATH_FUNCTION_NAMES = ["sin", "cos", "sqrt"];

export const BUILT_IN_FUNCTIONS: Record<string, BuiltInFunction> = {
  embed_wysiwyg: (editorId: string) => {
    const el = document.createElement("div");
    el.innerHTML = sanitizeHtml(
      `<em>WYSIWYG content from editor_id: "${editorId}" will be rendered here.</em>`
    );
    return el;
  },
  create_figure: () => document.createDocumentFragment(),
  point: (x: Decimal | number, y: Decimal | number): Point => {
    const xDecimal = x instanceof Decimal ? x : new Decimal(x);
    const yDecimal = y instanceof Decimal ? y : new Decimal(y);
    return { x: xDecimal, y: yDecimal };
  },
  embed_image: (url: string) => {
    if (!isValidUrl(url)) {
      return createErrorElement(`Invalid image URL: ${url}`);
    }
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Embedded image";
    img.style.maxWidth = "100%";
    img.style.height = "auto";
    return img;
  },
  show_url: (text: string, url: string) => {
    if (!isValidUrl(url)) {
      return createErrorElement(`Invalid URL: ${url}`);
    }
    const a = document.createElement("a");
    a.href = url;
    a.textContent = text;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    return a;
  },
  sin: (x: Decimal) => Decimal.sin(x),
  cos: (x: Decimal) => Decimal.cos(x),
  sqrt: (val: Decimal | number) => new Decimal(val).sqrt(),
}; 