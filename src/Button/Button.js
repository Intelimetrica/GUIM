import React from 'react';
import './styles.scss';

const Button = props => (
  <a
    onClick={props.onClick}
    className={props.className}>
    {props.label}
  </a>
);

Button.defaultProps = {
  label: 'Click me',
  onClick: () => console.log('Click on button'),
  className: 'GUIMButton'
};

export default Button;
