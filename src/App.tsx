import React from "react";
import Canvas from "./components/Canvas";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import UndoButton from "./components/layerManager/UndoButton";
import { connect, ConnectedProps } from "react-redux";
import LayerManager from "./components/layerManager/LayerManager";
import Toolbar from "./components/toolbar/Toolbar";
import { RootState } from "./reducers";
import { getPlan } from "./actions/layers";

const mapDispatchToProps = {
  dispatchGetPlan: getPlan,
};

const mapStateToProps = ({}: RootState) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {};

class App extends React.Component<Props> {
  componentDidMount() {
    const { dispatchGetPlan } = this.props;
    // TODO : change plan id
    dispatchGetPlan(4);
  }

  render() {
    return (
      <div className="App">
        <Canvas />
        <UndoButton />
        <LayerManager />
        <Toolbar />
      </div>
    );
  }
}

const ConnectedComponent = connector(App);

export default ConnectedComponent;
