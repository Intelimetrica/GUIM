import React from "react";
import "./styles.scss";

const Checkbox = props => ( props.isSwitch ? (
  <div className={props.isSwitch ? 'GUIMSwitch' : null}>
    <input
      id={`switch${props.id}`}
      className={`GUIMCheckbox  ${props.className} ${themes[props.color] || themes["blue"]}`}
      style={props.styles}
      type="checkbox"
      name={props.name}
      onChange={() => props.disabled ? null : props.onChange()}
      checked={props.checked}
      disabled={props.disabled}
    />
     <label htmlFor={`switch${props.id}`}>.</label>
      
  </div>
) : (
  <input
      id={`switch${props.id}`}
      className={`GUIMCheckbox  ${props.className} ${themes[props.color] || themes["blue"]}`}
      style={props.styles}
      type="checkbox"
      name={props.name}
      onChange={() => props.disabled ? null : props.onChange()}
      checked={props.checked}
      disabled={props.disabled}
    />
)
);

Checkbox.defaultProps = {
  name: "checkbox",
  onChange: () => console.log("Checkbox onChange()"),
  checked: false,
  styles: {},
  className: "",
  color: "blue",
  guimInput: "checkbox",
  disabled: false,
  isSwitch: false,
  id: Math.random() * 100
};

const themes = {
  blue: "GUIMCheckboxBlue",
  gray: "GUIMCheckboxGray",
  green: "GUIMCheckboxGreen",
  orange: "GUIMCheckboxOrange"
};

export default Checkbox;
