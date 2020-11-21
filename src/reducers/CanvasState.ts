import { Record, Map } from "immutable";

interface ICanvasState {
  stage: Map<string, any>;
}

const CanvasStateRecord = Record({
  stage: Map({ offset: { x: 0, y: 0 }, scale: 1.01 }),
});

class CanvasState extends CanvasStateRecord implements ICanvasState {}

export default CanvasState;
