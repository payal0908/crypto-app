import React from 'react';
import {create} from 'react-test-renderer';

import SettingsScreen from '../../screens/SettingsScreen';

const tree = create(<SettingsScreen />)

test('snapshot', () => {
  expect(tree).toMatchSnapshot()
});
