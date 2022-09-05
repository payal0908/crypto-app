import React from 'react';
import {create} from 'react-test-renderer';

import OpenWebScreen from '../../screens/OpenWebScreen';



test('snapshot', () => {
    const mockedParams = {
        route: { params: { url: 'url' } },
        navigation: ''
      };
    const tree = create(<OpenWebScreen {...mockedParams}/>)
    expect(tree).toMatchSnapshot()
});
