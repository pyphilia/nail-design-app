import CanvasActionTypes, {
  SET_STAGE_OFFSET,
  SET_STAGE_SCALE,
  SetStageScalePayloadType,
  SetStageOffsetPayloadType,
} from "../types/CanvasActionTypes";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducers";

type CanvasAction = ThunkAction<void, RootState, null, CanvasActionTypes>;

export const setStageOffset = (
  payload: SetStageOffsetPayloadType
): CanvasAction => (dispatch): void => {
  dispatch({ type: SET_STAGE_OFFSET, payload });
};

export const setStageScale = (
  payload: SetStageScalePayloadType
): CanvasAction => (dispatch): void => {
  dispatch({ type: SET_STAGE_SCALE, payload });
};
