import React from "react";
import "./styles.scss";

const Table = props => {
  const { body, headers } = props;

  return (
    <table className='YalsTable'>
      <tbody>
        <tr className='hidden-xs'>
          { headers.map((el, index) => <td key={`header-${index}`}>{el}</td>) }
        </tr>
        {
          body.map((el, index) => (
            <tr key={`row-${index}`}
              className={(props.row_hovered === index) ? 'highlighted' : ''}
              onMouseEnter={props.row_mouseEnter.bind(this, index)}
              onMouseLeave={props.row_mouseLeave.bind(this, index)}>
              {el.map((td, i) => <td key={`td-${index}-${i}`}>{td}</td> )}
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

Table.defaultProps = {
  striped: false,
  sticky_header: {
    active: false,
    height: 0
  },
  headers: [1,2,3],
  body: [[1,2,3],[1,2,3],[1,2,3]],
  row_mouseEnter: (i) => {},
  row_mouseLeave: (i) => {},
  className: "",
  row_className: "",
  row_hovered: -1 //This one will set the given row's className to highlighted
};

export default Table;
