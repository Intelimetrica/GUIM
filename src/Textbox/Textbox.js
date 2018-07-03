import React from "react";
import "./styles.scss";

const Textbox = props => (
  <input
    className={`GUIMTextbox ${props.chassName} ${themes[props.color] || themes["blue"]}`}
    style={props.styles}
    type="text"
    name={props.name}
    onChange={props.onChange}
    onBlur={props.onBlur}
    onFocus={props.onFocus}
    value={props.value}
  />
);

Textbox.defaultProps = {
  name: "textbox",
  onChange: () => console.log("Textbox onChange()"),
  onBlur: () => console.log("Textbox onBlur()"),
  onFocus: () => console.log("Textbox onFocus()"),
  value: "",
  styles: {},
  className: "",
  color: "blue",
  guimInput: "textbox"
};

const themes = {
  blue: "GUIMCheckboxBlue",
  gray: "GUIMCheckboxGray",
  green: "GUIMCheckboxGreen"
};

export default Textbox;
