import React, { Component } from 'react'; import "./styles.scss";

const Link = (props) => {
  return <li className={`${props.className || ""}`}>
    <a href={props.to}
      target={props.target}>
      {props.name}
    </a>
  </li>;
};

Link.defaultProps = {
  className: "",
  to: "#",
  target: "_self",
  name: "Link"
};

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.activate = this.activate.bind(this);
    this.openSubmenu = this.openSubmenu.bind(this);

    this.state = {
      dd_className: "dropdown",
      dd_submodule_classname: "submodule_dropdown hide"
    };
  }

  activate(classes) {
    this.setState({dd_className: classes.join(" ")});
  }

  openSubmenu(open, div) {
    if (open) {
      document.querySelector(`.${div}`).classList.remove('hide');
    } else {
      document.querySelector(`.${div}`).classList.add('hide');
    }
  }

  render() {
    let {state, props} = this;
    return (
      <li className={state.dd_className}
        onMouseEnter={this.activate.bind(null, ["dropdown", "active"])}
        onMouseLeave={this.activate.bind(null, ["dropdown"])} >
        <a href={props.to}>{props.name}</a>
        <div className="dd-container">
          <ul className="dd-list">
            {props.submodules.map((submod, i) => {
              if (!!submod.submodules) {
                return (

                  <li className='sub-dropdown' key={submod.name} 
                    onMouseLeave={() => this.openSubmenu(false, `${submod.name}_${submod.id}`)} 
                    onMouseEnter={() => this.openSubmenu(true, `${submod.name}_${submod.id}`)}>
                    <a href={submod.to}>{submod.name}</a>
                    <ul className={`${submod.name}_${submod.id} sub-list hide`}>
                      {submod.submodules.map((subsubmodule) => {
                        return <Link className="navbar-element" key={subsubmodule.name} {...subsubmodule}/>
                      })}
                    </ul>
                  </li>
                );
              } else {
                return <Link className="dd-element" key={submod.name} {...submod}/>
              }
            })}
          </ul>
        </div>
      </li>
    );
  }
};

Dropdown.defaultProps = {
  name: "Dropdown",
  submodules: [
    {
      id: 1,
      name: "GUIMDevTeam",
      to: "https://github.com/Intelimetrica/GUIM",
      permission: "default"
    },
    {
      id: 2,
      name: "Intelimetrica",
      to: "http://intelimetrica.com",
      permission: "default"
    }
  ]
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
      .filter(module => !module.mobile)
      .map((module) => {
        if ( "submodules" in module ) {
          return <Dropdown key={module.name} {...module}/>;
        }
        return <Link className="navbar-element" key={module.name} {...module}/>;
      });
  }

  render() {
    const props = this.props;
    const headers = (
      <ul className="navbar-modules">
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
      to: "?home=yeap",
      permission: "default",
    },
    {
      name: "About us",
      to: "#",
      permission: "default",
      submodules: [
        {
          id: 1,
          name: "History",
          to: "https://github.com/Intelimetrica/GUIM",
          permission: "default"
        },
        {
          name: "Policy",
          to: "http://intelimetrica.com",
          permission: "default",
          mobile: true
        }
      ]
    },
    {
      name: "Contact",
      to: "#",
      permission: "default",
      mobile: false,
      submodules: [
        {
          id: 2,
          name: "GUIMDevTeam",
          to: "#",
          permission: "default",
          submodules: [
            {
              id: 3,
              name: "Github IM",
              to: "https://github.com/Intelimetrica/GUIM",
              permission: "default"
            }
          ]
        },
        {
          name: "Intelimetrica",
          to: "#",
          permission: "default",
          mobile: true,
          submodules: [
            {
              id: 4,
              name: "Submodule1",
              to: "https://github.com/Intelimetrica/GUIM",
              permission: "default"
            },
            {
              name: "Submodule2",
              to: "http://intelimetrica.com",
              permission: "default",
              mobile: true
            }
          ]
        }
      ]
    }
  ]
};

const themes = {
  dark: "GUIMNavbarDark",
  light: "GUIMNavbarLight"
};

export default Navbar;
