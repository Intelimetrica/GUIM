import React, { Component, Fragment} from "react";
import "./styles.scss";

export class StickyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(e) {
    const originalHeaderTop = (this.originalHeader)
      ?  this.originalHeader.getBoundingClientRect().top
      : Number.POSITIVE_INFINITY;

    if (originalHeaderTop <= this.props.top && !this.state.active) {
      this.setState({active: true});
    } else if (originalHeaderTop > this.props.top && this.state.active){
      this.setState({active: false});
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.originalHeader = document.getElementById(this.props.id);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const style = (this.state.active) ? {
      top: `${this.props.top}px`,
      display: 'block',
      position: 'fixed'
    } : {}
    return (
      <div id="ticky" style={style}>
        <table className={`GUIMTable`}>
          <thead>
            <tr className={`theader`} >
              { this.props.headers.map((el, index) => <th key={`header-${index}`}>{el}</th>) }
            </tr>
          </thead>
        </table>
      </div>
    )
  }
}
const Table = props => {
  const { body, headers } = props;
  const head_id = `head-${Math.round(Math.random() * 10000)}`;
  const sticky_header = (props.sticky_header.active) ? (
    <StickyHeader id={head_id} headers={headers} top={props.sticky_header.top} />
  ) : '';

  return (
    <Fragment>
      {sticky_header}
      <table className={`GUIMTable ${props.className}`}>
        <thead>
          <tr id={head_id} className={`theader `}>
            { headers.map((el, index) => <th key={`header-${index}`}>{el}</th>) }
          </tr>
        </thead>
        <tbody className={`${props.striped ? "striped" : ""}`}>
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
  headers: ["First Name","Last Name","Email", "Actions"],
  body: [
    ["John","Doe","john@doe.com", "View - Edit"],
    ["Jane","Doe","jane@doe.com", "View - Edit"],
    ["Josue","Doe","josue@doe.com", "View - Edit"]
  ],
  row_mouseEnter: (i) => {},
  row_mouseLeave: (i) => {},
  className: "",
  row_className: "",
  row_hovered: -1, //  This one will set the given row's className to highlighted
  theme: "light"
};

export default Table;
