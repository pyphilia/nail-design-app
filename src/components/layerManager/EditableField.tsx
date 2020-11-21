import React, { Component } from "react";

type Props = {
  text: string;
  onSave: (name: string) => void;
  tag?: string;
  className?: string;
};
type State = {
  tmpText: string;
  nameEdition: boolean;
};

class EditableField extends Component<Props, State> {
  defaultProps = {
    tag: "div",
  };

  state = {
    tmpText: this.props.text,
    nameEdition: false,
  };

  editStart = () => {
    this.setState({ nameEdition: true });
  };

  onChange = (e: any) => {
    this.setState({ tmpText: e.target.value });
  };

  endEditName = () => {
    const { tmpText } = this.state;
    const { onSave } = this.props;
    onSave(tmpText);
    this.setState({ nameEdition: false });
  };

  render() {
    const { nameEdition, tmpText } = this.state;
    const { text, tag, className } = this.props;
    if (nameEdition) {
      return (
        <input
          autoFocus
          onBlur={this.endEditName}
          onChange={this.onChange}
          value={tmpText}
        />
      );
    }
    const tagComponent = tag!; // the exclamation mark tells ts that it wont be null
    return React.createElement(
      tagComponent,
      { onDoubleClick: this.editStart, className },
      text
    );
  }
}

export default EditableField;
