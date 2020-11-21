import React from "react";
import { List } from "immutable";
import { Stage, Layer, Line } from "react-konva";
import { connect, ConnectedProps } from "react-redux";
import Background from "./Background";
import { PRESENT, SHAPES, ZOOM_POWER } from "../config/constants";
import {
  moveElement,
  transformElement,
  selectElement,
} from "../actions/layers";
import { RootState } from "../reducers";
import { setStageOffset, setStageScale } from "../actions/canvas";
import { setElementText } from "../actions/element";
import Nail from "./elements/Nail";

const mapDispatchToProps = {
  dispatchMoveElement: moveElement,
  dispatchTransformElement: transformElement,
  dispatchSelectElement: selectElement,
  dispatchSetStageOffset: setStageOffset,
  dispatchSetStageScale: setStageScale,
  dispatchSetElementText: setElementText,
};

const mapStateToProps = ({ layers, canvas, hand }: RootState) => ({
  layers: layers[PRESENT].get("layers"), //.toJS(),
  selectedLayer: layers[PRESENT].getIn(["selected", "layer"]),
  selectedElementId: layers[PRESENT].getIn(["selected", "element"]),
  stageScale: canvas.getIn(["stage", "scale"]),
  nailColor: hand.getIn(["nails", "color"])
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
      nailColor
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
          <Layer>
            <Background />
            <Nail
              fill={nailColor}
              x={165}
              y={320}
              rotation={-20}
              width={50}
              length={90}
              tension={0.3}
            />
            <Nail
              fill={nailColor}
              x={93}
              y={500}
              rotation={-20}
              length={70}
              width={40}
              tension={0.3}
            />
            <Nail
              fill={nailColor}
              x={287}
              y={220}
              rotation={-20}
              length={90}
              width={55}
              tension={0.3}
            />
            <Nail
              fill={nailColor}
              x={418}
              y={230}
              rotation={-20}
              length={90}
              width={52}
              tension={0.3}
            />
            <Nail
              fill={nailColor}
              x={888}
              y={540}
              rotation={25}
              length={110}
              width={45}
              tension={0.3}
            />
          </Layer>
        </Stage>
      </>
    );
  }
}

const ConnectedComponent = connector(Canvas);

export default ConnectedComponent;
