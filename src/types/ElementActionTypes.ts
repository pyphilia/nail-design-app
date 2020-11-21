export const ADD_CUSTOM_DATA = "ADD_CUSTOM_DATA";
export const SET_CUSTOM_DATA = "SET_CUSTOM_DATA";
export const SET_VISIBILITY = "SET_VISIBILITY";
export const SET_ELEMENT_FILL_COLOR = "SET_ELEMENT_FILL_COLOR";
export const SET_ELEMENT_TEXT = "SET_ELEMENT_TEXT";

export type AddCustomDataPayloadType = {
  key: string;
  value: string;
  id: string;
  layerId: number;
};
interface AddCustomDataAction {
  type: typeof ADD_CUSTOM_DATA;
  payload: AddCustomDataPayloadType;
}

export type SetCustomDataPayloadType = {
  key: string;
  value: string;
  id: string;
  layerId: number;
};
interface SetCustomDataAction {
  type: typeof SET_CUSTOM_DATA;
  payload: SetCustomDataPayloadType;
}

export type SetVisibilityPayloadType = {
  visibility: boolean;
  id: string;
  layerId: number;
};
interface SetVisibilityAction {
  type: typeof SET_VISIBILITY;
  payload: SetVisibilityPayloadType;
}

export type SetElementFillColorPayloadType = {
  color: string;
  id: string;
  layerId: number;
};
interface SetElementFillColorAction {
  type: typeof SET_ELEMENT_FILL_COLOR;
  payload: SetElementFillColorPayloadType;
}

export type SetElementTextPayloadType = {
  text: string;
  id: string;
  layerId: number;
};
interface SetElementTextAction {
  type: typeof SET_ELEMENT_TEXT;
  payload: SetElementTextPayloadType;
}

type ElementActionTypes =
  | AddCustomDataAction
  | SetCustomDataAction
  | SetVisibilityAction
  | SetElementFillColorAction
  | SetElementTextAction;

export default ElementActionTypes;
