import React from 'react';
import Form from './Form';
import Checkbox from '../Checkbox';
import Picker from '../Picker';
import Slider from '../Slider';

import renderer from 'react-test-renderer';

import { mount, configure } from 'enzyme';
import enzymeSerializer from 'enzyme-to-json/serializer';
import Adapter from 'enzyme-adapter-react-16';

expect.addSnapshotSerializer(enzymeSerializer);
configure({ adapter: new Adapter() });

describe('<Form />', () => {
  let active = [1];
  let checked = false;
  let component;
  let form;
  let selected_range = { min: 2, max: 4 };

  let div = document.createElement("div");
  div.setAttribute("id", "slider-tests");
  document.body.appendChild(div);

  const reRender = () => {
    component = renderer.create(
      <Form ref={ref => (form = ref)} >
        <Checkbox
          name="checkbox"
          checked={checked}
          onChange={() => checked = !checked}
          id='Checkbox-1' />
        <Picker
          onChange={(label, value) => active = [value]}
          options={[
            {label: "p1", value: 1},
            {label: "p2", value: 2}
          ]}
          active={active}
        />
        <Slider
          id={"slider-tests"}
          range={{min: 1, max: 5}}
          steps={[1,2,3,4,5]}
          selected_range={selected_range}
          onChange={(new_range) => {selected_range = {...selected_range, new_range}}}
        />
      </Form>)
  };

  it('match dom snapshot', () => {
    component = mount(
      <Form ref={ref => (form = ref)} >
        <Checkbox
          name="checkbox"
          checked={checked}
          onChange={() => checked = !checked} 
          id='Checkbox-2'/>
        <Picker
          onChange={(label, value) => active = [value]}
          options={[
            {label: "p1", value: 1},
            {label: "p2", value: 2}
          ]}
          active={active}
        />
      </Form>);

    expect(component).toMatchSnapshot();
  });

  it('returns children data', () => {
    reRender();
    // Grab data for the first time
    expect(form.grabFormData()).toMatchSnapshot();
  });

  it('returns children data updated after click', () => {
    // click on checkbox to change data
    let tree = component.toJSON();
    tree.children[0].props.onChange();

    reRender();
    expect(form.grabFormData()).toMatchSnapshot();
  });
});
