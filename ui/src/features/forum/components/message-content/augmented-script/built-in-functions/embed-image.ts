import type { BuiltInFunctionSpec } from "../types";
import { isValidUrl, createErrorElement } from "../utils";

export const embedImageFunction: BuiltInFunctionSpec = {
  name: "embed_image",
  handler: (url: string) => {
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
  description: "Embeds an image from a URL into the content. The image will be responsive and fit within the available width.",
  parameters: [
    {
      name: "url",
      type: "string",
      description: "The URL of the image to embed (must be a valid HTTP/HTTPS URL)",
      required: true,
    },
  ],
  returnType: "HTMLImageElement",
  returnDescription: "An HTML image element with the specified source URL",
  examples: [
    {
      title: "Embed an image",
      code: `embed_image("https://example.com/image.jpg")`,
    },
    {
      title: "Embed image with variable URL",
      code: `@imageUrl = "https://picsum.photos/300/200"
embed_image(@imageUrl)`,
    },
    {
      title: "Embed multiple images",
      code: `embed_image("https://picsum.photos/200/150?random=1")
embed_image("https://picsum.photos/200/150?random=2")`,
    },
  ],
}; 