import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  { Checkbox, Picker, Button } from 'guim';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      active: 1
    };
  }

  onChange() {
    console.log('onChange', !this.state.checked)
    this.setState({checked: !this.state.checked});
  }

  render() {
    return (
      <div className="App" style={{padding: "30px"}}>
        <span>Clik me</span>
        <Button
          onClick={() => alert('blue')}
          label="button" />
         <Button
          onClick={() => alert('gray')}
          color='gray'
          label="button" />
       <Button
          onClick={() => alert('green')}
          color='green'
          label="button" />
        <Checkbox
          name="checkbox"
          checked={this.state.checked}
          onChange={this.onChange.bind(this)} />
        <Picker
          onChange={(label, value) => {this.setState({active: value})}}
          options={[
            {label: 'Uno', value: 1},
            {label: 'Dos', value: 2},
            {label: 'Tres', value: 3},
          ]}
          active={this.state.active}
        />
      </div>
    );
  }
}

export default App;
