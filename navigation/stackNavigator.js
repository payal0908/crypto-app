import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MarketDataHomeScreen from '../screens/MarketDataHomeScreen';
import NewsScreen from '../screens/NewsScreen';
import TweetsScreen from '../screens/TweetsScreen';
import ChartScreen from '../screens/ChartScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import OpenWebScreen from '../screens/OpenWebScreen';

const Stack = createNativeStackNavigator();


const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Home" component={MarketDataHomeScreen} />
      <Stack.Screen options={{headerShown: true}} name="Chart" component={ChartScreen} />
    </Stack.Navigator>
  );
}

const FavStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Favourites" component={FavouriteScreen} />
      <Stack.Screen options={{headerShown: true}} name="Chart" component={ChartScreen} />
    </Stack.Navigator>
  );
}

const WebStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="News" component={NewsScreen} />
      <Stack.Screen options={({ route }) => ({headerShown: true, title: route.params.name })} name="OpenWeb" component={OpenWebScreen} />
    </Stack.Navigator>
  )
}

const TweetsWebStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Tweets" component={TweetsScreen} />
      <Stack.Screen options={({ route }) => ({headerShown: true, title: route.params.name })} name="OpenWeb" component={OpenWebScreen} />
    </Stack.Navigator>
  )
}

export { MainStackNavigator, FavStackNavigator, WebStackNavigator, TweetsWebStackNavigator };
