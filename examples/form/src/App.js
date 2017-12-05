import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Checkbox from 'guim';

console.log('Checkbox', Checkbox)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {checked: false};
  }

  onChange() {
    this.setState({checked: !this.state.checked});
  }

  render() {
    return (
      <div className="App">
        <Checkbox name="checkbox" checked={this.state.checked} onChange={this.onChange.bind(this)} />
      </div>
    );
  }
}

export default App;
