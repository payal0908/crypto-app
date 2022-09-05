import React from 'react';
import {create} from 'react-test-renderer';
import { NavigationContext } from "@react-navigation/native"


import FavouriteScreen from '../../screens/FavouriteScreen';



const navContext = {
    isFocused: () => true,
    // addListener returns an unscubscribe function.
    addListener: jest.fn(() => jest.fn())
}



test('renders correctly', () => {

    create(
        <NavigationContext.Provider value={navContext}>
            <FavouriteScreen />
        </NavigationContext.Provider>
    )
});