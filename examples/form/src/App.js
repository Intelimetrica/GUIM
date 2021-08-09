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
  Textbox,
  TableTree,
  Paginator
} from "guim";
import logo from './logo.svg';
import mas from './mas.svg';
import menos from './menos.svg';

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

const headerTableTree = [
  [
    {
      text: 'Root'
    },
    {
      text: 'Branch 1'
    },
    {
      text: 'Branch 2'
    },
    {
      text: 'Branch 3'
    },
    {
      text: 'Branch 4'
    }
  ]
];

const bodyTableTree = [
  {
    id: '654756',
    text: '1',
    childs: [
      {
        id: '65ert56',
        text: '2',
        childs: [
          {
            id: '6erger',
            text: '3',
            childs: [
              {
                id: '6ergweter',
                text: '8',
                childs: [
                  {
                    text: '9',
                    childs: []
                  },
                  {
                    text: '10',
                    childs: []
                  }
                ]
              },
              {
                text: '11',
                childs: []
              },
              {
                text: '12',
                childs: []
              },
              {
                text: '13',
                childs: []
              }
            ]
          }
        ]
      },
      {
        id: '656654756',
        text: '4',
        childs: [
          {
            id: '6ergretgr',
            text: '5',
            childs: [
              {
                text: '6',
                childs: []
              },
              {
                text: '7',
                childs: []
              }
            ]
          },
          {
            id: '6erttgr',
            text: '14',
            childs: [
              {
                text: '15',
                childs: []
              },
              {
                text: '16',
                childs: []
              }
            ]
          }
        ]
      }
    ]
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      checked2: true,
      checked3: true,
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
      tableOrder: [],
      idOrder: [],
      meta:  {
        limit: 13,
        offset: 0,
        total: 130
      }
    };
    this.clickButton = this.clickButton.bind(this);
    this.onChangeCheckbox1 = this.onChangeCheckbox1.bind(this);
    this.onChangeCheckbox2 = this.onChangeCheckbox2.bind(this);
    this.onChangeCheckbox3 = this.onChangeCheckbox3.bind(this);
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

  onChangeCheckbox3(_event) {
    this.setState({ checked3: !this.state.checked3 });
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

  handleClickHeader(order) {
    let finalIdOrder = this.state.idOrder;
    let newOrder = this.state.tableOrder;
      if (!this.state.idOrder.includes(order.id)) {
        finalIdOrder.push(order.id);
        newOrder.push('asc');
      } else {
        if (newOrder[order.index] === 'asc') {
          newOrder[order.index] = 'desc';
        } else {
          const removeIndex = this.state.idOrder.indexOf(order.id);
          finalIdOrder = this.state.idOrder.filter((v) => v !== order.id);
          newOrder.splice(removeIndex, 1);
        }
      }
    this.setState({
      idOrder: finalIdOrder,
      tableOrder: newOrder
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
                onBlur={() => {}}
                onFocus={() => {}}
                value={this.state.textbox} />
            </div>
            <div>
              <span>Click me to change this checkbox</span>
              <Checkbox
                name="checked"
                color="orange"
                isSwitch
                checked={this.state.checked}
                onChange={this.onChangeCheckbox1} />
            </div>
            <div  style={{ display: "flex", justifyContent:"start" }}>
              <Checkbox
              name="checked"
              color="blue"
              isSwitch
              checked={this.state.checked3}
              onChange={this.onChangeCheckbox3} />
              <span>Click</span>
            </div>
            <div>
              <span>Click me to change this checkbox</span>
              <Checkbox
                name="checkbox2"
                color="orange"
                checked={this.state.checked2}
                onChange={this.onChangeCheckbox2} />
            </div>
            <div>
              <span>Disabled checkbox</span>
              <Checkbox
                name="checkbox3"
                color="blue"
                checked={true}
                disabled />
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
          <Paginator
            meta={this.state.meta}
            onUpdate={data => this.setState({ meta: data })}
            />
        </div>
        <div className="form">
          <TableTree
            striped
            header={headerTableTree}
            body={bodyTableTree}
            sticky_header={{
              active:true,
              top:40
            }}
            icons={{
              expand: <img src={mas} width="10px" alt="expand" />,
              collapse: <img src={menos} width="10px" alt="collapse" />
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
