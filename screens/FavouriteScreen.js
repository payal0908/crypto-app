import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, FlatList, ActivityIndicator, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {coinInfo} from '../services/cryptoMarketDataService';
import ListFavourites from '../components/ListFavourites';
import { useFocusEffect } from '@react-navigation/native';
import {getMarketData} from '../services/cryptoMarketDataService';
import { useTheme } from '@react-navigation/native';

const FavouriteScreen = ({navigation}) => {

  const [favList, setFavList] = useState([]);
  const [heart, setHeart] = useState(false);
  const [data, setData] = useState([])
  const { colors } = useTheme();

  const changeScreen = async (id) => {
    var res = await getMarketData()
    var i;
    for (i = 0; i < res.length; i++) {
        if (res[i].id === id) {
            navigation.navigate('Chart', {'item':res[i]})
        }
    }
  }

  const removeItem = async () => {
    try {
      await AsyncStorage.removeItem('favourites');
    } catch (err) {
      console.log(err)
    }
  }

  const getItemList = async () => {
    try {
      const favdata = await AsyncStorage.getItem('favourites')
      const output = JSON.parse(favdata)
      if(output == null){
        setFavList([])
      } else {
        setFavList(output);
      }
    }catch(err) {
      console.log(err)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      async function temp(){
        await getItemList()
      }
      temp()
      return () => {

      };
    }, [])
  );


  if ((favList.length<1) | (favList === null)){
      return (
      <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Favourites</Text>
        </View>
        <View style={styles.textView}>
          <Text>Add favourites from the home screen to see them appear here!</Text>
        </View>

        <StatusBar style="auto" />
      </View>
    )
  } else {

    return (
      <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
        <View style={styles.header}>
          <Text style={[styles.headerText, {color: colors.text}]}>Favourites</Text>
        </View>
        <View style={styles.dataBackground}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data = {favList}
            numColumns = {2}
            renderItem = {({item}) => (
              <ListFavourites
                id = {item.id}
                name={item.name}
                logo={item.logo}
                symbol={item.symbol}
                current_price={item.current_price}
                price_change_percentage={item.price_change_percentage}
                onPress={()=>changeScreen(item.id)}
                favList={favList}
                />
            )}
          />
        </View>
      </View>
    );
  }
}

export default FavouriteScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    header: {
      marginTop: "20%",
      paddingHorizontal: 16
    },
    textView: {
      flexWrap:'wrap', marginTop: "20%", marginHorizontal: 16, alignItems: 'flex-start',
      alignSelf: 'center', padding: 15, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 10
    },
    headerText: {
      fontSize: 30,
      fontWeight: "bold"
    },
    dataBackground: {
      width: "100%",
      height: "68%",
      marginTop: 15,
      paddingHorizontal: 16

    }
});
