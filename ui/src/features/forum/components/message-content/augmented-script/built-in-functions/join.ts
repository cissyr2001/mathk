import type { BuiltInFunctionSpec, Point } from "../types";

export const joinFunction: BuiltInFunctionSpec = {
  name: "join",
  handler: (point1: Point, point2: Point) => {
    // This function is handled specially in the function call handler
    // It creates SVG line elements between two points
    return document.createDocumentFragment();
  },
  description: "Connects two points with a line in the current figure. Both points must be created with the point() function and a figure must be initialized with create_figure().",
  parameters: [
    {
      name: "point1",
      type: "Point",
      description: "The first point to connect",
      required: true,
    },
    {
      name: "point2",
      type: "Point", 
      description: "The second point to connect",
      required: true,
    },
  ],
  returnType: "void",
  returnDescription: "Adds a line element to the current figure's SVG",
  examples: [
    {
      title: "Connect two points",
      code: `create_figure()
@A = point(10, 10)
@B = point(50, 30)
join(@A, @B)`,
    },
    {
      title: "Create a triangle",
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
  ],
}; 