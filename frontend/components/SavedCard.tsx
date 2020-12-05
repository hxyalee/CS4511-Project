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
import { ImageViewer } from './Post';
import Post from './Post';
interface SavedCardProps {}

export const SavedCard = (props: any) => {
  const review = props.review;
  const navigation = props.navigation;
  return <Post data={review} />;
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#eee',
    backfaceVisibility: 'hidden',
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
});
