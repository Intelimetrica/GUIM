import React, { Component } from "react";

import Table from '../Table/Table';

import "./styles.scss";

class TableTree extends Component {
  constructor(props) {
    super(props);
    const treeSize = this.props.headers[this.props.headers.length-1].length;
    this.state = {
      data: this._formatDataTable(this.props.body, treeSize),
      treeSize
    };
    this._formatDataTable = this._formatDataTable.bind(this);
    this._pushDataTable = this._pushDataTable.bind(this);
    this._expandCollapse = this._expandCollapse.bind(this);
    this._update =this._update.bind(this);
  }

  _formatDataTable(body, treeSize) {
    const newstate = [];
    this._pushDataTable(body[0], 0,newstate, treeSize);
    return newstate;
  }

  _pushDataTable(body, index, newstate, treeSize) {
    const base = new Array(treeSize).fill('');
    if (body.childs.length > 0 ) {
      base[index] = [<div className='ClickContainer' onClick={() => this._expandCollapse(body.id)}><div className='Sign'>{body.expand ? '-' : '+'}</div>{body.label}</div>];
    }
    else {
      base[index] = body.label;
    }
    newstate.push(base);
    if (body.childs.length > 0 && body.expand) {
      body.childs.map((child, i) => this._pushDataTable(child, index+1, newstate, treeSize));
    }
  }

  _expandCollapse(id) {
    const { body } = this.props;
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
      label: '1',
      childs: [
        {
          id: '65ert56',
          label: '2',
          childs: [
            {
              id: '6erger',
              label: '3',
              childs: [
                {
                  id: '6ergweter',
                  label: '8',
                  childs: [
                    {
                      label: '9',
                      childs: []
                    },
                    {
                      label: '10',
                      childs: []
                    }
                  ]
                },
                {
                  label: '11',
                  childs: []
                },
                {
                  label: '12',
                  childs: []
                },
                {
                  label: '13',
                  childs: []
                }
              ]
            }
          ]
        },
        {
          id: '656654756',
          label: '4',
          childs: [
            {
              id: '6ergretgr',
              label: '5',
              childs: [
                {
                  label: '6',
                  childs: []
                },
                {
                  label: '7',
                  childs: []
                }
              ]
            },
            {
              id: '6erttgr',
              label: '14',
              childs: [
                {
                  label: '15',
                  childs: []
                },
                {
                  label: '16',
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
