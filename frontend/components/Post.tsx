import React, { useState } from "react";
import { Text, Image, StyleSheet, View, Dimensions, TouchableHighlight } from "react-native";
import { Card, Button, Icon, Rating } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

import { Review } from '../types';
import UserProfileImage from './UserProfileImage';

export default function Post ( props: { data: Review } ) {
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const navigation = useNavigation();

    return(
        <Card containerStyle={styles.post}>
            <View style={styles.postHeader}>
                <UserProfileImage user={props.data.userHandle} size={50}/>
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
                />
                <Text 
                  style={styles.description}
                  numberOfLines={2}
                  ellipsizeMode='tail'
                  onPress={() => navigation.navigate('Review', { review: props.data })}
                >
                    { props.data.body }
                </Text>
            </View>
        </Card>
    );
}

function PostActionsContainer(
    props: {liked: boolean, setLiked: any, saved: boolean, setSaved: any}) {
    
    const heart = (props.liked) ? 'heart' : 'heart-o';
    const heartColor = (props.liked) ? '#DC0000' : '#000000';
    const saved = (props.saved) ? 'bookmark' : 'bookmark-o';

    return (
        <View style={styles.actionContainer}>
            <Icon 
                size={40}
                name={heart}
                type='font-awesome'
                color={heartColor}
                onPress={() => props.setLiked(!props.liked)}
                containerStyle={styles.actionIcon}
            />
            <Icon
                size={40}
                name={saved}
                type='font-awesome'
                onPress={() => props.setSaved(!props.saved)}
                containerStyle={styles.actionIcon}
            />
        </View>
    );
}

function ImageViewer( props: { images: Array<string>, data: Review}) {
  const navigation = useNavigation();

  return (
      <Swiper loop={false} paginationStyle={styles.pagination}>
          { props.images.map((image, idx) => (
            <View key={idx}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Review', { review: props.data })}
              >
                <Image source={{uri: `data:image/gif;base64,${image}`}} style={styles.image} />
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
  },
  postHeader: {
    flex: 1,
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
    height: 400,
  },
  image: {
    height: '100%',
  },
  description: {
    margin: 10,
  },
});
