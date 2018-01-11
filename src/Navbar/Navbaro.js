import React, { Component } from 'react';
import "./styles.scss";
import {
  is_authenticated,
  is_in_sandbox_mode
} from 'common-helpers/user_api_helpers';
import {
  modules_not_logged_in,
  modules_logged_in,
  modules_admin
} from 'common-helpers/modules_navbar_constant';
import { sandbox_warning } from 'common-helpers/sandbox';
import { gaNavbar } from 'common-helpers/google_analytics';
import { isEmpty } from 'lodash';

require('common-styles/general.scss');
require('common-styles/bootstrap.scss');
require('common-styles/navbar_yals.scss');
require('common-styles/sandbox.scss');

const navbarLogo = require('common-images/home_logo.svg');
const listLogo = require('common-images/mis_reportes_ico_list.svg');
const crossImg = require('common-images/Close.svg');
const userImg = require('common-images/Mobile_user.svg');
const notFound = require('common-images/error-404.svg');
const ServerError = require('common-images/error-500.svg');
const mobileElementHeight = '55px';

const Link = (props) => {
  return <li>
    <a href={props.link}
      onClick={() => gaNavbar(`${props.name} Desktop`)}
      target={newWindow(props.name)}>
      {props.name}
    </a>
  </li>;
};

const MobileLink = (props) => {
  return <li style={{height: mobileElementHeight}}>
    <a href={props.link}
      onClick={() => gaNavbar(`${props.name} Mobile`)}
      target={newWindow(props.name)}>
      {props.name}
    </a>
  </li>;
};

const newWindow = (name) => {
  if (name === 'Blog') {
    return '_blank'
  }
  return '_self'
}

const Dropdown = (props) => {
  let submodules = props.submodules;

  return (
    <li className="navbar-list">
      <a href="#">{props.name}</a>
      <div className='navbar-sublist-container Grower'>
        <ul className="navbar-sublist">
          {submodules.map((submod) => <Link key={submod.name} {...submod}/>)}
        </ul>
        <div className='triangle-sublist triangle-right'></div>
      </div>
    </li>
  );
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      is_admin: false,
      permissions: ['default'],
      fetch_user: false,
      user_name: '',
      mobile: true,
      mobile_list: false
    };
    this._changeSize = this._changeSize.bind(this);
    this._mobileClick = this._mobileClick.bind(this);
    this._buildMobileList = this._buildMobileList.bind(this);
    this._buildGeneralList = this._buildGeneralList.bind(this);
    this._resizeFunction = this._resizeFunction.bind(this);
    this._stopPropagation = this._stopPropagation.bind(this);
    this._closeMobileList = this._closeMobileList.bind(this);
  }

  _closeMobileList() {
    this.setState({mobile_list : false});
  }

  _stopPropagation(e) {
    e.stopPropagation();
  }

  componentWillMount() {
    is_authenticated().then((data) => {
      let {nombre, apellidos, admin} = data.data.user;
      this.setState({
        fetch_user: true,
        authenticated: true,
        is_admin: admin,
        permissions: ['default', 'avaluos'],
        user_name: `${nombre} ${apellidos}`
      });
    }).catch((e) => {
      this.setState({fetch_user: true, permissions: ['default']});
    });
    is_in_sandbox_mode().then(e => {
      if (e.data.bypass) {
        sandbox_warning();
      }
    });
  }

  _havePermission(permissions, to_validate){
    return (permissions.indexOf(to_validate) >= 0) || to_validate === 'default';
  }

  _mobileClick() {
    this.setState({mobile_list : !this.state.mobile_list});
  }

  _buildMobileList(modules) {
    if(isEmpty(modules)){
      return;
    }
    return modules.filter((module) => this._havePermission(this.state.permissions, module.permission))
      .map((module) => {
      if ( module.mobile === false ) {
        return;
      }
      if ( 'image' in module) {
        return (
          <li key={module.name} style={{height: mobileElementHeight}}>
            <a onClick={() => gaNavbar(`Mobile configuración`)} href={module.link}>
              <img src={userImg} height='17px'/>
              <span className='LeftRightMargin'>{module.name}</span>
            </a>
          </li>
        );
      }
      return <MobileLink key={module.name} {...module}/>;
    });
  }

  _buildGeneralList(modules) {
    if(isEmpty(modules)){
      return;
    }
    return modules.filter((module) => this._havePermission(this.state.permissions, module.permission))
      .map((module) => {
      if(module.mobile === true) {
        return;
      }
      if ( 'submodules' in module ) {
        return <Dropdown key={module.name} {...module}/>;
      }
      return <Link key={module.name} {...module}/>;
    });
  }

  _buildHeaders() {
    const {authenticated, user_name, is_admin} = this.state;
    const listDisplay = (this.state.mobile_list) ? 'block' :'none' ;
    const listImage = (this.state.mobile_list) ? crossImg : listLogo;
    let modules = (authenticated) ? modules_logged_in(user_name) : modules_not_logged_in;
    if(is_admin && authenticated){
      modules.splice(modules.length - 2,0,modules_admin);
    }
    if(this.state.mobile === true) {
      return (
          <div>
            <div>
              <a onClick={this._mobileClick}>
                <img className='TopMargin' src={listImage} height='20px'/>
              </a>
              <div className='navbar-mobile-container'>
                <ul className="navbar-mobile-sublist" style={{display: listDisplay}}>
                  {this._buildMobileList(modules)}
                </ul>
              </div>
            </div>
          </div>
      )
    } else {
      return(
        <ul className='FullHeightGrower'>
          {this._buildGeneralList(modules)}
        </ul>
      );
    }
  }

  _changeSize() {
    if(window.matchMedia("(max-width:768px)").matches) {
      this.setState({mobile: true});
    } else {
      this.setState({
        mobile: false,
        mobile_list: false
      });
    }
  }

  _resizeFunction() {
    let resizeTimer
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this._changeSize();
      }, 250)
    };

  componentDidMount() {
    this._resizeFunction();
    window.addEventListener('resize', this._resizeFunction, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeFunction, false);
  }

  render() {
    let navbar = '';
    const logoHeight = (this.state.mobile) ? '18px' : '26px';
    const navbarHeight = (this.state.mobile) ? '38px' : '51px';

    if (this.state.fetch_user) {
      const headers = this._buildHeaders();
      const backgroundClass = (this.state.mobile_list && this.state.mobile) ? 'whole-page' : '';
      const navbarClass = (this.state.mobile) ? 'navigation-yals-mobile' : 'navigation-yals FullHeightGrower';
      navbar = (
        <div className={backgroundClass} onClick={this._closeMobileList}>
          <div  style={{height: navbarHeight, width:'100%'}}>
            <nav style={{width: '100%'}} className={`${navbarClass} RowDirection MaxWidthContainer SpaceBetween CenterAlignment`}
              onClick={this._stopPropagation}>
              <div className="nav-logo">
                <a href="/"><img src={navbarLogo} height={logoHeight} width='auto'/></a>
              </div>
              <div style={{height: '40px'}}>
                  {headers}
              </div>
            </nav>
          </div>
        </div>
      );
    }
    return (
      <div>
        {navbar}
      </div>
    );
  }
}

export default Navbar;
