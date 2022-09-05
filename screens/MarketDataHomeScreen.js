import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions, SafeAreaView, Image, Button, ScrollView, Platform} from 'react-native';
import { StatusBar } from 'react-native';
import {SAMPLE_DATA} from '../assets/data/sampleData';
import ListCoin from '../components/ListCoin';
import {getMarketData, getTrendingCoins} from '../services/cryptoMarketDataService';
import { useTheme } from '@react-navigation/native';
import ListTrending from '../components/ListTrending';
import Animated, {AnimatedLayout, SlideInDown} from 'react-native-reanimated';

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);


const MarketDataHomeScreen = ({navigation}) => {
  const { colors } = useTheme();
  let screenWidth = Dimensions.get('window').width;
  let screenHeight = Dimensions.get('window').height;
  const [data, setData] = useState([]);
  const [trendingData, setTrendingData] = useState([])

  const MINUTE_MS = 5000;

  let dataHeight = (0.52 * screenHeight);
  useEffect(() => {
  
    const interval = setInterval(() => {
      const fetchMarketData = async () => {
        const marketData = await getMarketData();
        setData(marketData);
      }
      const fetchTrendingData = async () => {
        const res = await getTrendingCoins();
        setTrendingData(res['coins']);
      }
      fetchTrendingData();
      fetchMarketData();
    }, MINUTE_MS);
  
    return () => clearInterval(interval);
  
  
  }, [])

  if (colors.background === 'rgb(18, 18, 18)'){
    StatusBar.setBarStyle('light-content', true);
  } else {
    StatusBar.setBarStyle('dark-content', true);
  }

  const changeScreen = (item) => {
    navigation.navigate('Chart', {'item':item})
  }
  // if (data == null){
  // if((data == null) | (data.length < 1)) {
  if((data == null) | (data == []) | (trendingData.length < 1 ) | (trendingData === []) | (trendingData === null)) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.WelcomeText}>Market Data</Text>
        </View>
        <View style={styles.dataBackground}>
            <ActivityIndicator size="large" />
        </View>
        <StatusBar style="auto" />
      </View>
    )
  } else {
    return (
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={styles.header}>
          <Text style={[styles.WelcomeText, {color: colors.text}]}>Market Data</Text>
        </View>
        <View style={[styles.trendingContainer, {backgroundColor: colors.trendingBackground}]}>
          <View style={styles.trendingHeader}>
            <Text style={styles.trendingTitle}>24 Hour Trending: </Text>
          </View>
          <View style={{marginRight: 10}}>
            <ScrollView horizontal={true}>
              {SAMPLE_DATA.map((item, index) => {
                return (
                  // <ListTrending key={index} name={item['item'].name} logo={item['item'].small} symbol={item['item'].symbol}/>
                  <ListTrending key={index} name={item.name} logo={item.image} symbol={item.symbol}/>
                )
              })}
            </ScrollView>
          </View>
        </View>
        <Animated.View entering={SlideInDown.delay(100)}>
        <View style={[styles.dataBackground, {backgroundColor: colors.dataBackground}]}>
          <View style={{height: dataHeight}}>
            <FlatList
              keyExtractor={(item) => item.id}
              data = {data}
              initialNumToRender = {7}
              renderItem = {({item}) => (
                <ListCoin
                  curr={item.name}
                  symbol={item.symbol}
                  logo={item.image}
                  price={item.current_price}
                  priceChange={item.price_change_percentage_7d_in_currency}
                  onPress={()=>changeScreen(item)}
                />
              )}
            />
            </View>
          </View>
          </Animated.View>
        <StatusBar StatusBarStyle='dark-content' style='autpo'/>
      </View>
    )
  }
};

export default MarketDataHomeScreen;

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebedfc',
  },
  header: {
    marginTop:  Platform.OS === 'ios'? "20%" :"10%",
    paddingHorizontal: 16
  },
  WelcomeText: {
    fontSize: 30,
    fontWeight: "bold"
  },
  dataBackground: {
    marginTop: 10,
    backgroundColor: "white",
    height: "100%",
    borderRadius: 30,
    shadowColor: "#000",
    padding: 10,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.21,
    shadowRadius: 5.11,
    elevation: 14,
  },
  trendingContainer: {
    borderRadius: 20,
    margin: 10,
    backgroundColor: '#c6d5f7'
  },
  trendingHeader: {
    padding: 6,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginTop: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'flex-start',
    alignSelf: 'flex-start'
  },
  trendingTitle: {
    fontSize: Platform.OS === 'ios'? 18 : 15,
    fontWeight: '500',
    color: '#3b41a1'
  },
})
