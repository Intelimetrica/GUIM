import React, { Component } from 'react';
import "./styles.scss";

const Link = (props) => {
  return <li className={`${props.className || ""}`}>
    <a href={props.link}
      target={`${props.target || "_self"}`}>
      {props.name}
    </a>
  </li>;
};

const Dropdown = (props) => {
  return (
    <li className="dropdown">
      <a href="#">{props.name}</a>
      <div className="dd-container">
        <ul className="dd-list">
          {props.submodules.map((submod) => <Link className="dd-element" key={submod.name} {...submod}/>)}
        </ul>
      </div>
    </li>
  );
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { permissions: ["default"] };
    this._buildHeaders();
  }

  _havePermission(permissions, to_validate){
    return (permissions.indexOf(to_validate) >= 0) || to_validate === "default";
  }

  _buildHeaders() {
    const { modules } = this.props;
    if(modules.length < 1){
      return;
    }
    return modules.filter((module) => this._havePermission(this.state.permissions, module.permission))
      .map((module) => {
        if(module.mobile === true) return;
        if ( "submodules" in module ) {
          return <Dropdown key={module.name} {...module}/>;
        }
        return <Link className="navbar-element" key={module.name} {...module}/>;
      });
  }

  render() {
    const props = this.props;
    const headers = (
      <ul className="something">
        { this._buildHeaders() }
      </ul>
    );

    return (
      <div className={`GUIMNavigation ${props.className} ${themes[props.theme] || themes["dark"]}`} >
        <nav onClick={e => e.stopPropagation()}>
          <div className="logo">
            <a href="/">{this.props.logo}</a>
          </div>
          <div>
            {headers}
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.defaultProps = {
  logo: "Logo",
  fixed_top: false,
  className: "",
  theme: "light",
  modules: [
    {
      name: "Home",
      link: "?home=yeap",
      permission: "default",
    },
    {
      name: "About us",
      link: "?about-us=guim",
      permission: "default"
    },
    {
      name: "Contact",
      link: "#",
      permission: "default",
      mobile: false,
      submodules: [
        {
          name: "GUIMDevTeam",
          link: "https://github.com/Intelimetrica/GUIM",
          permission: "default"
        },
        {
          name: "Intelimetrica",
          link: "http://intelimetrica.com",
          permission: "default",
          mobile: true
        }
      ]
    }
  ]
}

const themes = {
  dark: "GUIMNavbarDark",
  light: "GUIMNavbarLight"
}

export default Navbar;
