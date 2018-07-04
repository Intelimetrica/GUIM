import React from 'react';
import Textbox from './Textbox';
import renderer from 'react-test-renderer';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<Textbox />', () => {
  describe('behaiviour tests', () => {
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

    it('write text in the input', () => {
      tree.props.onChange('random text');
      reRender();
      expect(text).toBe('random text');

      tree.props.onChange('another text');
      reRender();
      expect(text).toBe('another text');
    });
  });

  describe('dom tests', () => {
    let text = '';
    let component;

    beforeEach(() => {
      component = shallow(
        <Textbox
          name='test_textbox'
          onChange={(event) => {text = event} }
          value={text} />
      );
    });

    it('renders an input', () => {
      expect(component.name()).toBe("input");
    });

    it('name is test_textbox', () => {
      expect(component.prop('name')).toBe('test_textbox');
    });
  });
});
