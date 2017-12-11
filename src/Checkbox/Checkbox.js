import React from 'react';
import './styles.scss';

const Checkbox = props => (
  <input
    className={props.className}
    style={props.styles}
    type="checkbox"
    name={props.name}
    onChange={props.onChange}
    checked={props.checked} />
);

Checkbox.defaultProps = {
  name: 'checkbox',
  onChange: () => console.log('Checkbox onChange()'),
  checked: false,
  styles: {},
  className: 'GUIMCheckbox',
  guimInput: 'checkbox'
};

export default Checkbox;
