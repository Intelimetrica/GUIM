import React, { Component } from "react";
import "./styles.scss";

const Bar = props => {
  let position = "left";

  if (props.inner) position = "inner";
  if (props.right) position = "right";

  // Variable: width
  return (
    <div
      style={{width: props.width, height: 10}}
      className={`bar ${position}`}
    />
  );
};

const Handler = props => {
  const { min } = props;

  // Variable left-position
  return (
    <div
      draggable={true}
      style={{width: 10, height: 10, left: props.position}}
      onDrag={(e) => props.onDrag(e.clientX, min)}
      onDragEnter={e => console.log(e, "Drag enter!!")}
      onDragStart={e => console.log(e, "Drag start!!")}
      onClick={e => console.log(e, "onClick")}
      className={`handler`}
    />
  );
};

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 10,
      start: 0,
      end: 10
    };

    this._onDrag = this._onDrag.bind(this);
  }

  _onDrag(clientX, is_min) {
    if (clientX > 0) {
      const current = clientX - this.state.start;
      let new_position;

      if (current > 0 && current < this.state.width) {
        new_position = current; // position in pixels
      } else if (current <= 0) {
        new_position = 0;
      } else if (current >= this.state.width) {
        new_position = this.state.width;
      }

      // convert pixels into a point inside range
      new_position = (this.props.range.max * new_position)/this.state.width;

      // what if min is bigger than max?
      // what if max is smaller than min
      let {min, max} = this.props.selected_range;
      let flag = false;
      if (is_min) {
        if (new_position >= max) {
          flag = true;
        }
      } else {
        if (new_position <= min) {
          flag = true;
        }
      }


      // create new range
      let new_range = {...this.props.selected_range};
      new_range[(is_min) ? "min" : "max"] = new_position.toFixed(2);
      if (flag) {
        new_range[(is_min) ? "max" : "min"] = new_position.toFixed(2)
      }
      this.props.onChange(new_range);
    }
  }

  componentDidMount() {
    this.slider = document.getElementById(this.props.id);
    const {left, right, width} = this.slider.getBoundingClientRect();

    this.setState({ width, start: left, end: right });
  }

  render () {
    const { range, id } = this.props;
    const { min, max } = this.props.selected_range;

    const left_bar_width = (min * this.state.width)/range.max;
    const inner_bar_width = ((max - min) * this.state.width)/range.max;
    const right_bar_width = ((range.max - max) * this.state.width)/range.max;

    return (
      <div id={id} className="GUIMSlider">
        <Bar width={left_bar_width} left />
        <Bar width={inner_bar_width} inner />
        <Bar width={right_bar_width} right />
        <Handler
          onDrag={this._onDrag}
          position={left_bar_width - 5}
          min />
        <Handler
          onDrag={this._onDrag}
          position={left_bar_width + inner_bar_width - 5}
          max />
      </div>
    );
  }
}
Slider.defaultProps = {
  id: "slider",
  name: "slider",
  onChange: () => console.log("onChange"),
  range: {
    min: 0,
    max: 1
  },
  selected_range: {
    min: 0.25,
    max: 0.75
  },
  guimInput: "slider"
};

const themes = {};

export default Slider;
