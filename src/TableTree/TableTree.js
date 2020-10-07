import React, { Component } from "react";

import Table from '../Table/Table';

import "./styles.scss";

let NEWSTATE = [];

const cloneArray = data => JSON.parse(JSON.stringify(data));

class TableTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this._formatProps()
    };
    this._formatProps = this._formatProps.bind(this);
    this._formatDataTable = this._formatDataTable.bind(this);
    this._pushDataTable = this._pushDataTable.bind(this);
    this._expandCollapse = this._expandCollapse.bind(this);
    this._update = this._update.bind(this);
  }

  _formatProps() {
    const treeSize = this.props.header[this.props.header.length-1].length;
    const body = cloneArray(this.props.body);
    return {
      bodyFormatted: this._formatDataTable(body, treeSize), 
      body,
      treeSize
    };
  }

  _formatDataTable(body, treeSize) {
    NEWSTATE = [];
    this._pushDataTable(body[0], 0, treeSize);
    return NEWSTATE;
  }

  _pushDataTable(body, index, treeSize) {
    const base = new Array(treeSize).fill('');
    if (body.childs.length > 0 ) {
      base[index] = [<div key={`${body.id}-${index}`} className='ClickContainer' onClick={() => this._expandCollapse(body.id)}><div className='Sign'>{body.expand ? this.props.icons.collapse : this.props.icons.expand}</div>{body.text}</div>];
    }
    else {
      base[index] = body.text;
    }
    NEWSTATE.push(base);
    if (body.childs.length > 0 && body.expand) {
      body.childs.map((child, i) => this._pushDataTable(child, index+1, treeSize));
    }
  }

  _expandCollapse(id) {
    const { body } = this.state;
    this._update(body[0],id);
    this.setState({
      bodyFormatted: this._formatDataTable(body, this.state.treeSize)
    });
  }

  _update(body, id) {
    if (body.id === id) {
      body.expand = !body.expand;
      return;
    }
    if (body.childs.length > 0 ) {
      body.childs.map(child => this._update(child, id));
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.body !== prevProps.body) {
      this.setState({
        ...this._formatProps()
      });
    }
  }

  render() {
    return <Table {...this.props} headers={this.props.header} body={this.state.bodyFormatted} />
  }

}

TableTree.defaultProps = {
  icons: {
    expand: '+',
    collapse: '-'
  },
  header: [
    [
      {
        text: 'Root'
      },
      {
        text: 'Branch 1'
      },
      {
        text: 'Branch 2'
      }
    ]
  ],
  body: [
    {
      id: '1001',
      text: '1',
      childs: [
        {
          id: '2001',
          text: '2',
          childs: [
            {
              id: '3001',
              text: '4',
              childs: []
            },
            {
              id: '3002',
              text: '5',
              childs: []
            }
          ]
        },
        {
          id: '2002',
          text: '3',
          childs: [
            {
              id: '3003',
              text: '6',
              childs: []
            },
            {
              id: '3004',
              text: '7',
              childs: []
            }
          ]
        }
      ]
    }
  ]
};

export default TableTree;
