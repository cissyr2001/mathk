import Decimal from "decimal.js";
import type { BuiltInFunctionSpec, Point } from "../types";

export const pointFunction: BuiltInFunctionSpec = {
  name: "point",
  handler: (x: Decimal | number, y: Decimal | number): Point => {
    const xDecimal = x instanceof Decimal ? x : new Decimal(x);
    const yDecimal = y instanceof Decimal ? y : new Decimal(y);
    return { x: xDecimal, y: yDecimal };
  },
  description: "Creates a point object with x and y coordinates. Used for geometric operations and figure creation.",
  parameters: [
    {
      name: "x",
      type: "Decimal | number",
      description: "The x-coordinate of the point",
      required: true,
    },
    {
      name: "y",
      type: "Decimal | number",
      description: "The y-coordinate of the point",
      required: true,
    },
  ],
  returnType: "Point",
  returnDescription: "A point object with x and y decimal coordinates",
  examples: [
    {
      title: "Create a simple point",
      code: `@answer = point(5, 10)
@answer`,
    },
    {
      title: "Create points for a figure",
      code: `create_figure()
@A = point(10, 20)
@B = point(50, 60)
join(@A, @B)`,
    },
    {
      title: "Create points using variables",
      code: `@x1 = 0
@y1 = 0
@answer = point(@x1, @y1)
@answer`,
    },
  ],
}; 