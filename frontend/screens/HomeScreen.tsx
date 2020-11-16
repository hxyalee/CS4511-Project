import * as React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

import { View, Text } from '../components/Themed';
import Post from '../components/Post';
import BackgroundDecoration from '../assets/images/background-circles.svg';

export default function HomeScreen() {
  return (
      <View style={styles.container}>
        {/* change to flat list */}
        <ScrollView style={{ width: '100%' }} contentContainerStyle={styles.feed}>
          <BackgroundDecoration style={{
            position: 'absolute',
            top: -40,
            left: -40,
            right: 0,
            bottom: 0,
          }}/>
          <Post/>
          <Post/>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  feed: {
    alignItems: 'center',
    margin: 10,
  },

});
