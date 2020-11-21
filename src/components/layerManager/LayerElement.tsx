import React from "react";
import { connect, ConnectedProps } from "react-redux";
import Form from "react-bootstrap/Form";
import { SketchPicker, ColorResult } from "react-color";
import Element from "../../classes/Element";
import CustomDataForm from "./CustomDataForm";
import PropertyInput from "./PropertyInput";
import visibilityIcon from "../../images/visibilityIcon.png";
import { setVisibility, setElementFillColor } from "../../actions/element";
import { RootState } from "../../reducers";
import { selectElement, setElementName } from "../../actions/layers";
import EditableField from "./EditableField";

const mapDispatchToProps = {
  dispatchSetVisibility: setVisibility,
  dispatchSelectElement: selectElement,
  dispatchSetElementFillColor: setElementFillColor,
  dispatchSetElementName: setElementName,
};

const mapStateToProps = ({}: RootState) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  element: Element;
  layerId: number;
  isSelected: boolean;
};
type State = {
  displayColorPicker: boolean;
  currentColor: string;
  elementName: string;
  nameEdition: boolean;
};

class LayerElement extends React.Component<Props, State> {
  state: State = {
    displayColorPicker: false,
    currentColor: this.props.element.get("fill"),
    elementName: this.props.element.get("name"),
    nameEdition: false,
  };

  toggleVisibility = () => {
    const { layerId, dispatchSetVisibility, element } = this.props;
    const visibility = element.get("isVisible");
    dispatchSetVisibility({
      visibility: !visibility,
      id: element.get("id"),
      layerId,
    });
  };

  selectElement = () => {
    const { dispatchSelectElement, element } = this.props;
    const id = element.get("id");
    dispatchSelectElement(id);
  };

  handleChangeColor = (color: ColorResult) => {
    this.setState({ currentColor: color.hex });
  };

  handleClose = () => {
    const { dispatchSetElementFillColor, element, layerId } = this.props;
    const { currentColor } = this.state;
    this.setState({ displayColorPicker: false });
    dispatchSetElementFillColor({
      color: currentColor,
      id: element.get("id"),
      layerId,
    });
  };

  editName = (newName: string) => {
    const { dispatchSetElementName, element, layerId } = this.props;
    dispatchSetElementName({
      name: newName,
      id: element.get("id"),
      layerId,
    });
  };

  renderSketchPickerColor = () => {
    const { displayColorPicker, currentColor } = this.state;
    if (displayColorPicker) {
      return (
        <div className="colorPickerPopUp">
          <div className="cover" onClick={this.handleClose} />
          <SketchPicker
            color={currentColor}
            onChangeComplete={this.handleChangeColor}
          />
        </div>
      );
    }
  };

  toggleSketchPicker = () => {
    const { displayColorPicker } = this.state;
    this.setState({ displayColorPicker: !displayColorPicker });
  };

  render() {
    const { element, layerId, isSelected, dispatchSetElementName } = this.props;
    const customData = element.get("customData");
    const id = element.get("id");
    return (
      <div
        data-id={id}
        className="layerElement"
        style={{ background: isSelected ? "orange" : undefined }}
        onClick={this.selectElement}
      >
        <div
          className="visible"
          style={{ opacity: element.get("isVisible") ? 1 : 0.3 }}
        >
          <img
            width="20px"
            src={visibilityIcon}
            alt="visiblity icon"
            onClick={this.toggleVisibility}
          />
        </div>
        <EditableField
          tag="div"
          text={element.get("name")}
          onSave={this.editName}
          className="name"
        />
        <div
          className="backgroundColor"
          style={{ backgroundColor: element.get("fill") }}
          onClick={this.toggleSketchPicker}
        ></div>

        {this.renderSketchPickerColor()}

        <Form>
          {!customData.isEmpty() &&
            Object.entries(customData.toJS()).map(([key, value]) => (
              <PropertyInput
                layerId={layerId}
                elementId={element.get("id")}
                key={key}
                keyName={key}
                value={value as string}
              />
            ))}
        </Form>
        <CustomDataForm elementId={element.get("id")} layerId={layerId} />
      </div>
    );
  }
}

const ConnectedComponent = connector(LayerElement);

export default ConnectedComponent;
