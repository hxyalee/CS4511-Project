import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

import { View, Text } from '../components/Themed';
import FullLogo from '../assets/images/background-circles.svg';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FullLogo />
      {/* change to flat list */}
      <ScrollView>
        <Card containerStyle={styles.post}>
        <Card.Title>Hello</Card.Title>
        <Text>This is my card</Text>
      </Card>
      <Card containerStyle={styles.post}>
        <Card.Title>Hello</Card.Title>
        <Text>This is my card</Text>
      </Card>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  post: {
    borderRadius: 10,
    width: '85%',
  }
});
