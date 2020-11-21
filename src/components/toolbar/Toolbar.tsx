import React from "react";
import { connect, ConnectedProps } from "react-redux";
import "./Toolbar.css";
import { RootState } from "../../reducers";
import {setColor} from "../../actions/hand"

const mapDispatchToProps = {
  dispatchSetColor: setColor,
};

// const mapStateToProps = ({ layers, canvas }: RootState) => ({

// });

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {};

class Toolbar extends React.Component<Props> {
  setColor = ({color}: {color:string}) => {
    const { dispatchSetColor } = this.props
    dispatchSetColor({color});
  };

  public render() {

    const colors = ["black", "white", "red", "yellow", "#fff000"]

    return (
      <div id="toolbar">
        {colors.map(color => (
        <div className="color" key={color} style={{backgroundColor: color}} onClick={() => this.setColor({color})}/>
        ))}
      </div>
    );
  }
}

const ConnectedComponent = connector(Toolbar);

export default ConnectedComponent;
