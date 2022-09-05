import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MarketDataHomeScreen from '../screens/MarketDataHomeScreen';
import NewsScreen from '../screens/NewsScreen';
import ChartScreen from '../screens/ChartScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TweetsScreen from '../screens/TweetsScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import { MainStackNavigator, FavStackNavigator, WebStackNavigator, TweetsWebStackNavigator } from "./stackNavigator";
import { useTheme, getFocusedRouteNameFromRoute } from '@react-navigation/native';


const Tab  = createBottomTabNavigator();


const StarButton = ({children, onPress}) => (
  <TouchableOpacity
    style={[styles.starButtonContainer, {...styles.shadow}]}
    onPress={onPress}
  >
    <View
      style={styles.starButton}
    >
      {children}
    </View>
  </TouchableOpacity>
)

const Tabs = () => {

  let screenHeight = Dimensions.get('window').height;
  let tabHeight = screenHeight / 11;  const { colors } = useTheme();
  return (
    <Tab.Navigator

    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: [styles.tabBar, {
          backgroundColor: colors.tabBackground,
          height: tabHeight,
          shadowColor: colors.shadowColor,
      }]}}>
      <Tab.Screen name="HomeS" component={MainStackNavigator} options={{
        tabBarIcon: ({focused}) => (
          <View style={[styles.tabIcon, {top: Platform.OS === 'ios'? 10: null}]}>
            <Image
              source={require('../assets/icons/home.png')}
              resizeMode='contain'
              style={[styles.tabImage, {
                tintColor: focused ? '#e32f45' : '#748c94'
              }]}
            />
            <Text style={[styles.tabIconText, {
              color: focused ? '#e32f45' : '#748c94',
            }]}>Home</Text>
          </View>
        ),
      }}/>
      <Tab.Screen name="NewsS" component={WebStackNavigator}

      options=
      {({ route }) => ({
              tabBarStyle:
              [styles.tabBar, {backgroundColor: colors.tabBackground,
              height: tabHeight,
              shadowColor: colors.shadowColor}, ((route) => {
                const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                if (routeName === 'OpenWeb') {
                  return { display: "none" }
                }
                return
              })(route)],

              tabBarIcon: ({focused}) => (
                <View style={[styles.tabIcon, {top: Platform.OS === 'ios'? 10: null}]}>
                  <Image
                    source={require('../assets/icons/newspaper.png')}
                    resizeMode='contain'
                    style={[styles.tabImage, {
                      tintColor: focused ? '#e32f45' : '#748c94'
                    }]}
                  />
                  <Text style={[styles.tabIconText, {
                    color: focused ? '#e32f45' : '#748c94',
                  }]}>News</Text>
                </View>
              )})}/>
      <Tab.Screen name="Favourite" component={FavStackNavigator} options={{
        tabBarIcon: ({focused}) => (
          <Image source={require('../assets/icons/star.png')}
          resizeMode='contain'
          style={{
            width: 30,
            height: 30,
            tintColor: focused ? '#e3d12f' : 'white'
          }}
          />
        ),
        tabBarButton: (props) => (
          <StarButton {...props}/>
        )
      }}/>
      <Tab.Screen name="TweetsS" component={TweetsWebStackNavigator}

      options=
      {({ route }) => ({
              tabBarStyle:
              [styles.tabBar, {backgroundColor: colors.tabBackground,
              height: tabHeight,
              shadowColor: colors.shadowColor}, ((route) => {
                const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                if (routeName === 'OpenWeb') {
                  return { display: "none" }
                }
                return
              })(route)],

              tabBarIcon: ({focused}) => (
                <View style={[styles.tabIcon, {top: Platform.OS === 'ios'? 10: null}]}>
                  <Image
                    source={require('../assets/icons/twitter.png')}
                    resizeMode='contain'
                    style={[styles.tabImage, {
                      tintColor: focused ? '#e32f45' : '#748c94'
                    }]}
                  />
                  <Text style={[styles.tabIconText, {
                    color: focused ? '#e32f45' : '#748c94',
                  }]}>Tweets</Text>
                </View>
              )})}/>
      <Tab.Screen name="Settings" component={SettingsScreen} options={{
        tabBarIcon: ({focused}) => (
          <View style={[styles.tabIcon, {top: Platform.OS === 'ios'? 10: null}]}>
            <Image
              source={require('../assets/icons/settings.png')}
              resizeMode='contain'
              style={[styles.tabImage, {
                tintColor: focused ? '#e32f45' : '#748c94'
              }]}
            />
            <Text style={[styles.tabIconText, {
              color: focused ? '#e32f45' : '#748c94',
            }]}>Settings</Text>
          </View>
        ),
      }}/>
    </Tab.Navigator>
  )
}

export default Tabs;

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  },
  starButtonContainer: {
    top: -30,
    justifyContent: "center",
    alignItems: "center"
  },
  starButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#4dbbd1'
  },
  tabBar: {
    position: 'absolute',
    borderTopWidth: 0,
    borderRadius: 15,
    bottom: 25,
    left: 20,
    right: 20,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elavation: 5
  },
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabImage: {
    marginTop: 10,
    marginBottom: 5,
    width: 30,
    height: 30,
  },
  tabIconText: {
    fontSize: 12
  }
});
