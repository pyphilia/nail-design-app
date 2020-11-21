import { Record, List } from "immutable";
import Element from "./Element";

interface ILayer {
  elements: List<Element>;
  name: string;
}

const LayerRecord = Record({
  elements: List<Element>(),
  name: "layer name",
});

class Layer extends LayerRecord implements ILayer {}

export default Layer;
