import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import EditScreenInfo from '../components/EditScreenInfo';
import { SavedCard } from '../components/SavedCard';
import { Text, View } from '../components/Themed';
import { getSaved } from '../requests/reviews';
import BackgroundDecoration from '../assets/images/background-circles.svg';
import Post from '../components/Post';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SavedScreen(props: any) {
  const navigation = props.navigation;
  const [reviews, setReviews] = React.useState([]);
  const [token, setToken] = React.useState<null | string>('');
  const [loading, setLoading] = React.useState(true);
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
  }, []);
  React.useEffect(() => {
    if (!token) return;
    getSaved(token)
      .then((res) => {
        setReviews(res.reviews);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [token]);

  if (loading) {
    return (
      <Text>Loading...</Text>
    );
  }

  return (
    <View style={styles.root}>
      <BackgroundDecoration
        style={{
          position: 'absolute',
        }}
      />
      <ScrollView style={{ width: '100%' }} contentContainerStyle={styles.feed}>
        {reviews && reviews.length !== 0 ? (
          reviews.map((review: any) => <Post data={review} key={review.id} />)
        ) : (
          <View style={styles.emptyList}>
            <Text style={styles.heading}>You have no saved posts</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#333',
    height: '100%',
    width: '100%',
  },
  separator: {
    margin: 20,
  },
  feed: {
    alignItems: 'center',
    margin: 10,
  },
  emptyList: {
    backgroundColor: '#333',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
  },
});

// fetch('http://localhost:5000/project-4d358/asia-east2/api/getReviews')
//  method:'POST',
//  he
