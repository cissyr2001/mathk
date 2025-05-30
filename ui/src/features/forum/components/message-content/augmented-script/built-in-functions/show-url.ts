import type { BuiltInFunctionSpec } from "../types";
import { isValidUrl, createErrorElement } from "../utils";

export const showUrlFunction: BuiltInFunctionSpec = {
  name: "show_url",
  handler: (text: string, url: string) => {
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
  description: "Creates a clickable link with custom text that opens in a new tab. Provides security by adding noopener and noreferrer attributes.",
  parameters: [
    {
      name: "text",
      type: "string",
      description: "The visible text of the link",
      required: true,
    },
    {
      name: "url",
      type: "string",
      description: "The URL to link to (must be a valid HTTP/HTTPS URL)",
      required: true,
    },
  ],
  returnType: "HTMLAnchorElement",
  returnDescription: "An HTML anchor element that opens the URL in a new tab",
  examples: [
    {
      title: "Create a simple link",
      code: `show_url("Visit Google", "https://www.google.com")`,
    },
    {
      title: "Link with variables",
      code: `@linkText = "Click here for documentation"
@docUrl = "https://docs.example.com"
show_url(@linkText, @docUrl)`,
    },
    {
      title: "Multiple links",
      code: `show_url("Math resources", "https://www.khanacademy.org/math")
show_url("Scientific calculator", "https://www.desmos.com/calculator")`,
    },
  ],
}; 