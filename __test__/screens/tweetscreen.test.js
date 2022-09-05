import React from 'react';
import {create} from 'react-test-renderer';

import TweetsScreen from '../../screens/TweetsScreen';
jest.useFakeTimers()
const tree = create(<TweetsScreen />)

test('snapshot', () => {
  expect(tree).toMatchSnapshot()
});
