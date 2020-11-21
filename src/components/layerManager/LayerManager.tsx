import React from "react";
import { List } from "immutable";
import { connect, ConnectedProps } from "react-redux";
import Draggable from "react-draggable";
import { PRESENT } from "../../config/constants";
import LayerClass from "../../classes/Layer";
import "./LayerManager.css";
import { setSelectedLayer } from "../../actions/layers";
import LayerGroup from "./LayerGroup";
import { RootState } from "../../reducers";
import Layer from "../../classes/Layer";

const mapDispatchToProps = {
  dispatchSetSelectedLayer: setSelectedLayer,
};

const mapStateToProps = ({ layers }: RootState) => ({
  layers: layers[PRESENT].get("layers"), //.toJS(),
  selected: layers[PRESENT].getIn(["selected", "layer"]),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
  layers: List<Layer>;
};

class LayerManager extends React.Component<Props> {
  public render() {
    const { layers } = this.props;

    if (!layers || layers.size === 0) {
      return null;
    }

    return (
      <div id="layerManager">
        {layers.map((layer: LayerClass, i: number) => (
          <LayerGroup key={layer.get("name")} layer={layer} id={i} />
        ))}
      </div>
    );
  }
}

const ConnectedComponent = connector(LayerManager);

export default ConnectedComponent;
