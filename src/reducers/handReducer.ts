import { Map } from "immutable";
import HandState from "./HandState";
import HandActionTypes, {
  SET_COLOR,
} from "../types/HandActionTypes";


const initialState = new HandState({
  nails: Map({
    color: "white"
  }),
});

export function handReducer(
  state = initialState,
  action: HandActionTypes
): HandState {
  const { type, payload } = action;
  switch (type) {
    case SET_COLOR: {
      return state.setIn(["nails", "color"], payload.color);
    }
    default:
      return state;
  }
}

export default handReducer;
