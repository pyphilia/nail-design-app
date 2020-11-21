import React from "react";
import Image from "react-bootstrap/Image";
import arrowDown from "../../images/arrowDown.svg";
import arrowRight from "../../images/arrowRight.svg";

type Props = {
  open: boolean;
  handleOnClick: any;
  id: string;
};

const HideShowButton = ({ open, handleOnClick, id }: Props) => {
  const src = open ? arrowDown : arrowRight;

  return (
    <Image
      src={src}
      width={20}
      onClick={handleOnClick}
      aria-controls={id}
      aria-expanded={open}
    />
  );
};

export default HideShowButton;
