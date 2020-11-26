import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import EditScreenInfo from '../components/EditScreenInfo';
import { SavedCard } from '../components/SavedCard';
import { Text, View } from '../components/Themed';
import { getSaved } from '../requests/reviews';

export default function SavedScreen(props: any) {
  const [reviews, setReviews] = React.useState([]);
  React.useEffect(() => {
    getSaved().then((res) => {
      setReviews(res.reviews);
    });
  }, []);
  return (
    <ScrollView>
      {reviews.length !== 0 ? (
        reviews.map((review) => (
          <View style={styles.separator}>
            <SavedCard review={review} key={review.id} />
          </View>
        ))
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    margin: 20,
  },
});

// fetch('http://localhost:5000/project-4d358/asia-east2/api/getReviews')
//  method:'POST',
//  he
