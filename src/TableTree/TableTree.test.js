import React from 'react';
import TableTree from './TableTree';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import { findDOMNode } from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('<TableTree />', () => {
  const component = renderer.create(
    <TableTree 
    headers={[
      [
        {
          text: '1'
        },
        {
          text: '2'
        },
        {
          text: '3'
        }
      ]
    ]}
    body= {[
      {
        id: '0001',
        text: '1',
        childs: [
          {
            id: '0002',
            text: '2',
            childs: [
              {
                id: '0004',
                text: '4',
                childs: []
              },
              {
                id: '0005',
                text: '5',
                childs: []
              }
            ]
          },
          {
            id: '0003',
            text: '3',
            childs: [
              {
                id: '0006',
                text: '6',
                childs: []
              },
              {
                id: '0007',
                text: '7',
                childs: []
              }
            ]
          }
        ]
      }
    ]}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});