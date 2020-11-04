import React from "react";
import "./styles.scss";

const Checkbox = props => {
  const check = (
    <input
      id={`switch${props.id}`}
      className={`GUIMCheckbox ${props.className} ${themes[props.color] || themes["blue"]}`}
      style={props.styles}
      type="checkbox"
      name={props.name}
      onChange={() => props.disabled ? null : props.onChange()}
      checked={props.checked}
      disabled={props.disabled}
    />
  );
  return props.isSwitch ? (
    <div className='GUIMSwitch'>
      {check}
      <label htmlFor={`switch${props.id}`}>.</label>
    </div>
    ) : (check)
};

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
