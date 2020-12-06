import React, { useEffect, useState } from "react";
import { Text, Image, StyleSheet, View, Dimensions } from "react-native";
import { Card, Button, Icon, Rating } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

import { Review } from '../types';
import UserProfileImage from './UserProfileImage';
import { likeReview, saveReview, unlikeReview, unsaveReview } from "../requests/reviews";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSelf } from "../requests/user";

export default function Post(props: { data: Review }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (token !== null) {
        getSelf(token).then((userData) => {
          if (props.data.liked.includes(userData.user.handle)) {
            setLiked(true);
          }
          if (userData.user.saved.includes(props.data.id)) {
            setSaved(true);
          }
        });
      }
    });
  }, []);

  return (
    <Card containerStyle={styles.post}>
      <View style={styles.postHeader}>
        <UserProfileImage user={props.data.userHandle} size={50} />
        <View style={styles.postHeaderInfo}>
          <Text style={styles.username}>{props.data.userHandle}</Text>
          <Text style={styles.restaurantName}>{props.data.restaurant}</Text>
          <Rating
            startingValue={props.data.rating}
            imageSize={15}
            showRating={false}
            readonly
          />
        </View>
      </View>
      <View style={styles.imageViewer}>
        <ImageViewer images={props.data.images} data={props.data} />
      </View>
      <View style={styles.bottomContainer}>
        <PostActionsContainer
          liked={liked}
          setLiked={setLiked}
          saved={saved}
          setSaved={setSaved}
          reviewId={props.data.id}
        />
        <Text
          style={styles.description}
          numberOfLines={2}
          ellipsizeMode="tail"
          onPress={() => navigation.navigate('Review', { review: props.data })}
        >
          {props.data.body}
        </Text>
      </View>
    </Card>
  );
}

function PostActionsContainer(props: {
  liked: boolean;
  setLiked: any;
  saved: boolean;
  setSaved: any;
  reviewId: string;
}) {
  const heart = props.liked ? 'heart' : 'heart-o';
  const heartColor = props.liked ? '#DC0000' : '#000000';
  const saved = props.saved ? 'bookmark' : 'bookmark-o';

  return (
    <View style={styles.actionContainer}>
      <Icon
        size={40}
        name={heart}
        type="font-awesome"
        color={heartColor}
        onPress={() => {
          if (props.liked) {
            AsyncStorage.getItem('token').then(token => {
              if (token !== null) {
                unlikeReview(token, props.reviewId);
              }
            });
          } else {
            AsyncStorage.getItem('token').then(token => {
              if (token !== null) {
                likeReview(token, props.reviewId);
              }
            });
          }
          props.setLiked(!props.liked);
        }}
        containerStyle={styles.actionIcon}
      />
      <Icon
        size={40}
        name={saved}
        type="font-awesome"
        onPress={() => {
          if (props.saved) {
            AsyncStorage.getItem('token').then(token => {
              if (token !== null) {
                unsaveReview(token, props.reviewId);
              }
            });
          } else {
            AsyncStorage.getItem('token').then(token => {
              if (token !== null) {
                saveReview(token, props.reviewId);
              }
            });
          }
          props.setSaved(!props.saved);
        }}
        containerStyle={styles.actionIcon}
      />
    </View>
  );
}
// Please keep this export coz im using it
export function ImageViewer(props: { images: Array<string>; data: Review }) {
  const navigation = useNavigation();

  return (
    <Swiper loop={false} paginationStyle={styles.pagination}>
      {props.images.map((image, idx) => (
        <View key={idx}>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('Review', { review: props.data })
            }
          >
            <Image
              source={{ uri: `data:image/gif;base64,${image}` }}
              style={styles.image}
            />
          </TouchableWithoutFeedback>
        </View>
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  post: {
    borderRadius: 10,
    width: '100%',
    padding: 0,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  postHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  postHeaderInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 15,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 18,
    flexGrow: 1,
  },
  restaurantName: {
    color: '#28A5FF',
  },
  bottomContainer: {
    marginBottom: 10,
  },
  actionContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  actionIcon: {
    marginLeft: 10,
  },
  pagination: {
    position: 'relative',
    top: 20,
  },
  imageViewer: {
    height: Dimensions.get('window').height * 0.5,
  },
  image: {
    height: '100%',
  },
  description: {
    margin: 10,
  },
});
