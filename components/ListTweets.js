import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

const ListTweets = ({username, dp, retweets, content, created, likes, onPress}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.tweetContainer, {backgroundColor: colors.dataBackground, shadowColor: colors.newsShadow}]}>
      <View style={styles.tweetContent}>
          <Image source={{uri: dp}}
          resizeMode='contain'
          style={styles.userImage}
          />
          <View style={{marginBottom: 10}}>
            <Text style={[styles.headlineText, {color: colors.text}]}>{username}</Text>
            <View style={{maxWidth: "92%"}}>
              <Text style={{color: colors.text, fontSize: 14}}>{content}</Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection:'row', alignItems: 'flex-start'}}>
            <Image source={require('../assets/icons/refresh.png')}
            resizeMode='contain'
            style={styles.sharedImage}
            />
            <Text style={{marginRight: 10, marginTop: 2, color: colors.text}}>{retweets}</Text>
            <Image source={require('../assets/icons/heart.png')}
            resizeMode='contain'
            style={styles.sharedImage}
            />
            <Text style={{marginTop: 2, color: colors.text}}>{likes}</Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={{color: colors.text}}>{created}</Text>
          </View>
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
    marginBottom: 20
  },
  tweetContainer: {
    borderRadius: 20,
    padding:15,
    backgroundColor: "white",
    width: "95%",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.31,
    shadowRadius: 2.11,
    elevation: 14,
  },
  tweetContent: {
    flexDirection: 'row',
  },
  headlineText:{
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10
  },
  userImage: {
    marginBottom: 5,
    borderRadius: 25,
    width: 50,
    height: 50,
    marginRight: 10
  },
  sharedImage: {
    width: 20,
    height: 20,
    marginRight: 5
  }
});

export default ListTweets
