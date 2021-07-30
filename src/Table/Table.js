import React, { Component, Fragment } from "react";
import isEmpty from 'lodash/isEmpty';
import Arrows from './Arrows';

import "./styles.scss";

const mapHeader = (header, handleClickHeader, idOrder, tableOrder) => header.map((rowHeader, index_row) => (
  <tr className={`theader `} key={`header-${index_row}`}>
    {rowHeader.map((colHeader, index_col) => {
      let options = {};
      let ordering = null;
      if (colHeader.rowSpan) {
        options.rowSpan = colHeader.rowSpan;
      }
      if (colHeader.colSpan) {
        options.colSpan = colHeader.colSpan;
      }
      if (colHeader.className) {
        options.className = colHeader.className;
      }
      if (colHeader.sortable && !isEmpty(colHeader.id)) {
        let orderClass = 'desc';
        let newOrder = 'asc';
        options.className = `${!isEmpty(options.className) ? options.className : ''} sortableColumn`
        const indexOfColumn = idOrder.indexOf(colHeader.id);
        options.onClick = () => handleClickHeader({id: colHeader.id, index: indexOfColumn});
        ordering = Arrows(idOrder.includes(colHeader.id) ? tableOrder[indexOfColumn] : '');
      }
      return (
        <th
          key={`row-header-${index_row}-${index_col}`}
          {...options} >
            <span className='Title'>{colHeader.text}</span>
            {ordering && (<span className='Arrows'>{ordering}</span>)}
        </th>
      );
    })}
  </tr>
));

export class StickyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false, width: '100%' };
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(e) {
    const originalHeaderTop = (this.originalHeader)
      ? this.originalHeader.getBoundingClientRect().top
      : Number.POSITIVE_INFINITY;

    if (originalHeaderTop <= this.props.top && !this.state.active) {
      this.setState({ active: true });
    } else if (originalHeaderTop > this.props.top && this.state.active) {
      this.setState({ active: false });
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.originalHeader = document.getElementById(this.props.id);
    let zIndex = parseInt(this.originalHeader.style.zIndex) || 0;
    zIndex += 1;

    this.setState({
      width: this.originalHeader.getBoundingClientRect().width,
      zIndex
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const style = (this.state.active) ? {
      top: this.props.top,
      display: 'block',
      position: 'fixed',
      width: this.state.width,
      zIndex: this.state.zIndex
    } : {}
    return (
      <div id="ticky" style={style}>
        <table className={`GUIMTable ${this.props.className}`}>
          <thead >
            {mapHeader(this.props.headers, this.props.handleClickHeader, this.props.idOrder, this.props.tableOrder)}
          </thead>
        </table>
      </div>
    )
  }
}

const Table = props => {
  const { body, headers, head_id } = props;
  const sticky_header = (props.sticky_header.active) ? (
    <StickyHeader
      id={head_id}
      headers={headers}
      top={props.sticky_header.top}
      className={props.className}
      tableOrder={props.tableOrder}
      idOrder={props.idOrder}
      handleClickHeader={props.handleClickHeader}
    />
  ) : '';
  return (
    <Fragment>
      {sticky_header}
      <table className={`GUIMTable ${props.className}`}>
        <thead id={head_id}>
          {mapHeader(headers, props.handleClickHeader, props.idOrder, props.tableOrder)}
        </thead>
        <tbody className={`${props.striped ? "striped" : ""}`}>
          {
            body.map((el, index) => (
              <tr key={`row-${index}`}
                className={`trow ${(props.row_hovered === index) ? 'highlighted' : ''} ${props.row_className}`}
                onMouseEnter={props.row_mouseEnter.bind(this, index)}
                onMouseLeave={props.row_mouseLeave.bind(this, index)}>
                {el.map((td, i) => <td key={`td-${index}-${i}`}>{td}</td>)}
              </tr>
            ))
          }
        </tbody>
      </table>
    </Fragment>
  );
}

//TODO: Implement themes
Table.defaultProps = {
  striped: false,
  sticky_header: {
    active: false,
    top: 0
  },
  head_id: `head-${Math.round(Math.random() * 10000)}`,
  headers: [
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
        rowSpan: 3,
        className: 'border'
      },
      {
        text: 'First Name'
      },
      {
        text: 'Last Name',
        className: 'border'
      },
      {
        text: 'Email'
      },
      {
        text: 'Actions'
      }
    ]
  ],
  tableOrder: [],
  idOrder: [],
  handleClickHeader: () => {},
  body: [
    ["1", "John", "Doe", "john@doe.com", "View - Edit"],
    ["2", "Jane", "Garcia", "jane@doe.com", "View - Edit"],
    ["3", "Josue", "Corona", "josue@doe.com", "View - Edit"]
  ],
  row_mouseEnter: (i) => {},
  row_mouseLeave: (i) => {},
  className: "",
  row_className: "",
  row_hovered: -1, //  This one will set the given row's className to highlighted
  theme: "light"
};

export default Table;
