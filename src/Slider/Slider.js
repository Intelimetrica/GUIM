import React from "react";
import "./styles.scss";

const Slider = props => {
  return (
    <div>Slider</div>
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
