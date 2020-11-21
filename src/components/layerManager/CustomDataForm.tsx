import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { connect, ConnectedProps } from "react-redux";
import "./LayerManager.css";
import { addCustomData } from "../../actions/element";

const mapDispatchToProps = {
  dispatchAddCustomData: addCustomData,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type Props = PropsFromRedux & {
  layerId: number;
  elementId: string;
};

type State = {
  key: string | undefined;
  value: string | undefined;
};

class CustomDataForm extends React.Component<Props, State> {
  private _keyInput: HTMLInputElement | null = null;
  private _valueInput: HTMLInputElement | null = null;

  state = {
    key: undefined,
    value: undefined,
  };

  handeOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { layerId, elementId, dispatchAddCustomData } = this.props;
    if (this._keyInput && this._valueInput) {
      if (!this._keyInput.value.length || !this._valueInput.value.length) {
        console.log("name and key cannot be empty");
      }
      // @TODO special char
      // @TODO duplicate
      else {
        console.log("---- add custom data");
        dispatchAddCustomData({
          layerId,
          id: elementId,
          key: this._keyInput.value,
          value: this._valueInput.value,
        });
      }
    }
  };

  public render() {
    return (
      <Form className="mt-3 pb-3">
        <Form.Row>
          <Col>
            <Form.Control
              placeholder="Key"
              name="key"
              ref={(input: HTMLInputElement) => {
                this._keyInput = input;
              }}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Value"
              name="value"
              ref={(input: HTMLInputElement) => {
                this._valueInput = input;
              }}
            />
          </Col>
          <Col>
            <Button variant="primary" onClick={this.handeOnClick}>
              Add
            </Button>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}

const ConnectedComponent = connector(CustomDataForm);

export default ConnectedComponent;
