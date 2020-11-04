import React from "react";
import "./styles.scss";

const Checkbox = props => {
  const id = `switch-${props.id || Math.random()}`;
  const check = (
    <input
      id={id}
      className={props.isSwitch ?`Switch ${themesSwitch[props.color] || themesSwitch["blue"]}` : `GUIMCheckbox ${props.className} ${themes[props.color] || themes["blue"]}`}
      style={props.styles}
      type="checkbox"
      name={props.name}
      onChange={() => props.disabled ? null : props.onChange()}
      checked={props.checked}
      disabled={props.disabled}
    />
  );
  return props.isSwitch ? (
    <div className={`GUIMSwitch ${props.checked ? 'Checked' : ''}`}>
      {check}
      <label htmlFor={id}>.</label>
    </div>
    ) : (
      check
    )
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
  id: null // An unique id is required to work, if isn't set by props, is going to take one randomly
};

const themes = {
  blue: "GUIMCheckboxBlue",
  gray: "GUIMCheckboxGray",
  green: "GUIMCheckboxGreen",
  orange: "GUIMCheckboxOrange"
};

const themesSwitch = {
  blue: "GUIMSwitchBlue",
  gray: "GUIMSwitchGray",
  green: "GUIMSwitchGreen",
  orange: "GUIMSwitchOrange"
};

export default Checkbox;
