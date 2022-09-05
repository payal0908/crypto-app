import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, StatusBar, Button } from 'react-native';
import ListNews from '../components/ListNews';
import {NEWS_DATA} from '../assets/data/newsData';
import {SAMPLE_DATA} from '../assets/data/sampleData';
import moment from 'moment';
import {getNewsData} from '../services/cryptoNewsDataService';
import {getFilteredNewsData} from '../services/cryptoNewsDataService';
import { xorBy } from 'lodash';
import SelectBox from 'react-native-multi-selectbox'
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

const NewsScreen = ({navigation}) => {
  const { colors } = useTheme();

  const [options, setOptions] = useState(null)

  const [selectedTeam, setSelectedTeam] = useState({})

  const [data, setData] = useState([]);
  const [ref, setRef] = useState(null);

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
    // setOptions()
    setOptions(opt)
    return opt
  }
  
  useEffect(() => {
  
    const fetchNewsData = async () => {
      const newsData = await getNewsData();
      setData(newsData);
    }
  
  
    fetchNewsData();
    // setOptions(getOptions());
    getOptions();
  }, [])
  
  const filteredNews = async (curr) => {
    const newsData = await getFilteredNewsData(curr)
    setData(newsData);
  }


  function onChange() {
    return (val) => {filteredNews(val.id); setSelectedTeam(val)}
    // return (val) => {setSelectedTeam(val)}
  }

  const getTime = (data) => {
    var formattedTime = moment(data || moment.now() ).fromNow();
    return formattedTime;
  }

  const changeScreen = (item) => {
    navigation.navigate('OpenWeb', {'url':item, 'name': 'News'})
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
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={styles.header}>
          <Text style={[styles.titleText, {color: colors.text}]}>News</Text>
        </View>

        <View style={styles.selectView}>
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
              inputFilterStyle={styles.input}
              // optionsLabelStyle = {{}}
            />
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity style={[styles.button, {backgroundColor: colors.card}]}  onPress={() => {
            ref.scrollToIndex({
              animated: true,
              index: 0,
              viewPosition: 0
            })
          }}><Text style={{color: colors.text}}>Scroll to top</Text></TouchableOpacity>
        </View>
        <View style={styles.newsBackground}>
          <FlatList
            keyExtractor={(item) => item.id}
            data = {data.results}
            initialNumToRender = {7}
            ref={(ref) => {
              setRef(ref);
            }}
            renderItem = {({item}) => (
              <ListNews
                title={item.title}
                published_at={getTime(item.published_at)}
                url={item.url}
                onPress={()=>changeScreen(item.url)}
                colors={{colors}}
              />
            )}
          />
        </View>
      </View>
    );
  }
}

export default NewsScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      paddingHorizontal: 16,
    },
    newsBackground: {
      height: "65%"
    },
    input: {
      padding: 5,
      fontWeight: '700',
      fontSize: 15
    },
    buttonView: {
      alignItems: 'flex-end',
      alignSelf: 'flex-end',
      marginTop: 10,
      marginRight: 16
    },
    button: {
      borderRadius: 10,
      padding: 5
    },
    selectView: {
      flexDirection: 'column',
      alignItems:'flex-end',
      marginTop: 15
    },
    header: {
      marginTop: "20%",
    },
    titleText: {
      fontSize: 30,
      fontWeight: "bold"
    }
});
