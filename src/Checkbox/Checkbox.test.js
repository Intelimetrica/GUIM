import React from 'react';
import Checkbox from './Checkbox';
import renderer from 'react-test-renderer';
//import { shallow } from 'enzyme';

describe('<Checkbox />', () => {

  let checked = false;
  let component;
  let tree;
  let reRender;
  const makeRenderer = component =>
    () => tree = component.toJSON();

  beforeEach(() => {
    component = renderer.create(
      <Checkbox
        onChange={_e => checked = !checked}
        checked={checked}
      />);
    reRender = makeRenderer(component);
    reRender();
  })

  it('match snapshot', () => {
    expect(tree).toMatchSnapshot();
  });


  it('is true after a click', () => {
    tree.props.onChange();
    reRender();
    expect(checked).toBe(true);
  });

  it('is false after two clicks', () => {
    tree.props.onChange();
    tree.props.onChange();
    reRender();
    expect(tree).toMatchSnapshot();
  });
});
