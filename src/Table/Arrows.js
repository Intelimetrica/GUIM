import React, { Component, Fragment } from "react";
import isEmpty from 'lodash/isEmpty';

import "./styles.scss";

export class Arrows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrowUp: false,
      arrowDown: false
    };
  }

  render() {
    let arrowUp = false;
    let arrowDown = false;
    if(this.props.active){
      arrowUp = this.props.order === 'asc';
      arrowDown = this.props.order === 'desc';
    }
    return (
      <div className='arrowContainer'>
        <span role="img" aria-label="caret-up" className={`sorter sorter-up ${arrowUp ? 'active' : ''}`}>
          <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-up" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z">
          </path>
          </svg>
        </span>
        <span role="img" aria-label="caret-down" className={`sorter sorter-down ${arrowDown ? 'active' : ''}`}>
          <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
            <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z">
            </path>
          </svg>
        </span>
      </div>
    );
  }
}

export default Arrows;