import React from 'react';
import {create} from 'react-test-renderer';

import NewsScreen from '../../screens/NewsScreen';
jest.useFakeTimers()
const tree = create(<NewsScreen />)

test('snapshot', () => {
  expect(tree).toMatchSnapshot()
});

