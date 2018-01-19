import React from "react";
import "./styles.scss";

const Table = props => {
  const { body, headers } = props;

  return (
    <table className={`GUIMTable ${props.className}`}>
      <tbody className={`${props.striped ? "striped" : ""}`}>
        <tr className={`theader `}>
          { headers.map((el, index) => <td key={`header-${index}`}>{el}</td>) }
        </tr>
        {
          body.map((el, index) => (
            <tr key={`row-${index}`}
              className={`trow ${(props.row_hovered === index) ? 'highlighted' : ''} ${props.row_className}`}
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
  striped: false, // ✓
  sticky_header: { // ✗
    active: false,
    height: 0
  },
  headers: ["First Name","Last Name","Email", "Actions"], // ✓
  body: [ // ✓
    ["John","Doe","john@doe.com", "View - Edit"],
    ["Jane","Doe","jane@doe.com", "View - Edit"],
    ["Josue","Doe","josue@doe.com", "View - Edit"],
    ["Roberto","Doe","roberto@doe.com", "View - Edit"]
  ],
  row_mouseEnter: (i) => {}, // ✓
  row_mouseLeave: (i) => {}, // ✓
  className: "", // ✓
  row_className: "", // ✓
  row_hovered: -1 // ✓ This one will set the given row's className to highlighted
  theme: "light" // ✗
};

export default Table;
