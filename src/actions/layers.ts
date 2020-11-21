import LayerActionTypes, {
  ADD_ELEMENT,
  GET_PLAN,
  SET_SELECTED_LAYER,
  TRANSFORM_ELEMENT,
  MOVE_ELEMENT,
  SET_SELECTED_ELEMENT,
  MoveElementPayloadType,
  TransformElementPayloadType,
  SetLayerNamePayloadType,
  SET_LAYER_NAME,
  SET_ELEMENT_NAME,
  SetElementNamePayloadType,
} from "../types/LayerActionTypes";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducers";
import { SHAPES } from "../config/constants";
import Element, {
  RectangleProps,
  CircleProps,
  TextProps,
} from "../classes/Element";
import { generateRandomId } from "../utils/utils";
import {
  saveElement,
  getPlan as getPlanCall,
  patchElement,
} from "../api/requests";
import { transformToElement } from "../utils/apiToRedux";

// export const getElements = () => (dispatch: Dispatch<LayerActionTypes>) => {
//   dispatch({ type: GET_ELEMENTS });
// };

type LayerAction = ThunkAction<void, RootState, null, LayerActionTypes>;

export const getPlan = (planId: number): LayerAction => (dispatch): void => {
  getPlanCall(planId).then((res: any) => {
    // transform return into redux elements
    const plan = transformToElement(res[0]);
    dispatch({ type: GET_PLAN, payload: plan });
  });
};

export const addElement = ({
  shape,
  x,
  y,
  layerName,
  name,
}: {
  shape: string;
  x: number;
  y: number;
  layerName: string;
  name: string;
}): LayerAction => (dispatch): void => {
  const id = generateRandomId();

  let element: Element = new RectangleProps();
  switch (shape) {
    case SHAPES.RECTANGLE:
      element = new RectangleProps({ id, x, y, name });
      break;
    case SHAPES.CIRCLE:
      element = new CircleProps({ id, x, y, fill: "blue", name });
      break;
    case SHAPES.TEXT:
      element = new TextProps({ id, x, y, name });
      break;
    default:
      break;
  }

  if (!element) {
    console.log("ELEMENT NOT DEFINED");
    return;
  }

  // dispatch element
  dispatch({ type: ADD_ELEMENT, payload: { element } });

  // save element in db
  // saveElement(element, layerName).then((res: any) => {
  //   // wait for element to be saved to set pk in redux
  //   // const {pk} = res.return;
  //   // const elementWithPk = {pk, ...element}
  //   // dispatch({ type: ADD_ELEMENT, payload: { element } });
  // });
};

export const setSelectedLayer = (idx: number): LayerAction => (
  dispatch
): void => {
  dispatch({ type: SET_SELECTED_LAYER, payload: idx });
};

export const moveElement = (payload: MoveElementPayloadType): LayerAction => (
  dispatch
): void => {
  dispatch({ type: MOVE_ELEMENT, payload });
};

export const transformElement = (
  payload: TransformElementPayloadType
): LayerAction => (dispatch): void => {
  dispatch({ type: TRANSFORM_ELEMENT, payload });
  patchElement(payload);
};

export const selectElement = (rectId: string | null): LayerAction => (
  dispatch
): void => {
  dispatch({ type: SET_SELECTED_ELEMENT, payload: rectId });
};

export const setLayerName = (payload: SetLayerNamePayloadType): LayerAction => (
  dispatch
): void => {
  dispatch({ type: SET_LAYER_NAME, payload });
};

export const setElementName = (
  payload: SetElementNamePayloadType
): LayerAction => (dispatch): void => {
  dispatch({ type: SET_ELEMENT_NAME, payload });
};
