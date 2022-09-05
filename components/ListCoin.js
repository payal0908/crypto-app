import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

const ListCoin = ({curr, symbol, logo, price, priceChange, onPress }) => {

  const { colors } = useTheme();
  const priceChangeColor = priceChange > 0 ? '#50a860' : '#da3832';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.coinContainer, {shadowColor: priceChangeColor, backgroundColor: colors.card}]}>
        <View style={styles.textBox}>
          <Image source={{uri: logo}} style={styles.coinLogo}></Image>
          <View>
            <Text style={[styles.titleText, {color: colors.text}]}>{curr}</Text>
            <Text style={[styles.subText, {color: colors.text}]}>{symbol.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.numberBox}>
          <Text style={[styles.titleNumber, {color: colors.text}]}>${price.toLocaleString('en-US', {currency: 'USD'})}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[styles.subNumber, {color: priceChangeColor}]}>{priceChange.toFixed(2)}%</Text>
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
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  textBox: {
    flexDirection: "row",
    alignItems: "center"
  },
  coinLogo: {
    height: 48,
    width:48,
    marginRight: 10
  },
  arrowImage: {
    top: 2,
    marginLeft: 5,
    width: 20,
    height: 20,
  },
  numberBox: {
    alignItems: "flex-end"
  },
  titleText: {
    fontSize: 18
  },
  titleNumber: {
    fontSize: 18
  },
  subText: {
    fontWeight: "200",
    marginTop: 5
  },
  subNumber: {
    marginTop: 5,
  },
  coinContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "5%",
    backgroundColor: "white",
    borderRadius: 25,
    width: "95%",
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.51,
    shadowRadius: 1.11,
    elevation: 5,
    marginBottom: 2
  }
})

export default ListCoin
