import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

const ListNews = ({title, published_at, onPress}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.newsContainer, {backgroundColor: colors.dataBackground, shadowColor: colors.newsShadow}]}>
        <Text style={[styles.headlineText, {color: colors.text}]}>{title}</Text>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={{color: colors.text}}>{published_at}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems:'center',
    marginBottom: 10
  },
  newsContainer: {
    borderRadius: 20,
    padding:15,
    backgroundColor: "white",
    width: "95%",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.51,
    shadowRadius: 2.11,
    elevation: 14,
  },
  headlineText:{
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10
  }
});

export default ListNews
