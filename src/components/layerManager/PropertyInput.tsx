import React from "react";
import { connect, ConnectedProps } from "react-redux";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./LayerManager.css";
import { setCustomData } from "../../actions/element";

const mapDispatchToProps = {
  dispatchSetCustomData: setCustomData,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type Props = PropsFromRedux & {
  key?: string;
  layerId: number;
  elementId: string;
  keyName: string;
  value: string;
};

type State = {};

class PropertyInput extends React.Component<Props, State> {
  handeOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { dispatchSetCustomData, layerId, elementId, keyName } = this.props;
    const { value } = e.target;
    dispatchSetCustomData({ value, layerId, id: elementId, key: keyName });
  };

  public render() {
    const { keyName, value } = this.props;

    return (
      <Form.Group
        as={Row}
        controlId="formPlaintextPassword"
        className="customData mb-1"
      >
        <Form.Label column sm="4" title={keyName}>
          {keyName}
        </Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            placeholder={keyName}
            value={value}
            onChange={this.handeOnChange}
          />
        </Col>
      </Form.Group>
    );
  }
}

const ConnectedComponent = connector(PropertyInput);

export default ConnectedComponent;
