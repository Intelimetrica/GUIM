import React from "react";
import "./styles.scss";

const Checkbox = props => {
  let id = null;
  if (props.id != "notIdSet"){
    id = props.id;
  } else {
    id = Math.random();
  }
  const check = (
    <input
      id={`switch-${id}`}
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
      <label htmlFor={`switch-${id}`}>.</label>
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
  id: 'notidset'
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
