import React from 'react';
import {create} from 'react-test-renderer';

import MarketDataHomeScreen from '../../screens/MarketDataHomeScreen';
jest.useFakeTimers()
const tree = create(<MarketDataHomeScreen />)

test('snapshot', () => {
  expect(tree).toMatchSnapshot()
});