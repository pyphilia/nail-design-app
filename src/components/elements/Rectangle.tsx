import React from "react";
import Konva from "konva";
import { Rect, Transformer } from "react-konva";
import Element from "../../classes/Element";
import {
  HIGHLIGHT_BORDER_COLOR,
  HIGHLIGHT_STROKE_SIZE,
  HIGHLIGHT_ELEMENT_BORDER_COLOR,
} from "../../constants/styles";

export type Props = {
  key?: number;
  isLayerSelected: boolean;
  shapeProps: Element;
  isSelected: boolean;
  onSelect: any;
  onMove: any;
  onTransform: any;
};

// <props, state>
const Rectangle = ({
  shapeProps,
  isSelected,
  onSelect,
  onMove,
  onTransform,
  isLayerSelected,
}: Props) => {
  const shapeRef: any = React.useRef();
  const trRef: any = React.useRef();

  React.useEffect(() => {
    if (isLayerSelected && isSelected) {
      // we need to attach transformer manually
      trRef.current.setNode(shapeRef.current);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected, isLayerSelected]);

  React.useEffect(() => {
    // applyCache
    shapeRef.current.cache();
    shapeRef.current.getLayer().batchDraw();
  });

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
    strokeWidth: isSelected || isLayerSelected ? HIGHLIGHT_STROKE_SIZE : 0,
    filters,
  };

  return (
    <React.Fragment>
      <Rect
        onMouseEnter={() => {
          if (isLayerSelected) {
            document.body.style.cursor = "pointer";
          }
        }}
        onMouseLeave={() => {
          document.body.style.cursor = "default";
        }}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
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
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
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
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

export default Rectangle;
