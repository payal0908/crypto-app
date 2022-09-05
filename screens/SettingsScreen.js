import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({navigation}) => {

  const [darkMode, setDarkMode] = useState(false)
  const { colors } = useTheme();

  useEffect(() => {
    const getDarkMode = async () => {
      try {
        let getMode = await AsyncStorage.getItem('darkMode');
        setDarkMode(JSON.parse(getMode))
      } catch(err) {
        console.log(err);
      }
    }
    getDarkMode();
  })

  return (
    <View style={[styles.container, {backgroundColor: colors}]}>
      <View style={[styles.data, {backgroundColor: colors.settingsBackground, shadowColor: colors.settingsShadow}]}>
        <Text style={[styles.headerText, {color: colors.text}]}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={val => {
            setDarkMode(val);
            EventRegister.emit('changeThemeEvent', val);
          }}/>
        </View>
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white"
    },
    headerText: {
      fontSize: 25,
      fontWeight: '500',
      marginBottom: 15
    },
    data: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      height: 180,
      borderRadius: 15,
      backgroundColor: '#f6fae6',
      shadowColor: "#7a72d0",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.51,
      shadowRadius: 4.11,
      elevation: 14,
    }
});
