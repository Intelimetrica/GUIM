import React, { Component } from 'react'; import "./styles.scss";

const Link = (props) => {
  return (
    <li
      className={`${props.className || ""}`}
      onMouseEnter={() => props.onMouseEnter()}
      onMouseLeave={() => props.onMouseLeave()}
      key={props.id}>
      <a href={props.to}
        target={props.target}>
        {props.name}
      </a>
      {props.children}
    </li>
  );
};

Link.defaultProps = {
  className: "",
  to: "#",
  target: "_self",
  name: "Link",
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  id: "",
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

  openSubmenu(open, div, className) {
    if (open) {
      document.querySelector(`.${div}`).classList.remove(className);
      document.querySelector(`.${div}_subdropdown`).classList.add('open');
    } else {
      document.querySelector(`.${div}`).classList.add(className);
      document.querySelector(`.${div}_subdropdown`).classList.remove('open');
    }
  }

  render() {
    let {state, props} = this;
    return (
      <Link
        key={props.name}
        id={props.name}
        className={state.dd_className}
        onMouseEnter={this.activate.bind(null, ["dropdown", "active"])}
        onMouseLeave={this.activate.bind(null, ["dropdown"])}
        to={props.to}
        name={props.name}>
        <div className="dd-container">
          <ul className="dd-list">
            {props.submodules.map((submod, i) => {
              if (!!submod.submodules) {
                const subName = Array.isArray(submod.name) ? submod.name[0].replace(/\s/g, '') : submod.name.replace(/\s/g, '');
                return (
                  <Link
                    key={`${subName}_${i}`}
                    className={`sub-dropdown ${subName}_${props.id}_subdropdown`}
                    id={`${submod.name}_${props.id}`}
                    to={submod.to}
                    name={submod.name}
                    onMouseLeave={() => this.openSubmenu(false, `${subName}_${props.id}`, 'hide')}
                    onMouseEnter={() => this.openSubmenu(true, `${subName}_${props.id}`, 'hide')}>
                    <ul className={`${subName}_${props.id} sub-list hide`}>
                      {submod.submodules.map((subsubmodule) => {
                        return (
                          <Link
                            className="navbar-element"
                            key={`${subsubmodule.name}_${props.id}`} {...subsubmodule}
                          />
                        );
                      })}
                    </ul>
                  </Link>
                );
              } else {
                return <Link className="dd-element" key={submod.name} {...submod}/>
              }
            })}
          </ul>
        </div>
      </Link>
    );
  }
};

Dropdown.defaultProps = {
  name: "Dropdown",
  submodules: [
    {
      name: "GUIMDevTeam",
      to: "https://github.com/Intelimetrica/GUIM",
      permission: "default"
    },
    {
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
    let counter = 0;
    if(modules.length < 1){
      return;
    }
    return modules.filter((module) => this._havePermission(this.state.permissions, module.permission))
      .filter(module => !module.mobile)
      .map((module, k) => {
        counter = counter + 1;
        if ( "submodules" in module ) {
          return <Dropdown key={`${module.name}_${k}`} {...module} id={counter}/>;
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
      name: ["About us", <i className='arrow down' />],
      to: "#",
      permission: "default",
      submodules: [
        {
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
      name: ["Contact", <i className='arrow down' />],
      to: "#",
      permission: "default",
      mobile: false,
      submodules: [
        {
          name: ["GUIMDevTeam1", <i className='arrow down' />],
          to: "#",
          permission: "default",
          submodules: [
            {
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
    },
    {
      name: "Contact",
      to: "#",
      permission: "default",
      mobile: false,
      submodules: [
        {
          name: "GUIMDevTeam2",
          to: "#",
          permission: "default",
          submodules: [
            {
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