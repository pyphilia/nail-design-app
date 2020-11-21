import React, { Component } from "react";
import { Line } from "react-konva";

type Props = {
  x: number;
  y: number;
  rotation: number;
  tension: number;
  width: number;
  length:number;
  fill: string
};

class Nail extends Component<Props> {
  render() {
    const { x, y, rotation, tension, width, length, fill } = this.props;
    return (
      <Line
        x={x}
        y={y}
        rotation={rotation}
        points={[0, 0, width, 0, width, length, 0, length]}
        tension={tension}
        closed
        stroke="black"
        fill={fill}
      />
    );
  }
}

export default Nail;
