import React, { ReactElement } from "react";
import useImage from "use-image";
import handImage from "../images/Silhouette_hand.svg";
import { Image } from "react-konva";

// the first very simple and recommended way:
const Background = (): ReactElement<any> | null => {
  const [image] = useImage(handImage);
  return (
    <Image
    draggable={false}
      image={image}
      scaleX={1}
      scaleY={1}
    />
  );
};

export default Background;
