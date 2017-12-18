import React from "react";
import "./styles.scss";

const Checkbox = props => (
  <input
    className={`GUIMCheckbox ${props.className} ${themes[props.color] || themes["blue"]}`}
    style={props.styles}
    type="checkbox"
    name={props.name}
    onChange={props.onChange}
    checked={props.checked} />
);

Checkbox.defaultProps = {
  name: "checkbox",
  onChange: () => console.log("Checkbox onChange()"),
  checked: false,
  styles: {},
  className: "",
  color: "blue",
  guimInput: "checkbox"
};

const themes = {
  blue: "GUIMCheckboxBlue",
  gray: "GUIMCheckboxGray",
  green: "GUIMCheckboxGreen"
};

export default Checkbox;
