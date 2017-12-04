import React, { Component } from 'react';

const Checkbox = props => (
  <input
    type="checkbox"
    name={props.name}
    onChange={props.onChange}
    checked={props.checked} />
);

export default Checkbox;
