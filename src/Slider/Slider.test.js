import React from 'react';
import Slider, {Handler, Bar} from './Slider';
import renderer from 'react-test-renderer';

describe('<Slider />', () => {
  let component;
  let selected_range = { min: 2, max: 4 };
  let tree;
  const onChange = (new_range) => {
    selected_range = {...selected_range, ...new_range}
  };

  let div = document.createElement("div");
  div.setAttribute("id", "slider-tests");
  div.setAttribute("style", "width: 50px");
  document.body.appendChild(div);

  const refreshTree = () => tree = component.toJSON();
  const reRender = () => {
    component = renderer.create(
      <Slider
        id={"slider-tests"}
        range={{min: 1, max: 5}}
        steps={[1,2,3,4,5]}
        selected_range={selected_range}
        onChange={onChange}
      />
    );
    refreshTree();
  }

  it("match dom snapshot", () => {
    reRender();
    expect(component).toMatchSnapshot();
  });

  it("Change label when selected_range change", () => {
    selected_range = {...selected_range, min: 3};
    reRender();
    expect(component).toMatchSnapshot();
  });

  // When max handler is pulled further than min handler, it carry min with it
  // Bars resize as expected

});

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


describe.only("<Slider />", () => {
  let wrapper;
  let selected_range = { min: 2, max: 4 };
  const onChange = (new_range) => {
    selected_range = {...selected_range, ...new_range}
  };

  let div = document.createElement("div");
  div.setAttribute("id", "slider-tests");
  div.setAttribute("style", "width: 50px");

  document.body.appendChild(div);

  const reShallow = () => {
    wrapper = shallow(
      <Slider
        id={"slider-tests"}
        range={{min: 1, max: 5}}
        steps={[1,2,3,4,5]}
        selected_range={selected_range}
        onChange={onChange}
      />
    );
  }

  it("Change handler's position when selected_range change", () => {
    reShallow();
    wrapper.setState({width: 100})
    expect(wrapper).toMatchSnapshot();

    selected_range = { min: 3, max: 4 };
    wrapper.setProps({selected_range});

    expect(wrapper).toMatchSnapshot();
  });

  it.only("Carry max with it, when min handler is pulled further than max handler, it carry max with it", () => {
    reShallow();
    wrapper.setState({width: 100})
    expect(wrapper).toMatchSnapshot();

    //selected_range = { min: 4, max: 5 };
    console.log(wrapper.instance().props.onChange({min:4, max:3}));
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
  });

});
