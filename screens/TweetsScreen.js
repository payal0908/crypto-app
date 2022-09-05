import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, StatusBar } from 'react-native';
import ListTweets from '../components/ListTweets';
import {TWEETS_DATA} from '../assets/data/tweetsData';
import moment from 'moment';
import {getTweetsData} from '../services/cryptoTweetsDataService';
import { xorBy } from 'lodash';
import SelectBox from 'react-native-multi-selectbox';
import {getCoinData} from '../services/cryptoMarketDataService';
import { useTheme } from '@react-navigation/native';


const K_OPTIONS = [
{
  item: 'Bitcoin',
  id: 'BTC',
},
{
  item: 'Ethereum',
  id: 'ETH',
},
{
  item: 'Tether',
  id: 'USDT',
},
{
  item: 'Binance Coin',
  id: 'BNB',
},
]


const TweetsScreen = ({navigation}) => {

  const [data, setData] = useState([]);
  const { colors } = useTheme();

  const [options, setOptions] = useState(null)

  const [selectedTeam, setSelectedTeam] = useState({item: 'Bitcoin',
  id: 'BTC',})


  const changeScreen = (item) => {
    navigation.navigate('OpenWeb', {'url':item, 'name': 'Tweet'})
  }

  const fetchTweetsData = async () => {
    const tweetsData = await getTweetsData(selectedTeam);
    setData(tweetsData);
  }
  
  const fetchFilteredData = async (val) => {
    const tdata = await getTweetsData(val);
    setData(tdata);
  }
  
  async function getOptions() {
    let optData = await getCoinData();
    let opt = [];
  
    optData.forEach(val => {
  
        const formattedItem = {
          item: val.name,
          id: val.symbol.toUpperCase()
        }
        opt.push(formattedItem);
    });
    setOptions(opt)
    return opt
  }
  
  useEffect(() => {
  
  
    fetchTweetsData(selectedTeam);
    getOptions();
  }, [])

  function onChange() {
    return (val) => {fetchFilteredData(val); setSelectedTeam(val)}
    // return (val) => {setSelectedTeam(val)}
  }

  const getTime = (data) => {
    var formattedTime = moment(data || moment.now() ).fromNow();
    return formattedTime;
  }
  if((data == null) | (data == []) | (options === null)) {
  // if((data == null) | (data == [])) {
      return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleText}>News</Text>
        </View>
        <View style={styles.dataBackground}>
            <ActivityIndicator size="large" />
        </View>
        <StatusBar style="auto" />
      </View>
    )
  } else {
  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
      <View style={styles.header}>
        <Text style={[styles.titleText, {color: colors.text}]}>Tweets</Text>
      </View>
      <View style={{flexDirection: 'column', alignItems:'flex-end', marginTop: 15}}>
          <SelectBox
            label="Search and select a coin you wish to filter by:"
            options={options}
            value={selectedTeam}
            onChange={onChange()}
            hideInputFilter={false}
            inputPlaceholder="type here..."
            inputFilterContainerStyle = {{backgroundColor: '#fffff2', padding: 2}}
            optionContainerStyle ={{padding: 5}}
            selectedItemStyle={{color: colors.text}}
            labelStyle={{color: colors.text}}
            optionsLabelStyle={{color: colors.text}}
            inputFilterStyle={{padding: 5, fontWeight: '700', fontSize: 15}}
            // optionsLabelStyle = {{}}
          />
      </View>
      <View style={styles.tweetsBackground}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data = {data}
          initialNumToRender = {7}
          renderItem = {({item}) => (
            <ListTweets
              username = {item.user_name}
              dp = {item.user_image_link}
              retweets = {item.retweet_count}
              content = {item.status}
              created = {getTime(item.date)}
              likes = {item.like_count}
              onPress={()=>changeScreen(item.status_link)}
            />
          )}
        />

      </View>
    </View>
  );
}
}

export default TweetsScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      paddingHorizontal: 16
    },
    header: {
      marginTop: "20%",
    },
    titleText: {
      fontSize: 30,
      fontWeight: "bold"
    },
    tweetsBackground: {
      marginTop: 15,
      height: "70%"
    },
});
