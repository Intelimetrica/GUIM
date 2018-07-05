import React from 'react';
import Textbox from './Textbox';
import renderer from 'react-test-renderer';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<Textbox />', () => {
  describe('behaviour tests', () => {
    let text = '';
    let component;
    let tree;
    let reRender;
    const makeRenderer = component =>
      () => tree = component.toJSON();

    beforeEach(() => {
      component = renderer.create(
        <Textbox
          onChange={(event) => {text = event} }
          value={text} />
      );
      reRender = makeRenderer(component);
      reRender();
    });

    it('match snapshot', () => {
      expect(tree).toMatchSnapshot();
    });

    it('registers onChange function into the component tree', () => {
      tree.props.onChange('random text');
      reRender();
      expect(text).toBe('random text');

      tree.props.onChange('another text');
      reRender();
      expect(text).toBe('another text');
    });
  });

  describe('dom tests', () => {
    const event = {target: {name: "test_textbox", value: "test"}};
    let text = '';
    let component;
    let update = () => {
      component = shallow(
        <Textbox
          name='test_textbox'
          onChange={(event) => {text = event.target.value} }
          value={text} />
      );
    }

    beforeEach(() => {
      update();
    });

    it('renders an input', () => {
      expect(component.name()).toBe("input");
    });

    it('name is test_textbox', () => {
      expect(component.prop('name')).toBe('test_textbox');
    });

    it('registers onChange function when the component is mounted', () => {
      component.find('input').simulate('change', event);
      update();
      expect(component.prop('value')).toBe('test');
    });
  });
});
