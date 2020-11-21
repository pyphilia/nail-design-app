import React from "react";
import { Dispatch } from "redux";
import { ActionCreators } from "redux-undo";
import { connect, ConnectedProps } from "react-redux";

const undo = ActionCreators.undo();

const mapDispatchToProps = {
  dispatchUndo: () => (dispatch: Dispatch<typeof undo>) => dispatch(undo),
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};
type State = {
  // count: number; // like this
};
class UndoButton extends React.Component<Props, State> {
  private undo = () => {
    const { dispatchUndo } = this.props;
    dispatchUndo();
  };

  public render = () => {
    return (
      <button id="undo" onClick={this.undo}>
        Undo
      </button>
    );
  };
}

const ConnectedComponent = connector(UndoButton);

export default ConnectedComponent;
