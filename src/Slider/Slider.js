import React, { Component, Fragment } from 'react';
import './styles.scss';

export const Bar = (props) => {
  let position = 'left';
  if (props.inner) position = 'inner';
  if (props.right) position = 'right';

  return (
    <div
      style={{ width: props.width }}
      className={`bar ${position}`}
    />
  );
};

export const Handler = props => (
  <Fragment>
    <div
      draggable
      className="handler"
      style={{ left: props.position }}
      onDrag={e => props.onDrag(e.clientX, props.min)}
      onDragStart={(e) => { // this is to hide the element been dragged
        const a = document.createElement('div');
        document.body.appendChild(a);
        e.dataTransfer.setDragImage(a, 0, 0);
      }}
    />
    <span
      style={{ left: props.position }}
      className="handler-label"
    >{props.formatter(props.value)}
    </span>
  </Fragment>
);

const setPointInsideRange = (current, lower, upper) => {
  let new_position;

  if (current > lower && current < upper) {
    new_position = current;
  } else if (current <= lower) {
    new_position = lower;
  } else if (current >= upper) {
    new_position = upper;
  }
  return new_position;
};

const hasCarriage = (position, is_min, { min, max }) => {
  if (is_min) {
    if (position >= max) return true;
  } else if (position <= min) return true;
  return false;
};

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 10,
      start: 0,
      end: 10,
      steps: this.props.steps.map(e => e.toFixed(this.props.floating_points)),
    };

    this._onDrag = this._onDrag.bind(this);
  }

  _onDrag(clientX, is_min) {
    if (clientX <= 0) return false;

    // Force position in pixels to be inside slider
    const { start, width, steps } = this.state;
    const { range, selected_range, floating_points } = this.props;
    let new_position = setPointInsideRange(clientX - start, 0, width);

    // Scale pixels into a point inside range
    new_position = ((range.max * new_position) / width);

    // Carriage - min cant be bigger than max, neither the other way
    const carriage = hasCarriage(new_position, is_min, selected_range);
    new_position = new_position.toFixed(floating_points);

    // create new range
    const new_range = { ...selected_range };
    new_range[(is_min) ? 'min' : 'max'] = new_position;
    if (carriage) { // add carriage to new range
      new_range[(is_min) ? 'max' : 'min'] = new_position;
    }

    if (steps.includes(new_position)) {
      this.props.onChange(new_range);
    }
  }

  componentDidMount() {
    this.slider = document.getElementById(this.props.id);
    const { left, right, width } = this.slider.getBoundingClientRect();

    this.setState({ width, start: left, end: right });
  }

  render() {
    const {
      range, id, steps, label_formatter,
    } = this.props;
    const { min, max } = this.props.selected_range;

    const left_bar_width = (min * this.state.width) / range.max;
    const inner_bar_width = ((max - min) * this.state.width) / range.max;
    const right_bar_width = ((range.max - max) * this.state.width) / range.max;

    return (
      <div id={id} className={`GUIMSlider ${this.props.className} ${themes[this.props.theme] || themes.green}`}>
        <Bar width={left_bar_width} left />
        <Bar width={inner_bar_width} inner />
        <Bar width={right_bar_width} right />
        <Handler
          onDrag={this._onDrag}
          position={left_bar_width - 5}
          value={min}
          formatter={label_formatter}
          min
        />
        <Handler
          onDrag={this._onDrag}
          position={left_bar_width + inner_bar_width - 5}
          value={max}
          formatter={label_formatter}
          max
        />
      </div>
    );
  }
}

Slider.defaultProps = {
  id: 'slider',
  name: 'slider',
  onChange: new_range => console.log('onChange', new_range),
  range: {
    min: 0,
    max: 1,
  },
  selected_range: {
    min: 0.2,
    max: 0.6,
  },
  label_formatter: e => `${e}%`,
  steps: [0, 0.2, 0.4, 0.6, 0.8, 1],
  floating_points: 2,
  guimInput: 'slider',
  className: '',
  theme: 'blue',
};

const themes = {
  blue: 'GUIMSliderBlue',
  gray: 'GUIMSliderGray',
  green: 'GUIMSliderGreen',
};

export default Slider;
