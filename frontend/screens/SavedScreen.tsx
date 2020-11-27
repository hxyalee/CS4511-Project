import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import EditScreenInfo from '../components/EditScreenInfo';
import { SavedCard } from '../components/SavedCard';
import { Text, View } from '../components/Themed';
import { getSaved } from '../requests/reviews';
import BackgroundDecoration from '../assets/images/background-circles.svg';

export default function SavedScreen(props: any) {
  const [reviews, setReviews] = React.useState([]);
  React.useEffect(() => {
    getSaved().then((res) => {
      setReviews(res.reviews);
    });
  }, []);
  return (
    <View style={styles.root}>
      <BackgroundDecoration
        style={{
          position: 'absolute',
          top: -40,
          left: -40,
          right: 0,
          bottom: 0,
        }}
      />
      <ScrollView>
        {reviews.length !== 0 ? (
          reviews.map((review: any) => (
            <View style={styles.separator} key={review.id}>
              <SavedCard review={review} key={review.id} />
            </View>
          ))
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#333',
    height: '100%',
  },
  separator: {
    margin: 20,
  },
});

// fetch('http://localhost:5000/project-4d358/asia-east2/api/getReviews')
//  method:'POST',
//  he
