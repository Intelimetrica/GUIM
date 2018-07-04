import React, { Component } from "react";
import "./App.css";
import {
  Button,
  Checkbox,
  Form,
  Navbar,
  Picker,
  Slider,
  Table,
  Textbox
} from "guim";
import logo from './logo.svg';

const numberOfSteps = 21;
const range = 0.05;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      checked2: true,
      formData: {},
      picker_active: [2],
      multiple_picker_active: [2],
      highlighted: -1,
      selected_range: {
        min: 0.25,
        max: 0.75
      },
      steps: new Array(numberOfSteps).fill().map((e,i) => i * range),
      textbox: ''
    };
    this.clickButton = this.clickButton.bind(this);
    this.onChangeCheckbox1 = this.onChangeCheckbox1.bind(this);
    this.onChangeCheckbox2 = this.onChangeCheckbox2.bind(this);
    this.onChangeTextbox = this.onChangeTextbox.bind(this);
    this.onChangeSinglePicker = this.onChangeSinglePicker.bind(this);
    this.onChangeMultiplePicker = this.onChangeMultiplePicker.bind(this);
    this.onMouseLeaveRow = this.onMouseLeaveRow.bind(this);
    this.onMouseEnterRow = this.onMouseEnterRow.bind(this);
    this.setSliderHandleChange = this.setSliderHandleChange.bind(this);
  }

  // The functions that are called when change directly
  // the textbox or checkbox receive an event as param
  onChangeTextbox(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onChangeCheckbox1(_event) {
    this.setState({ checked: !this.state.checked });
  }

  onChangeCheckbox2(_event) {
    this.setState({ checked2: !this.state.checked2 });
  }

  onChangeSinglePicker(label, value) {
    this.setState({ picker_active: [value] });
  }

  onChangeMultiplePicker(label, value) {
    let actives = this.state.multiple_picker_active;
    if(actives.indexOf(value) !== -1) {
      actives.splice(actives.indexOf(value), 1);
    } else {
      actives.push(value);
    }
    this.setState({ multiple_picker_active: actives });
  }

  clickButton() {
    const formData = this.form.grabFormData();
    this.setState({ formData });
  }

  onMouseEnterRow(i) {
    this.setState({ highlighted: i });
  }

  onMouseLeaveRow() {
    this.setState({ highlighted: -1 });
  }

  setSliderHandleChange(newSelectedRange) {
    this.setState({ selected_range: newSelectedRange });
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div style={{height: "15px"}}></div>
        <div className="form">
          <span>{"<Form>"}</span>
          <Form ref={ref => (this.form = ref)} >
            <div>
              <span>Click me to show alert</span>
              <Button
                onClick={() => alert("blue")}
                color="gray"
                label="Show alert" />
            </div>
            <div>
              <span>Click me to SEND Form</span>
              <Button
                onClick={this.clickButton}
                color="gray"
                label="Send Form" />
            </div>
            <div>
              <span>Click me to change first checkbox</span>
              <Button
                onClick={this.onChangeCheckbox1}
                color="green"
                label="Change first checkbox" />
            </div>
            <div>
              <span>Click me to change this checkbox</span>
              <Textbox
                color="blue"
                name="textbox"
                className='GUIMTextboxSize'
                onChange={this.onChangeTextbox}
                onBlur={() => {}}
                onFocus={() => {}}
                value={this.state.textbox}/>
            </div>
            <div>
              <span>Click me to change this checkbox</span>
              <Checkbox
                name="checked"
                color="green"
                checked={this.state.checked}
                onChange={this.onChangeCheckbox1} />
            </div>
            <div>
              <span>Click me to change this checkbox</span>
              <Checkbox
                name="checkbox2"
                color="blue"
                checked={this.state.checked2}
                onChange={this.onChangeCheckbox2} />
            </div>
            <div>
              <span>A picker</span>
              <Picker
                onChange={this.onChangeSinglePicker}
                color="gray"
                options={[
                  {label: <img src={logo} width="30px"/>, value: 'react'},
                  {label: "Pill 2", value: 2},
                  {label: "Pill 3", value: 3},
                ]}
                active={this.state.picker_active}
              />
            </div>
            <div>
              <span>A multiple picker</span>
              <Picker
                onChange={this.onChangeMultiplePicker}
                color="gray"
                options={[
                  {label: <img src={logo} width="30px"/>, value: 'react'},
                  {label: "Pill 2", value: 2},
                  {label: "Pill 3", value: 3},
                ]}
                active={this.state.multiple_picker_active}
              />
            </div>
            <div>
              <span>A slider</span>
              <Slider
                steps={this.state.steps}
                selected_range={this.state.selected_range}
                onChange={this.setSliderHandleChange}
              />
            </div>
          </Form>
          <span>{"</Form>"}</span>
        </div>
        <div className="outside-form">
          <div>
            <span>{"I'm outside the form and can change form data (imagine using this with url)"}</span>
            <Button
              onClick={this.onChangeCheckbox2}
              color="blue"
              label="Change second checkbox" />
          </div>
          <div>
            <div>data to send: </div>
            <div>{`${JSON.stringify(this.state.formData)}`}</div>
          </div>
        </div>
        <div className="form">
          <Table
            row_mouseEnter={this.onMouseEnterRow}
            row_mouseLeave={this.onMouseLeaveRow}
            row_hovered={this.state.highlighted}
          />
        </div>
      </div>
    );
  }
}

export default App;
