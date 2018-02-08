import React from "react";
import "./styles.scss";

const Bar = props => {
  let position = "left";

  if (props.inner) position = "inner";
  if (props.right) position = "right";

  return (
    <div
      style={{width: props.width, height: 10}}
      className={`bar ${position}`}
    />
  );
}
const Slider = props => {
  return (
    <div className="GUIMSlider">
      <Bar width={45} left />
      <Bar width={50} inner />
      <Bar width={5} right />
      hey
    </div>
  );
}
Slider.defaultProps = {
  name: "slider",
  onChange: () => console.log("onChange"),
  range: {
    min: 0,
    max: 1
  },
  selected_range: {
    min: 0.25,
    max: 0.75
  },
  guimInput: "slider"
};

const themes = {};

export default Slider;
