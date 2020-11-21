export const SET_STAGE_OFFSET = "SET_STAGE_OFFSET";
export const SET_STAGE_SCALE = "SET_STAGE_SCALE";

export type SetStageOffsetPayloadType = {
  x: number;
  y: number;
};
interface SetStageOffsetAction {
  type: typeof SET_STAGE_OFFSET;
  payload: SetStageOffsetPayloadType;
}

export type SetStageScalePayloadType = {
  scale: number;
};
interface SetStageScaleAction {
  type: typeof SET_STAGE_SCALE;
  payload: SetStageScalePayloadType;
}

type CanvasActionTypes = SetStageOffsetAction | SetStageScaleAction;

export default CanvasActionTypes;
