import React, { Component } from "react";

import Table from '../Table/Table';

import "./styles.scss";

let NEWSTATE = [];

class TableTree extends Component {
  constructor(props) {
    super(props);
    const treeSize = this.props.headers[this.props.headers.length-1].length;
    const body = this.props.body;
    this.state = {
      data: this._formatDataTable(body, treeSize),
      treeSize
    };
    this._formatDataTable = this._formatDataTable.bind(this);
    this._pushDataTable = this._pushDataTable.bind(this);
    this._expandCollapse = this._expandCollapse.bind(this);
    this._update =this._update.bind(this);
  }

  _formatDataTable(body, treeSize) {
    NEWSTATE = [];
    this._pushDataTable(body[0], 0, NEWSTATE, treeSize);
    return NEWSTATE;
  }

  _pushDataTable(body, index, NEWSTATE, treeSize) {
    const base = new Array(treeSize).fill('');
    if (body.childs.length > 0 ) {
      base[index] = [<div key={`${body.id}-${index}`} className='ClickContainer' onClick={() => this._expandCollapse(body.id)}><div className='Sign'>{body.expand ? '-' : '+'}</div>{body.text}</div>];
    }
    else {
      base[index] = body.text;
    }
    NEWSTATE.push(base);
    if (body.childs.length > 0 && body.expand) {
      body.childs.map((child, i) => this._pushDataTable(child, index+1, NEWSTATE, treeSize));
    }
  }

  _expandCollapse(id) {
    const body = this.props.body;
    this._update(body[0],id);
    this.setState({
      data: this._formatDataTable(body, this.state.treeSize)
    })
  }

  _update(body,id){
    if (body.id === id){
      body.expand = !body.expand;
      return;
    }
    if (body.childs.length > 0 ) {
      body.childs.map((child, i) => this._update(child, id));
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.body !== prevProps.body) {
      const treeSize = this.props.headers[this.props.headers.length-1].length;
      const body = this.props.body;
      this.setState({
        data: this._formatDataTable(body, treeSize)
      });
    }
  }


  render() {
    return <Table {...this.props} headers={this.props.headers} body={this.state.data} />
  }
}

TableTree.defaultProps = {
  headers: [
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
        text: 'Branch'
      },
      {
        text: 'Branch'
      }
    ]
  ],
  body: [
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
  ]
};

export default TableTree;
