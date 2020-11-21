import React from "react";
import { List } from "immutable";
import { Stage, Layer } from "react-konva";
import { connect, ConnectedProps } from "react-redux";
import Rectangle from "./elements/Rectangle";
import Circle from "./elements/Circle";
import Text, { TextProps } from "./elements/Text";
import { PRESENT, SHAPES, ZOOM_POWER } from "../config/constants";
import Element, { CircleProps } from "../classes/Element";
import LayerClass from "../classes/Layer";
import {
  moveElement,
  transformElement,
  selectElement,
} from "../actions/layers";
import {
  MoveElementPayloadType,
  TransformElementPayloadType,
} from "../types/LayerActionTypes";
import { RootState } from "../reducers";
import { setStageOffset, setStageScale } from "../actions/canvas";
import { SetElementTextPayloadType } from "../types/ElementActionTypes";
import { setElementText } from "../actions/element";

const mapDispatchToProps = {
  dispatchMoveElement: moveElement,
  dispatchTransformElement: transformElement,
  dispatchSelectElement: selectElement,
  dispatchSetStageOffset: setStageOffset,
  dispatchSetStageScale: setStageScale,
  dispatchSetElementText: setElementText,
};

const mapStateToProps = ({ layers, canvas }: RootState) => ({
  layers: layers[PRESENT].get("layers"), //.toJS(),
  selectedLayer: layers[PRESENT].getIn(["selected", "layer"]),
  selectedElementId: layers[PRESENT].getIn(["selected", "element"]),
  stageScale: canvas.getIn(["stage", "scale"]),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

type State = {
  scale: number;
  onWheelIteration: number;
};

class Canvas extends React.Component<Props, State> {
  state: State = {
    scale: this.props.stageScale,
    onWheelIteration: 0,
  };

  public shouldComponentUpdate({}: Props, { scale }: State) {
    const { scale: prevScale } = this.state;
    if (scale != prevScale) {
      return false;
    }
    return true;
  }

  checkDeselect = (e: any) => {
    const { dispatchSelectElement } = this.props;
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      dispatchSelectElement(null);
    }
  };

  onWheelHandler = (e: any) => {
    const { dispatchSetStageScale, dispatchSetStageOffset } = this.props;
    const { scale, onWheelIteration } = this.state;
    const target = e.target;
    const stage = target.getStage();
    e.evt.preventDefault();
    const oldScale = stage.scaleX();

    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    const newScale =
      e.evt.deltaY > 0
        ? oldScale * scale * ZOOM_POWER
        : oldScale / scale / ZOOM_POWER;
    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    };
    stage.position(newPos);
    stage.batchDraw();

    // avoid dispatching each time
    this.setState({ onWheelIteration: onWheelIteration + 1 });
    if (onWheelIteration % 10 == 0) {
      dispatchSetStageScale({ scale: newScale });

      // zoom change offset
      const { x, y } = stage.attrs;
      dispatchSetStageOffset({ x, y });
    }
  };

  onDragEnd = (evt: any) => {
    const { id } = evt.target.attrs;
    if (id === "stage") {
      const { dispatchSetStageOffset } = this.props;
      const { x, y } = evt.target.attrs;
      dispatchSetStageOffset({ x, y });
    }
  };

  public render() {
    const {
      layers,
      dispatchMoveElement,
      dispatchTransformElement,
      dispatchSelectElement,
      dispatchSetElementText,
      selectedLayer,
      selectedElementId,
    } = this.props;

    if (!layers || layers.size === 0) {
      return null;
    }

    // Stage cannot contain be connected elements (cannot link with redux directly)
    // so the dispatch functions should be given through props

    return (
      <>
        <Stage
          id="stage"
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={this.checkDeselect}
          onTouchStart={this.checkDeselect}
          onDragEnd={this.onDragEnd}
          onWheel={this.onWheelHandler}
          onTransformEnd={() => {
            console.log("stage: transform end");
          }}
          draggable
        >
          {layers.map((layer: LayerClass, i: number) => {
            const elements: List<Element> = layer.get("elements");
            const isLayerSelected = i === selectedLayer;
            return (
              <Layer key={i} name={layer.get("name")}>
                {elements.map((element: Element, k: number) => {
                  const elementId = element.get("id");

                  if (!element.get("isVisible")) {
                    return null;
                  }

                  const isSelected = elementId === selectedElementId;
                  const shape = element.get("shape");
                  switch (shape) {
                    case SHAPES.RECTANGLE:
                      return (
                        <Rectangle
                          key={k}
                          shapeProps={element}
                          isSelected={isSelected}
                          isLayerSelected={isLayerSelected}
                          onSelect={() => {
                            dispatchSelectElement(elementId);
                          }}
                          onMove={(payload: MoveElementPayloadType) => {
                            dispatchMoveElement(payload);
                          }}
                          onTransform={(
                            payload: TransformElementPayloadType
                          ) => {
                            dispatchTransformElement(payload);
                          }}
                        />
                      );

                    case SHAPES.CIRCLE:
                      return (
                        <Circle
                          key={k}
                          shapeProps={element as CircleProps}
                          isSelected={isSelected}
                          isLayerSelected={isLayerSelected}
                          onSelect={() => {
                            dispatchSelectElement(elementId);
                          }}
                          onMove={(payload: MoveElementPayloadType) => {
                            dispatchMoveElement(payload);
                          }}
                          onTransform={(
                            payload: TransformElementPayloadType
                          ) => {
                            dispatchTransformElement(payload);
                          }}
                        />
                      );

                    case SHAPES.TEXT:
                      return (
                        <Text
                          key={k}
                          onSetText={(payload: SetElementTextPayloadType) => {
                            dispatchSetElementText(payload);
                          }}
                          layerId={selectedLayer}
                          shapeProps={element as TextProps}
                          isSelected={isSelected}
                          isLayerSelected={isLayerSelected}
                          onSelect={() => {
                            dispatchSelectElement(elementId);
                          }}
                          onMove={(payload: MoveElementPayloadType) => {
                            dispatchMoveElement(payload);
                          }}
                          onTransform={(
                            payload: TransformElementPayloadType
                          ) => {
                            dispatchTransformElement(payload);
                          }}
                        />
                      );

                    default:
                      console.log(`unhandled shape : ${shape}`);
                      return null;
                  }
                })}
              </Layer>
            );
          })}
        </Stage>
      </>
    );
  }
}

const ConnectedComponent = connector(Canvas);

export default ConnectedComponent;
