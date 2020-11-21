import { Record, Map } from "immutable";
import { SHAPES } from "../config/constants";

const ElementRecord = (props: any) =>
  class extends Record({
    x: undefined,
    y: undefined,
    width: 100,
    height: 100,
    fill: "red",
    id: "defaultid",
    category: "shape",
    shape: SHAPES.RECTANGLE,
    name: "defaultname",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customData: Map<string, any>(),
    rotation: 0,
    isVisible: true,
    ...props,
  }) {};

export class RectangleProps extends ElementRecord({
  shape: SHAPES.RECTANGLE,
}) {}

export class CircleProps extends ElementRecord({
  radius: 50,
  shape: SHAPES.CIRCLE,
}) {}

export class TextProps extends ElementRecord({
  text: "default text",
  shape: SHAPES.TEXT,
  fontSize: 20,
}) {}

type Element = CircleProps | RectangleProps | TextProps;
export default Element;
