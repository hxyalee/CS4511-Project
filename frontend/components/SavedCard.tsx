import React from 'react';
import { Card } from 'react-native-elements';
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

interface SavedCardProps {}

export const SavedCard = (props) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/nopic.jpeg')}
            style={styles.image}
            width={200}
            height={215}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.handle}>@hoyalee</Text>
          <Text style={styles.location}>Time for Thai</Text>
          <Text style={styles.description}>Description.....</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#eee',
    elevation: 5,
    borderRadius: 20,
    paddingHorizontal: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageContainer: {
    overflow: 'hidden',
    maxHeight: 200,
    width: 'auto',
  },
  image: {
    flex: 1,
  },
  textContainer: {
    width: '100%',
    display: 'flex',
  },
  handle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  location: {
    fontSize: 14,
    color: '#565656',
  },

  description: {
    fontSize: 14,
    marginVertical: 5,
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 215,
  },
  shadow: {
    // shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});
