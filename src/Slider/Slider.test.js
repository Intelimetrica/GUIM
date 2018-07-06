import React from 'react';
import Slider, { Handler, Bar } from './Slider';
import renderer from 'react-test-renderer';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('<Slider />', () => {
  let component;
  let selected_range = { min: 2, max: 4 };
  let tree;
  const onChange = (new_range) => {
    selected_range = { ...selected_range, ...new_range };
  };

  const div = document.createElement('div');
  div.setAttribute('id', 'slider-tests');
  div.setAttribute('style', 'width: 50px');
  document.body.appendChild(div);

  const refreshTree = () => tree = component.toJSON();
  const reRender = () => {
    component = renderer.create(<Slider
      id="slider-tests"
      range={{ min: 1, max: 5 }}
      steps={[1, 2, 3, 4, 5]}
      selected_range={selected_range}
      onChange={onChange}
    />);
    refreshTree();
  };

  it('Match dom snapshot', () => {
    reRender();
    expect(component).toMatchSnapshot();
  });

  it('Change label when selected_range change', () => {
    selected_range = { ...selected_range, min: 3 };
    reRender();
    expect(component).toMatchSnapshot();
  });
});
configure({ adapter: new Adapter() });


describe('<Slider />', () => {
  let wrapper;
  let selected_range = { min: 2, max: 4 };
  const onChange = (new_range) => {
    selected_range = { ...selected_range, ...new_range };
  };

  const div = document.createElement('div');
  div.setAttribute('id', 'slider-tests');
  div.setAttribute('style', 'width: 50px');

  document.body.appendChild(div);

  const reShallow = () => {
    wrapper = shallow(<Slider
      id="slider-tests"
      range={{ min: 1, max: 5 }}
      steps={[1, 2, 3, 4, 5]}
      selected_range={selected_range}
      onChange={onChange}
    />);
  };

  it("Change handler's position and bars' length when selected_range change", () => {
    reShallow();
    wrapper.setState({ width: 100 });
    expect(wrapper).toMatchSnapshot();

    selected_range = { min: 3, max: 4 };
    wrapper.setProps({ selected_range });

    expect(wrapper).toMatchSnapshot();
  });

  it('Carry max with it, when min handler is pulled further than max handler', () => {
    reShallow();
    wrapper.setState({ width: 100 });
    wrapper.find(Handler).first().props().onDrag(1005, true);

    expect(selected_range).toEqual({ min: '5.00', max: '5.00' });
  });

  it('Carry min with it, when max handler is pulled further than min handler', () => {
    reShallow();
    wrapper.setState({ width: 100 });
    wrapper.find(Handler).last().props().onDrag(20, false);

    expect(selected_range).toEqual({ min: '1.00', max: '1.00' });
  });
});
