import { combineReducers } from "redux";
import { Map } from "immutable";
import undoable, { StateWithHistory } from "redux-undo";
import layers from "./layerReducer";
import canvas from "./canvasReducer";

const reducers = combineReducers({
  layers: undoable(layers),
  canvas,
});

export type RootState = {
  layers: StateWithHistory<Map<string, any>>;
  canvas: Map<string, any>;
};

export default reducers;
