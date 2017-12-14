import React, { Component } from "react";
import "./styles.scss";

const Pill = props => (
  <a
    onClick={props.select}
    className={props.active ? "active" : ""}
    key={props.value}>
    {props.label}
  </a>
);

const Picker = props => (
  <div
    name={props.name}
    className={props.className} >
    {
      props.options.map(e =>
        <Pill
          key={e.value}
          select={props.onChange.bind(null, e.label, e.value)}
          active={props.active === e.value}
          value={e.value}
          label={e.label}
        />
      )
    }
  </div>
)

Picker.defaultProps = {
  name: "picker",
  onChange: (label, value) => console.log(`Picker:active => label: ${label}, value: ${value}`),
  options: [
    {label: "Uno", value: 1},
    {label: "Dos", value: 2}
  ],
  className: "GUIMPicker",
  guimInput: "picker",
  active: 1
};

export default Picker;
