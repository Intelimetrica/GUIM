import React, { Component, Fragment } from "react";
import isEmpty from 'lodash/isEmpty';

import Table from '../Table/Table';


class TableCollapse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this._createTree(this.props.body)
    };
    this._createTree = this._createTree.bind(this);
    this._drescribeTree = this._drescribeTree.bind(this);
    this._updateExpand =this._updateExpand.bind(this);
    this._find = this._find.bind(this);

  }

  _find(id){
    const { body } = this.props;
    this._updateExpand(body[0],id);
    console.log(body);
    this.setState({
      data: this._createTree(body)
    })
    
  }

  _updateExpand(body,id){
    if (body.id === id){
      console.log('Encontrado'+ body.label);
      body.expand = !body.expand;
      return;
    }
    if (body.childs.length > 0 ) {
      body.childs.map((child, i) => this._updateExpand(child, id));
    }
  }





  _createTree(body){
    const newstate = [];
    this._drescribeTree(body[0], 0,newstate);
    return newstate;
  
  }

  _drescribeTree(body, index, newstate){
    const base = ['','','','',''];
    if (body.expand) {
      base[index] = [<div onClick={() => this._find(body.id)}>+</div>,body.label];
    }
    else {
      base[index] = body.label;
    }
    newstate.push(base);
    if (body.childs.length > 0 && body.expand) {
      body.childs.map((child, i) => this._drescribeTree(child, index+1, newstate));
    }
  }

  render() {
    return <Table headers={this.props.headers} body={this.state.data} />
  }
}

//TODO: Implement themes
TableCollapse.defaultProps = {
  headers: [
    [
      {
        text: 'Abuelo'
      },
      {
        text: 'Hijo'
      },
      {
        text: 'Nieto'
      },
      {
        text: 'Bisnieto'
      },
      {
        text: 'Tataranieto'
      }
    ]
  ],
  body: [
    {
      id: '654756',
      label: '1',
      expand: true,
      childs: [
        {
          id: '65ert56',
          expand: true,
          label: '2',
          childs: [
            {
              label: '3',
              childs: [
                {
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
          expand: true,
          label: '4',
          childs: [
            {
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
            }
          ]
        }
      ]
    }
  ]
};

export default TableCollapse;
