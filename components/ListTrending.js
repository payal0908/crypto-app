import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';

const ListTrending = ({name, logo, symbol}) => {

  const { colors } = useTheme();

  let screenWidth = Dimensions.get('window').width;
  let dataWidth = (0.25 * screenWidth);

  let fontS = 14

  if(screenWidth < 428 ){
      fontS = 12;
  }

    return (

      <View style={{padding: 10}}>
        <TouchableOpacity style={[styles.trendingContainer, {shadowColor: colors.trendingShadow}]}>
          <View style={[styles.trendingData, {width: dataWidth}]}>
              <Image source={{uri: logo}} style={styles.logo}/>
              <Text style={[styles.currName, {fontSize: fontS}]}>{name}</Text>
              <Text style={[styles.currSymbol, {fontSize: fontS}]}>{symbol.toUpperCase()}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );

}

const styles = StyleSheet.create({
  trendingContainer: {
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: 'white',
    borderRadius: 25,
    shadowColor: "blue",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.51,
    shadowRadius: 4.11,
    elevation: 14,
  },
  trendingData: {
    width: 140,
    alignItems: "center",
    padding: 5
  },
  logo: {
    width: 30,
    height: 30,
    marginBottom: 5
  },
  currName: {
    fontSize: Platform.OS === 'ios'? 15 : 12,
    fontWeight: '600'
  },
  currSymbol: {
    fontSize: Platform.OS === 'ios'? 15 : 12,
    fontWeight: '200'
  }
})

export default ListTrending
