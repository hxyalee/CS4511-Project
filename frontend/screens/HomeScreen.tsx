import React, { useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

import { View, Text } from '../components/Themed';
import Post from '../components/Post';
import BackgroundDecoration from '../assets/images/background-circles.svg';
import { getReviews } from '../requests/reviews';

interface Review {
  createdAt: string,
  cuisine: string,
  description: string,
  dietaryOptions: Array<string>,
  id: string,
  imageUrl: string,
  likes: Array<string>,
  price: number,
  rating: number,
  restaurant: string,
  userHandle: string,
};

export default function HomeScreen() {
  const [reviews, setReviews] = useState<Array<Review>>([]);
  const [loadingState, setLoadingState] = useState("loading");

  React.useEffect(() => {
    getReviews()
      .then(res => {
        setReviews(res);
        setLoadingState("success");
      })
      .catch((e) => {
        console.log('Error getting feed: ', e);
        setLoadingState("failed");
      });
  }, []);

  if (loadingState === "loading") {
    return (
      <View style={styles.container}>
          <BackgroundDecoration style={{
            position: 'absolute',
            top: -40,
            left: -40,
            right: 0,
            bottom: 0,
          }}/>
          <Text>Loading...</Text>
      </View>
    );
  }

  if (loadingState === "failed") {
    return (
      <View style={styles.container}>
          <BackgroundDecoration style={{
            position: 'absolute',
            top: -40,
            left: -40,
            right: 0,
            bottom: 0,
          }}/>
          <Text>There was a problem getting the feed.</Text>
      </View>
    );
  }

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
          { reviews && reviews.map((review) => {
            return <Post key={review.id} data={review}/>
          })}
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
