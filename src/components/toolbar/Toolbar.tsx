import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { PRESENT, SHAPES } from "../../config/constants";
import "./Toolbar.css";
import { RootState } from "../../reducers";
import { addElement } from "../../actions/layers";

const mapDispatchToProps = {
  dispatchAddElement: addElement,
};

const mapStateToProps = ({ layers, canvas }: RootState) => ({
  layers: layers[PRESENT].get("layers"), //.toJS(),
  selected: layers[PRESENT].getIn(["selected", "layer"]),
  stageOffset: canvas.getIn(["stage", "offset"]),
  scale: canvas.getIn(["stage", "scale"]),
  currentLayer: layers[PRESENT].getIn(["selected", "layer"]),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {};

class Toolbar extends React.Component<Props> {
  addElement = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    const shape = target.dataset.shape as string;
    const { dispatchAddElement, stageOffset, scale, currentLayer } = this.props;

    const { x: left, y: top } = stageOffset;
    const x = (window.innerWidth / 2 - left) / scale;
    const y = (window.innerHeight / 2 - top) / scale;

    const layerName = currentLayer;

    // build default name
    const name = shape.toLowerCase();

    dispatchAddElement({ shape, x, y, layerName, name });
  };

  public render() {
    return (
      <div id="toolbar">
        <div
          className="shape"
          data-shape={SHAPES.RECTANGLE}
          onClick={this.addElement}
        >
          ■
        </div>
        <div
          className="shape"
          data-shape={SHAPES.CIRCLE}
          onClick={this.addElement}
        >
          ⬤
        </div>
        <div
          className="shape"
          data-shape={SHAPES.TEXT}
          onClick={this.addElement}
        >
          T
        </div>
      </div>
    );
  }
}

const ConnectedComponent = connector(Toolbar);

export default ConnectedComponent;
