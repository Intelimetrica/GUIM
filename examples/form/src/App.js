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

const header = [
  [
    {
      text: '',
      className: 'border'
    },
    {
      text: 'Name',
      colSpan: 2,
      className: 'border'
    },
    {
      text: 'Data',
      colSpan: 2
    }
  ],
  [
    {
      text: 'Number',
      id: 'Number',
      rowSpan: 3,
      className: 'border',
      sortable: true
    },
    {
      text: 'First Name',
      id: 'First_Name',
      sortable: true
    },
    {
      text: 'Last Name',
      id: 'Last_Name',
      className: 'border',
      sortable: true
    },
    {
      text: 'Email',
      id: 'Email',
      sortable: true
    },
    {
      text: 'Actions',
      id: 'Actions',
      sortable: true
    }
  ]
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      checked2: true,
      formData: {},
      single_picker: [2],
      multiple_picker: [2],
      highlighted: -1,
      selected_range: {
        min: 0.25,
        max: 0.75
      },
      steps: new Array(numberOfSteps).fill().map((e, i) => i * range),
      textbox: '',
      tableOrder: 'asc',
      idOrder: 'Number'
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
    this.handleClickHeader = this.handleClickHeader.bind(this);
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
    this.setState({ single_picker: [value] });
  }

  onChangeMultiplePicker(label, value) {
    let actives = this.state.multiple_picker;
    if (actives.indexOf(value) !== -1) {
      actives.splice(actives.indexOf(value), 1);
    } else {
      actives.push(value);
    }
    this.setState({ multiple_picker: actives });
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

  handleClickHeader(id, orderBy) {
    this.setState({
      idOrder: id,
      tableOrder: orderBy
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div style={{ height: "15px" }}></div>
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
              <span>Type something into the textbox</span>
              <Textbox
                color="blue"
                name="textbox"
                className='GUIMTextboxSize'
                onChange={this.onChangeTextbox}
                onBlur={() => { }}
                onFocus={() => { }}
                value={this.state.textbox} />
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
              <span>A single picker</span>
              <Picker
                name="single_picker"
                onChange={this.onChangeSinglePicker}
                color="gray"
                options={[
                  { label: <img src={logo} width="30px" alt="logo" />, value: 'react' },
                  { label: "Pill 2", value: 2 },
                  { label: "Pill 3", value: 3 },
                ]}
                active={this.state.single_picker}
              />
            </div>
            <div>
              <span>A multiple picker</span>
              <Picker
                name="multiple_picker"
                onChange={this.onChangeMultiplePicker}
                color="gray"
                options={[
                  { label: <img src={logo} width="30px" alt="logo" />, value: 'react' },
                  { label: "Pill 2", value: 2 },
                  { label: "Pill 3", value: 3 },
                ]}
                active={this.state.multiple_picker}
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
            headers={header}
            tableOrder={this.state.tableOrder}
            idOrder={this.state.idOrder}
            handleClickHeader={this.handleClickHeader}
          />
        </div>
      </div>
    );
  }
}

export default App;
