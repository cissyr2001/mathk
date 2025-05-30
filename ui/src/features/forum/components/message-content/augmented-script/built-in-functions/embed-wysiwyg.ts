import type { BuiltInFunctionSpec } from "../types";
import { sanitizeHtml } from "../utils";

export const embedWysiwygFunction: BuiltInFunctionSpec = {
  name: "embed_wysiwyg",
  handler: (editorId: string) => {
    const el = document.createElement("div");
    el.innerHTML = sanitizeHtml(
      `<em>WYSIWYG content from editor_id: "${editorId}" will be rendered here.</em>`
    );
    return el;
  },
  description: "Embeds WYSIWYG (What You See Is What You Get) content from a specified editor. This is used for rich text content integration.",
  parameters: [
    {
      name: "editorId",
      type: "string",
      description: "The identifier of the WYSIWYG editor to embed content from",
      required: true,
    },
  ],
  returnType: "HTMLDivElement",
  returnDescription: "A div element containing the sanitized WYSIWYG content",
  examples: [
    {
      title: "Embed content from main editor",
      code: `embed_wysiwyg("main-editor")`,
    },
    {
      title: "Embed content with variable ID",
      code: `@editorName = "content-editor-1"
embed_wysiwyg(@editorName)`,
    },
    {
      title: "Multiple WYSIWYG embeds",
      code: `embed_wysiwyg("intro-editor")
embed_wysiwyg("body-editor")
embed_wysiwyg("conclusion-editor")`,
    },
  ],
}; 