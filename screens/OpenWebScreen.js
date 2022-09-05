import React, {useState} from 'react';
import { WebView } from 'react-native-webview';
import {View, Text, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';

const OpenWebScreen = ({navigation, route}) => {

  const [progress, setProgress] = useState(0);
  const [isLoaded, setLoaded] = useState(false);

  const url = route.params.url;

  return (
    <>
    {
      !isLoaded ?
      <Progress.Bar progress={progress} width={null} borderWidth={0} borderRadius={0} color='coral' />
      :
      null
    }
      <WebView
        source={{ uri: url }}
        onError={(event) => alert(`${event.nativeEvent.description}`)}
        onLoadEnd={() => setLoaded(true)}
        onLoadProgress = {({nativeEvent}) => setProgress(nativeEvent.progress)}
      />
    </>
  )
}

export default OpenWebScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#222',
      alignItems: 'center',
      justifyContent: 'center'
    },

});
