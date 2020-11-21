export const SET_COLOR = "SET_COLOR"

export type SetColorPayloadType = {
  color:string
};
interface SetColorAction {
  type: typeof SET_COLOR;
  payload: SetColorPayloadType;
}

type HandActionTypes =
  SetColorAction

export default HandActionTypes;
