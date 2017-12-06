import React from 'react';
import Button from './Button';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<Button />', () => {
  let clicked = false;
  let tree;
  let reRender;
  const makeRenderer = component =>
    () => tree = component.toJSON();


  beforeEach(() => {
    component = renderer.create(
    <Button
      color='gray'
      onClick={() => clicked = true}
    />)
    reRender = makeRenderer(component);
    reRender();
  });

  it('match snapshot', () => expect(tree).toMatchSnapshot());

  it('is true after click', () => {
    tree.props.onClick();
    reRender();
    expect(clicked).toBe(true);
  });

});
