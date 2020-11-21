import { fromJS } from "immutable";
import Element, {
  RectangleProps,
  CircleProps,
  TextProps,
} from "../classes/Element";
import { SHAPES } from "../config/constants";

export const transformToElement = (object: any) => {
  const { attrs } = object.what;
  const { shape } = attrs;

  const immutableAttrs = fromJS(attrs);

  let element: Element = new RectangleProps();
  switch (shape) {
    case SHAPES.RECTANGLE:
      element = new RectangleProps(immutableAttrs);
      break;
    case SHAPES.CIRCLE:
      element = new CircleProps(immutableAttrs);
      break;
    case SHAPES.TEXT:
      element = new TextProps(immutableAttrs);
      break;
    default:
      break;
  }

  return { elements: [element], layers: [] };
};
