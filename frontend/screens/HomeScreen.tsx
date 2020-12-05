import React, { useState } from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { View, Text } from '../components/Themed';
import Post from '../components/Post';
import BackgroundDecoration from '../assets/images/background-circles.svg';
import { getReviews } from '../requests/reviews';
import { Review } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [reviews, setReviews] = useState<Array<Review>>([]);
  const [loadingState, setLoadingState] = useState('loading');
  const [token, setToken] = useState<null | string>('');
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setToken(token);
    } catch {
      console.log('no token');
    }
  };
  React.useEffect(() => {
    getToken();
    if (!token) return;
    getReviews(token)
      .then((res) => {
        setReviews(res);
        setLoadingState('success');
      })
      .catch((e) => {
        console.log('Error getting feed: ', e);
        setLoadingState('failed');
      });
  }, [token]);

  if (loadingState === 'loading') {
    return (
      <View style={styles.container}>
        <BackgroundDecoration
          style={{
            position: 'absolute',
          }}
        />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (loadingState === 'failed') {
    return (
      <View style={styles.container}>
        <BackgroundDecoration
          style={{
            position: 'absolute',
          }}
        />
        <Text>There was a problem getting the feed.</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <BackgroundDecoration
        style={{
          position: 'absolute',
        }}
      />
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={styles.feed}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={false}
        //     onRefresh={() => {
        //       getToken();
        //       if (!token) return;
        //       getReviews(token)
        //         .then((res) => {
        //           setReviews(res);
        //           setLoadingState('success');
        //         })
        //         .catch((e) => {
        //           console.log('Error getting feed: ', e);
        //           setLoadingState('failed');
        //         });
        //     }}
        //   />
        // }
      >
        {reviews &&
          reviews.map((review) => {
            return <Post key={review.id} data={review} />;
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    height: '100%',
  },
  feed: {
    alignItems: 'center',
    margin: 10,
  },
});
