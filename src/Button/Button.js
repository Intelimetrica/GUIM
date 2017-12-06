import React from 'react';
import './styles.scss';

const Button = props => (
  <a
    onClick={props.onClick}
    className={`GUIMButton ${props.className} ${themes[props.color] || themes['blue']}`}>
    {props.label}
  </a>
);

Button.defaultProps = {
  label: 'Click me',
  onClick: () => console.log('Click on button'),
  className: '',
  color: 'blue'
};

const themes = {
  blue: 'GUIMButtonBlue',
  gray: 'GUIMButtonGRAY'
};

export default Button;
