import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ListFavourites = ({id, name, logo, symbol, current_price, price_change_percentage, onPress, favList}) => {

  const { colors } = useTheme();

  const [heart, setHeart] = useState(true)

  const changeBtn = async () => {
    try {
        const obj = {
          id: id,
          name: name,
          logo: logo,
          symbol: symbol,
          current_price: current_price,
          price_change_percentage: price_change_percentage,
        }
        var filteredArray = favList.filter(e => e.name !== obj.name);
        setHeart(false)
        const output = JSON.stringify(filteredArray);
        await AsyncStorage.setItem('favourites', output)
    } catch(err) {
      console.log(err)
    }

  }

  const priceChangeColor = price_change_percentage > 0 ? '#50a860' : '#da3832';

  return (

    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.coinContainer, {shadowColor: priceChangeColor, backgroundColor: colors.dataBackground}]}>
        <Image source={{uri: logo}} style={styles.coinLogo}/>
        <Text style={[styles.coinNameText, {textAlign: 'center', color: colors.text}]}>{name}</Text>
        <Text style={[styles.subText, {color: colors.text}]}>{symbol.toUpperCase()}</Text>
        <Text style={[styles.priceText, {color: colors.text}]}>${current_price.toLocaleString('en-US', {currency: 'USD'})}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[styles.pricePercentText, {color: priceChangeColor}]}>{price_change_percentage.toFixed(2)}%</Text>
          {priceChangeColor == '#50a860' ?
            (<Image source={require('../assets/icons/up-arrow.png')} resizeMode='contain'
            style={styles.arrowImage}/>)
            :
            (<Image source={require('../assets/icons/down-arrow.png')} resizeMode='contain'
            style={styles.arrowImage}/>)
          }
        </View>
      </View>
    </TouchableOpacity>
  );

}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginTop: 20,
  },
  coinContainer: {
    width: 140,
    margin: 20,
    alignItems: "center",
    marginTop: "2%",
    backgroundColor: "white",
    borderRadius: 25,
    shadowColor: "#000",
    padding: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.61,
    shadowRadius: 2.11,
    elevation: 14,
  },
  arrowImage: {
    top: 5,
    marginLeft: 5,
    width: 20,
    height: 20,
  },
  coinLogo: {
    height: 55,
    width: 55,
  },
  coinNameText: {
    marginTop: 5,
    fontWeight: '600',
    fontSize: 18
  },
  subText: {
    fontWeight: '200'
  },
  pricePercentText: {
    marginTop: 10
  },
  priceText: {
    marginTop: 10,
    fontWeight: '600'
  }
})

export default ListFavourites
