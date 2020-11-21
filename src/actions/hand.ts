import HandActionTypes, {
  SET_COLOR,SetColorPayloadType
} from "../types/HandActionTypes";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducers";

type HandAction = ThunkAction<void, RootState, null, HandActionTypes>;

export const setColor = (
  payload: SetColorPayloadType
): HandAction => (dispatch): void => {
  dispatch({ type: SET_COLOR, payload });
};
