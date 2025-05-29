import DOMPurify from "dompurify";
import type { FigureContext } from "./types";

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
}

export function isValidUrl(url: string, checkDomain: boolean = true): boolean {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
      return false;
    }
    // TODO: Implement domain checking if APPROVED_IMAGE_DOMAINS is used
    // if (checkDomain && !APPROVED_IMAGE_DOMAINS.includes(parsedUrl.hostname)) {
    //   return false;
    // }
    return /^https?:\/\/[\w\-\.\/]+$/.test(url);
  } catch (e) {
    return false;
  }
}

export function createErrorElement(message: string): HTMLElement {
  const errorSpan = document.createElement("span");
  errorSpan.style.color = "red";
  errorSpan.textContent = `[Error: ${message}]`;
  return errorSpan;
}

export function appendOutputElement(
  mainBlockDiv: HTMLDivElement,
  outputElement: Node | string | null,
  figureContext: FigureContext | null
): void {
  if (outputElement) {
    if (
      figureContext &&
      figureContext.svg &&
      outputElement instanceof SVGSVGElement &&
      outputElement === figureContext.svg &&
      mainBlockDiv.contains(figureContext.svg)
    ) {
      // SVG already handled by being the figureContext.svg and present in mainBlockDiv
      return;
    }
    if (outputElement instanceof Node) {
      mainBlockDiv.appendChild(outputElement);
    } else if (typeof outputElement === "string") {
      mainBlockDiv.appendChild(document.createTextNode(outputElement));
    }
  }
}

const DANGEROUS_FUNCTION_NAMES = [
  'eval',
  'alert',
  'fetch',
  'XMLHttpRequest',
  'Promise',
  'setTimeout',
  'setInterval',
  'Function',
  'constructor',
  'prototype',
  '__proto__',
  'window',
  'document',
  'localStorage',
  'sessionStorage',
  'indexedDB',
  'WebSocket',
  'Worker',
  'import',
  'require'
];

const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

export function validateRuntimeVars(vars: Record<string, any>): void {
  for (const [key, value] of Object.entries(vars)) {
    // Check for malicious functions
    if (typeof value === 'function') {
      // Only allow built-in Math functions and other whitelisted functions
      const isSafeFunction = (
        Object.keys(Math).includes(key) ||
        ['toString', 'toFixed', 'toPrecision'].includes(key)
      );
      
      if (!isSafeFunction) {
        throw new Error(`Security violation: Custom functions are not allowed. Found: ${key}`);
      }
    }

    // Check strings for dangerous patterns
    if (typeof value === 'string') {
      // Check for dangerous function names in the string
      if (DANGEROUS_FUNCTION_NAMES.some(name => value.toLowerCase().includes(name.toLowerCase()))) {
        throw new Error(`Security violation: String contains potentially dangerous code: ${value}`);
      }

      // Check for URLs
      if (URL_REGEX.test(value)) {
        throw new Error(`Security violation: URLs are not allowed: ${value}`);
      }
    }

    // Recursively check objects (but not built-in objects like Math)
    if (value && typeof value === 'object' && !Array.isArray(value) && value.constructor === Object) {
      validateRuntimeVars(value);
    }
  }
} 