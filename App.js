import { StatusBar } from 'expo-status-bar';
import {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ListCoin from './components/ListCoin';
import {SAMPLE_DATA} from './assets/data/sampleData';
import {MyTheme, MyDarkTheme} from './themes/appThemes';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/tabs';
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [darkApp, setDarkApp] = useState(false)
  const appTheme = darkApp ? MyDarkTheme : MyTheme

  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      'changeThemeEvent',
      data => {
        AsyncStorage.setItem('darkMode', JSON.stringify(data));
        setDarkApp(data);
      }
    )
    const getDarkMode = async () => {
      let getMode = await AsyncStorage.getItem('darkMode');
      setDarkApp(JSON.parse(getMode))
    }
    getDarkMode();
    return() =>{
      EventRegister.removeEventListener(eventListener);
    }
  })

  return (
      <NavigationContainer theme={appTheme}>
        <Tabs />
      </NavigationContainer>
  );
}


const styles = StyleSheet.create({

});
