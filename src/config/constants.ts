export const ENDPOINT = `${process.env.REACT_APP_CORS_PROXY}/${process.env.REACT_APP_ENDPOINT}`;

export const PRESENT = "present";

export const SHAPES = {
  RECTANGLE: "RECTANGLE",
  CIRCLE: "CIRCLE",
  TEXT: "TEXT",
} as const;

export const TAGS = {
  OBJECT: "object",
  ZONE: "zone",
};

export const ZOOM_POWER = 1.1;
