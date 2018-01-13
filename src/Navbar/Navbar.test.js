import React from 'react';
import Navbar from './Navbar';
import renderer from 'react-test-renderer';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<Navbar />', () => {
  let component;
  const reRender = () => {
    component = renderer.create(
      <Navbar
        logo="Logo"
        fixed_top={false}
        className=""
        theme="light"
        modules={[
          {
            name: "menu1",
            to: "#menu1",
            permission: "default"
          },
          {
            name: "menu2",
            to: "#",
            permission: "default",
            submodules: [{
              name: "submenu1",
              to: "#submenu1",
              permission: "default"
            }]
          }
        ]}
      />
    )};

  it('match dom snapshot', () => {
    reRender();
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

