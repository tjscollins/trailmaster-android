/*global it expect*/
import 'react-native';
import React from 'react';
import Header from '../src/components/Header';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('should render the headerText prop', () => {
  const header = renderer.create(<Header headerText={'Test'} />).toJSON();
  expect(header).toMatchSnapshot();
});
