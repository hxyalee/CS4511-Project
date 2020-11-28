import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import BackgroundDecoration from '../assets/images/background-circles.svg';
import { ImageViewer } from '../components/Post';
import { getUserProfile } from '../requests/user';
import { Avatar } from 'react-native-elements';

interface SavedPostDetailsProps {}

export const SavedPostDetails = (props: any) => {
  const review = props.route.params.review;
  const navigation = props.navigation;
  const [reviewAuthor, setReviewAuthor] = React.useState<any>({});
  const [allReviews, setAllReviews] = React.useState<any>({});
  React.useEffect(() => {
    getUserProfile(review.userHandle).then((res) => {
      setReviewAuthor(res.user);
      setAllReviews(res.reivews);
    });
  }, []);
  const defaultAvatar = (
    <Avatar
      rounded
      title={review.userHandle[0].toUpperCase()}
      overlayContainerStyle={{ backgroundColor: '#BDBDBD' }}
    />
  );
  return (
    <View style={styles.root}>
      <BackgroundDecoration
        style={{
          position: 'absolute',
        }}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          {reviewAuthor && reviewAuthor.image ? (
            <Avatar
              rounded
              source={{ uri: `data:image/gif;base64,${reviewAuthor.image}` }}
              onPress={() =>
                navigation.push('Profile', { username: review.userHandle })
              }
            />
          ) : (
            defaultAvatar
          )}
          <View style={{ marginLeft: 20 }}>
            <Text
              style={{ fontSize: 18, fontWeight: 'bold' }}
              onPress={() =>
                navigation.push('Profile', { username: review.userHandle })
              }
            >
              {review.userHandle}
            </Text>
            <Text
              style={{ fontSize: 12, fontStyle: 'italic', color: '#787878' }}
            >
              Time for Thai
            </Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <ImageViewer images={review.images} />
        </View>
        <View style={styles.detailContainer}>
          <Text>{review.body}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    backgroundColor: '#333',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    margin: 20,
    borderRadius: 300,
  },
  header: {
    width: '100%',
    padding: '5%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    minHeight: 300,
  },
  detailContainer: {
    width: '100%',
    padding: 10,
  },
});
