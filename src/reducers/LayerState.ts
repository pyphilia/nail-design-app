import { Record, List, Map } from "immutable";
import Layer from "../classes/Layer";

interface ILayerState {
  layers: List<Layer>;
  selected: Map<string, any | null>;
}

const LayerStateRecord = Record({
  layers: List<Layer>([new Layer({ elements: List() })]),
  selected: Map({
    element: null,
    layer: 0,
  }),
});

class LayerState extends LayerStateRecord implements ILayerState {}

export default LayerState;
