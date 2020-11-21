import React from "react";
import Konva from "konva";
import { Text, Transformer } from "react-konva";
import Element from "../../classes/Element";
import {
  HIGHLIGHT_BORDER_COLOR,
  HIGHLIGHT_ELEMENT_BORDER_COLOR,
  HIGHLIGHT_STROKE_TEXT_SIZE,
} from "../../constants/styles";

export type TextProps = Element & {
  text: string;
};

export type Props = {
  key?: number;
  isLayerSelected: boolean;
  onSetText: any;
  shapeProps: TextProps;
  isSelected: boolean;
  onSelect: any;
  onMove: any;
  onTransform: any;
  layerId: number;
};

type State = {
  currentText: string;
  displayTextEditor: boolean;
};

class TextEl extends React.Component<Props, State> {
  shapeRef: React.RefObject<any>;
  trRef: React.RefObject<any>;

  constructor(props: Props) {
    super(props);
    this.shapeRef = React.createRef();
    this.trRef = React.createRef();
  }

  state: State = {
    currentText: this.props.shapeProps.get("text") || "default",
    displayTextEditor: false,
  };

  componentDidMount() {
    this.updateTransformer();
    this.updateText();
  }
  componentDidUpdate() {
    this.updateTransformer();
    this.updateText();
  }

  updateTransformer = () => {
    const { isLayerSelected, isSelected } = this.props;
    if (isLayerSelected && isSelected) {
      // we need to attach transformer manually
      this.trRef.current.setNode(this.shapeRef.current);
      this.trRef.current.getLayer().batchDraw();
    }
  };

  updateText = () => {
    // applyCache
    this.shapeRef.current.cache();
    this.shapeRef.current.getLayer().batchDraw();
  };

  // inspired from https://konvajs.org/docs/sandbox/Editable_Text.html
  // this function uses a inner letiable text to save the text during edition
  // state cannot be used since it is not really updated in the created textarea
  editText = () => {
    const { currentText } = this.state;
    const { layerId, shapeProps, onSetText } = this.props;
    let text = currentText;

    const textNode = this.shapeRef.current;

    this.setState({ displayTextEditor: true });

    // compute text position for textarea
    const textPosition = textNode.absolutePosition();
    const areaPosition = {
      x: textPosition.x,
      y: textPosition.y,
    };

    // create textarea and style it
    const textarea = document.createElement("textarea");
    textarea.id = "textareaTextEditor";
    document.body.appendChild(textarea);
    textarea.value = currentText;
    textarea.style.top = areaPosition.y + "px";
    textarea.style.left = areaPosition.x + "px";
    textarea.style.width = textNode.width() - textNode.padding() * 2 + "px";
    textarea.style.height =
      textNode.height() - textNode.padding() * 2 + 5 + "px";
    textarea.style.fontSize = textNode.fontSize() + "px";
    textarea.style.lineHeight = textNode.lineHeight();
    textarea.style.fontFamily = textNode.fontFamily();
    textarea.style.textAlign = textNode.align();
    textarea.style.color = textNode.fill();
    const rotation = textNode.rotation();
    let transform = rotation ? "rotateZ(" + rotation + "deg) " : "";

    let px = 0;
    // need to slightly move textarea on firefox
    const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
    if (isFirefox) {
      px += 2 + Math.round(textNode.fontSize() / 20);
    }
    transform += "translateY(-" + px + "px)";

    textarea.style.transform = transform;

    // after browsers resized it we can set actual value
    textarea.style.height = textarea.scrollHeight + 3 + "px";

    textarea.focus();

    const removeTextarea = () => {
      const parentNode = textarea.parentNode;
      if (parentNode) {
        parentNode.removeChild(textarea);
      }
    };

    const endEdition = (text?: string) => {
      if (text) {
        onSetText({ text, id: shapeProps.get("id"), layerId });
      }
      removeTextarea();
      this.setState({ displayTextEditor: false });
    };

    const handleOutsideClick = (e: MouseEvent) => {
      if (e.target !== textarea) {
        endEdition(text);
      }
      window.removeEventListener("click", handleOutsideClick);
    };

    const setTextareaWidth = (newWidth: number) => {
      if (!newWidth) {
        // set width for placeholder
        newWidth = textNode.placeholder.length * textNode.fontSize();
      }
      // some extra fixes on different browsers
      const isSafari = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent
      );
      const isFirefox =
        navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
      if (isSafari || isFirefox) {
        newWidth = Math.ceil(newWidth);
      }

      textarea.style.width = newWidth + "px";
    };

    textarea.addEventListener("keyup", (e: KeyboardEvent) => {
      // on esc do not set value back to node
      if (e.keyCode === 27) {
        endEdition();
        return;
      }

      let value = "";
      if (e.target) {
        const target = e.target as HTMLTextAreaElement;
        value = target.value;
      }

      // update state and inner letiable text
      this.setState({ currentText: value });
      text = value;

      // hide on enter
      // but don't hide on shift + enter
      if (e.keyCode === 13 && !e.shiftKey) {
        endEdition(text);
      }
    });

    textarea.addEventListener("keydown", function () {
      const scale = textNode.getAbsoluteScale().x;
      setTextareaWidth(textNode.width() * scale);
      textarea.style.height =
        textarea.scrollHeight + textNode.fontSize() + "px";
    });

    // allow quit edition on window click, setTimeout to avoid quitting right away
    setTimeout(() => {
      window.addEventListener("click", handleOutsideClick);
    });
  };

  render() {
    const {
      isLayerSelected,
      isSelected,
      shapeProps,
      onMove,
      onTransform,
      onSelect,
    } = this.props;
    const { displayTextEditor, currentText } = this.state;

    const filters = [];
    if (!isLayerSelected) {
      filters.push(Konva.Filters.Grayscale);
    }

    const stylesProps = {
      stroke: (() => {
        if (isSelected) {
          return HIGHLIGHT_ELEMENT_BORDER_COLOR;
        }
        if (isLayerSelected) {
          return HIGHLIGHT_BORDER_COLOR;
        }

        return undefined;
      })(),
      strokeWidth:
        isSelected || isLayerSelected ? HIGHLIGHT_STROKE_TEXT_SIZE : 0,
      filters,
    };

    return (
      <React.Fragment>
        <Text
          opacity={displayTextEditor ? 0 : 1}
          text={currentText}
          onMouseEnter={() => {
            document.body.style.cursor = "pointer";
          }}
          onMouseLeave={() => {
            document.body.style.cursor = "default";
          }}
          onClick={onSelect}
          onTap={onSelect}
          ref={this.shapeRef}
          {...shapeProps.toJS()}
          {...stylesProps}
          draggable={isLayerSelected}
          onDragEnd={(e) => {
            onMove({
              x: e.target.x(),
              y: e.target.y(),
              id: shapeProps.get("id"),
            });
          }}
          onDblClick={this.editText}
          onTransformEnd={() => {
            // transformer is changing scale of the node
            // and NOT its width or height
            // but in the store we have only width and height
            // to match the data better we will reset scale on transform end
            const node = this.shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            // we will reset it back
            node.scaleX(1);
            node.scaleY(1);
            onTransform({
              ...shapeProps.toJS(),
              x: node.x(),
              y: node.y(),
              // set minimal value
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
              rotation: node.rotation(),
            });
          }}
        />
        {isLayerSelected && isSelected && (
          <Transformer
            ref={this.trRef}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              newBox.width = Math.max(30, newBox.width);
              return newBox;
            }}
            enabledAnchors={["middle-left", "middle-right"]}
          />
        )}
      </React.Fragment>
    );
  }
}

export default TextEl;
