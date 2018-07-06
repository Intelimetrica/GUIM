import React from 'react';
import './styles.scss';

const Pill = props => (
  <a
    onClick={props.select}
    className={props.active ? 'active' : ''}
    key={props.value}
  >
    {props.label}
  </a>
);

const Picker = props => (
  <div
    name={props.name}
    className={`GUIMPicker ${props.className} ${themes[props.color] || themes.blue}`}
  >
    {
      props.options.map(e =>
        (<Pill
          key={e.value}
          select={props.onChange.bind(null, e.label, e.value)}
          active={props.active.indexOf(e.value) !== -1}
          value={e.value}
          label={e.label}
        />))
    }
  </div>
);

Picker.defaultProps = {
  name: 'picker',
  onChange: (label, value) => console.log(`Picker:active => label: ${label}, value: ${value}`),
  options: [
    { label: 'Uno', value: 1 },
    { label: 'Dos', value: 2 },
  ],
  className: '',
  color: 'blue',
  guimInput: 'picker',
  active: [1],
};

const themes = {
  blue: 'GUIMPickerBlue',
  gray: 'GUIMPickerGray',
  green: 'GUIMPickerGreen',
};

export default Picker;
