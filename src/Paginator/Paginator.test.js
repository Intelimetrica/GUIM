import React from 'react';
import Paginator from './Paginator';
import renderer from 'react-test-renderer';

  describe('<Paginator />', () => {
    describe('tests for normal behaviour', () => {
      let active = [1];
      let component;
      let tree;
      let reRender;
      const makeRenderer = component =>
        () => tree = component.toJSON();
  
      beforeEach(() => {
        component = renderer.create(<Paginator />);
        reRender = makeRenderer(component);
        reRender();
      })
  
      it('match snapshot', () => {
        expect(tree).toMatchSnapshot();
      });
    });
  });
  