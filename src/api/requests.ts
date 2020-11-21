import fetch from "node-fetch";
import Element from "../classes/Element";
import { ENDPOINT, TAGS } from "../config/constants";
import { TransformElementPayloadType } from "../types/LayerActionTypes";

export const getPlan = (planId: number) => {
  return fetch(`${ENDPOINT}/at-and-inside/${planId}`, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  }).then((res: any) => res.json().then((res: any) => res.return));
};

export const saveElement = (element: Element, layerName: string) => {
  const object = element.toJS();
  const position = `${object.x};${object.y}`;
  const body = {
    where: {
      parent: null,
      position,
      layer: layerName,
    },
    what: {
      tag: TAGS.OBJECT,
      attrs: {
        ...object,
      },
    },
  };

  return fetch(`${ENDPOINT}/create`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  }).then((res: any) => res.json());
};

export const patchElement = (payload: TransformElementPayloadType) => {
  console.log(payload);

  // return fetch(`${ENDPOINT}/at/${}`, {
  //   method: "post",
  //   body: JSON.stringify(body),
  //   headers: { "Content-Type": "application/json" },
  // }).then((res: any) => res.json());
};
