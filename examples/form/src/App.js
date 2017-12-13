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
        <div className='form'>
          <span>{"<Form>"}</span>
            <Form>
              <div>
                <span>Clik me to show alert</span>
                <Button
                  onClick={() => alert('blue')}
                  label="button" />
              </div>
              <div>
                <span>I do nothing, I'm just gray</span>
                <Button
                  onClick={() => console.log('doin nothing')}
                  color='gray'
                  label="button" />
              </div>
              <div>
                <span>Clik me to change checkbox</span>
                <Button
                  onClick={this.onChange.bind(this)}
                  color='green'
                  label="button" />
              </div>
              <div>
                <span>Clik me change checkbox</span>
                <Checkbox
                  name="checkbox"
                  checked={this.state.checked}
                  onChange={this.onChange.bind(this)} />
              </div>
            </Form>
            <span>{"</Form>"}</span>
        </div>
        <div className='outside-form'>
          <div>
            <span>I'm outside the form</span>
            <Button
              onClick={this.onChange.bind(this)}
              color='green'
              label="button" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
