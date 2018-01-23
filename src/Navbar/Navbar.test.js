import React from 'react';
import Navbar from './Navbar';
import renderer from 'react-test-renderer';

describe('<Navbar />', () => {
  let component;
  const reRender = (theme = "light") => {
    component = renderer.create(
      <Navbar
        logo="Logo"
        fixed_top={false}
        className=""
        theme={theme}
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

  it("match dom snapshot", () => {
    reRender();
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders navbar with dark theme", () => {
    reRender("dark");
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('toggle display when hover', () => {
    reRender();
    let tree = component.toJSON();

    //MouseEnter into dropdown
    tree.children[0]
      .children[1].children[0]
      .children[1].props.onMouseEnter()
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    //MouseLeave out of dropdown
    tree.children[0]
      .children[1].children[0]
      .children[1].props.onMouseLeave()
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

