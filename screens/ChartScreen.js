import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Button } from 'react-native';
import {ChartDot, ChartPath, ChartPathProvider, ChartYLabel} from '@rainbow-me/animated-charts';
import {useSharedValue} from 'react-native-reanimated';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';



export const {width: SIZE} = Dimensions.get('window');

const ChartScreen = ({navigation, route}) => {

  const val = route.params.item;

  const latestCurrentPrice = useSharedValue(val.current_price);
  const [chartReady, setChartReady] = useState(false);
  const [heart, setHeart] = useState(false);
  const [favList, setFavList] = useState([]);
  const { colors } = useTheme();


  function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].name === obj.name) {
            return true;
        }
    }

    return false;
}

  const getItemList = async () => {
    try {
      const favdata = await AsyncStorage.getItem('favourites')
      if (favdata !== null) {
        const output = JSON.parse(favdata)
        if (containsObject(val, output)) {
          setHeart(true)
        }
        setFavList(output);
      }
    }catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    async function temp(){
      await getItemList();
    }

    temp()
    latestCurrentPrice.value = val.current_price;

    setTimeout(() => {
      setChartReady(true);
    }, 0)

  }, [val.current_price])


  const priceChangeColor = val.price_change_percentage_7d_in_currency > 0 ? '#50a860' : '#da3832';


  const changeBtn = async () => {
    try {
        const obj = {
          id: val.id,
          name: val.name,
          logo: val.image,
          symbol: val.symbol,
          current_price: val.current_price,
          price_change_percentage: val.price_change_percentage_7d_in_currency,
        }
      if (heart == false) {

        setHeart(true)

        favList.push(obj)
        const output = JSON.stringify(favList);
        await AsyncStorage.setItem('favourites', output);
      } else {
        var filteredArray = favList.filter(e => e.name !== obj.name);
        setHeart(false)
        setFavList(filteredArray)
        const output = JSON.stringify(filteredArray);
        await AsyncStorage.setItem('favourites', output)
      }
    } catch(err) {
      console.log('error')
    }

  }

  const formatPrice = value => {
    'worklet';
    if (value == '' ) {
      return `$${latestCurrentPrice.value.toLocaleString('en-US', {currency: 'USD'})}`;
    } else {
      const formatVal =`$${parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
      return formatVal;
    }
  };

  return (
    <ChartPathProvider data={{points: val.sparkline_in_7d.price, smoothingStrategy: 'bezier'}}>
      <View style={[styles.container, {backgroundColor: colors.dataBackground}]}>
        <View style={styles.header}>
          <Image source={{uri: val.image}} style={styles.coinLogo}/>
          <View style={[styles.titleText, {width: "75%"}]}>
            <View style={styles.titleRow}>
              <Text style={[styles.currnameText, {color: colors.text}]}>{val.name}</Text>
                {heart == false ?
                  (<FontAwesome.Button name="heart-o" size={24} color="black" backgroundColor={colors.heartBackground} iconStyle={{marginLeft: 10}} onPress={changeBtn}></FontAwesome.Button>)
                  :
                  (<FontAwesome.Button name="heart" size={24} color="black" backgroundColor={colors.heartBackground} iconStyle={{marginLeft: 10}} onPress={changeBtn}></FontAwesome.Button>)
                }
            </View>
            <View style={styles.chartBox}>
              <ChartYLabel
                format={formatPrice}
                style={[styles.currPriceText, {color: colors.text}]}
              />
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.subNumber,{color: priceChangeColor}]}>{val.price_change_percentage_7d_in_currency.toFixed(2)}%</Text>
                {priceChangeColor == '#50a860' ?
                  (<Image source={require('../assets/icons/up-arrow.png')} resizeMode='contain'
                  style={styles.arrowImage}/>)
                  :
                  (<Image source={require('../assets/icons/down-arrow.png')} resizeMode='contain'
                  style={styles.arrowImage}/>)
                }
              </View>
            </View>
          </View>
        </View>
        {chartReady ?
          (<View style={[styles.chart, {backgroundColor: colors.card, shadowColor: colors.newsShadow}]}>
            <ChartPath height={SIZE / 2} stroke={priceChangeColor} width={SIZE - 21} strokeWidth={1.7}/>
            
            <ChartDot style={styles.chartDot} />
          </View>)
          :
          null
        }
        <View style={styles.range}>
          <Text style={styles.rangeText}>7d</Text>
        </View>
      </View>

    </ChartPathProvider>
  );
}

export default ChartScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white"
    },
    range: {
      marginTop: 5,
      alignItems: 'center',
      alignSelf: 'center',
      paddingHorizontal: 16,
      paddingVertical: 2,
      borderRadius: 15,
      backgroundColor: '#e8e8e8',
      borderWidth: 1,
      borderColor: 'lightgray'
    },
    rangeText: {
      fontWeight: '300'
    },
    chart: {
      backgroundColor: "white",
      borderRadius: 15,
      margin: 10,
      marginTop: "20%",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.21,
      shadowRadius: 5.11,
      elevation: 14,
    },
    chartBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    arrowImage: {
      top: 2,
      marginLeft: 5,
      width: 20,
      height: 20,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'space-between'
    },
    chartDot: {
      backgroundColor: 'black',
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 5.81,
      shadowRadius: 10.11,
      elevation: 14,
    },
    header: {
      marginTop: 15,
      paddingHorizontal: 20,
      flexDirection: "row",
      alignItems: "center"
    },
    coinLogo: {
      width: 80,
      height: 80
    },
    subNumber: {
      marginTop: 5
    },
    currnameText: {
      fontSize: 25,
      fontWeight: "300"
    },
    currPriceText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: "2%",
    },
    titleText: {
      marginLeft: "4%"
    }
});
