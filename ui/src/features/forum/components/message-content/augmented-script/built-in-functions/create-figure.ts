import type { BuiltInFunctionSpec } from "../types";

export const createFigureFunction: BuiltInFunctionSpec = {
  name: "create_figure",
  handler: () => document.createDocumentFragment(),
  description: "Initializes a new figure context for creating geometric drawings. This must be called before creating points or drawing lines.",
  parameters: [],
  returnType: "DocumentFragment",
  returnDescription: "An empty document fragment that initializes the figure context",
  examples: [
    {
      title: "Create a simple triangle",
      code: `create_figure()
@A = point(10, 10)
@B = point(50, 10)
@C = point(30, 40)
join(@A, @B)
join(@B, @C)
join(@C, @A)`,
    },
    {
      title: "Create a square",
      code: `create_figure()
@corner1 = point(10, 10)
@corner2 = point(40, 10)
@corner3 = point(40, 40)
@corner4 = point(10, 40)
join(@corner1, @corner2)
join(@corner2, @corner3)
join(@corner3, @corner4)
join(@corner4, @corner1)`,
    },
    {
      title: "Start a new figure",
      code: `create_figure()
# Now you can create points and join them`,
    },
  ],
}; 