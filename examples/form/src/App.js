import React, { Component } from 'react';
import './App.css';
import {
  Form,
  Checkbox,
  Button
} from 'guim';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {checked: false};
  }

  onChange() {
    console.log('onChange', !this.state.checked)
    this.setState({checked: !this.state.checked});
  }

  render() {
    return (
      <div className="App">
        <Form>
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
        </Form>
      </div>
    );
  }
}

export default App;
