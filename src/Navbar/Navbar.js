import React, { Component } from 'react';
import "./styles.scss";

const modules = [
  {
    name: 'Home',
    link: '?home=yeap',
    permission: 'default',
  },
  {
    name: 'About us',
    link: '?about-us=guim',
    permission: 'default'
  },
  {
    name: 'Contact',
    link: '#',
    permission: 'default',
    mobile: false,
    submodules: [
      {
        name: 'GUIMDevTeam',
        link: 'https://github.com/Intelimetrica/GUIM',
        permission: 'default'
      },
      {
        name: 'Intelimetrica',
        link: 'http://intelimetrica.com/contacto.html',
        permission: 'default',
        mobile: true
      }
    ]
  }
];

const Link = (props) => {
  return <li>
    <a href={props.link}
      target="_self">
      {props.name}
    </a>
  </li>;
};

const Dropdown = (props) => {
  let submodules = props.submodules;

  return (
    <li className="navbar-list">
      <a href="#">{props.name}</a>
      <div className='navbar-sublist-container Grower'>
        <ul className="navbar-sublist">
          {submodules.map((submod) => <Link key={submod.name} {...submod}/>)}
        </ul>
      </div>
    </li>
  );
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: 'logo',
      permissions: ['default']
    };
    this._stopPropagation = this._stopPropagation.bind(this);
    this._buildHeaders();
  }

  _stopPropagation(e) {
    e.stopPropagation();
  }

  _havePermission(permissions, to_validate){
    return (permissions.indexOf(to_validate) >= 0) || to_validate === 'default';
  }

  _buildHeaders() {
    if(modules.length < 1){
      return;
    }
    return modules.filter((module) => this._havePermission(this.state.permissions, module.permission))
      .map((module) => {
        if(module.mobile === true) return;
        if ( 'submodules' in module ) {
          return <Dropdown key={module.name} {...module}/>;
        }
      return <Link key={module.name} {...module}/>;
    });
  }

  render() {
    const headers = (
      <ul>
        { this._buildHeaders() }
      </ul>
    );

    return (
      <div className="GUIMNavigation" >
        <nav
          style={{width: '100%'}}
          className="MaxWidthContainer"
          onClick={this._stopPropagation}>
          <div>
            <a href="/">{this.props.logo}</a>
          </div>
          <div style={{height: '40px'}}>
            {headers}
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.defaultProps = {
  logo: 'Logo',
  fixed_top: false
}

export default Navbar;
