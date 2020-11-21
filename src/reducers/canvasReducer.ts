import { Map } from "immutable";
import CanvasState from "./CanvasState";
import CanvasActionTypes, {
  SET_STAGE_OFFSET,
  SET_STAGE_SCALE,
  SetStageScalePayloadType,
} from "../types/CanvasActionTypes";

// REDUCER

const initialState = new CanvasState({
  stage: Map({
    offset: { x: 0, y: 0 },
    scale: 1.01,
  }),
});

export function canvasReducer(
  state = initialState,
  action: CanvasActionTypes
): CanvasState {
  const { type, payload } = action;
  switch (type) {
    case SET_STAGE_OFFSET: {
      return state.setIn(["stage", "offset"], payload);
    }
    case SET_STAGE_SCALE: {
      const { scale } = payload as SetStageScalePayloadType;
      return state.setIn(["stage", "scale"], scale);
    }
    default:
      return state;
  }
}

export default canvasReducer;
