import React, { useState } from "react";
import { Text, Image, StyleSheet, View } from "react-native";
import { Avatar, Card, Icon } from "react-native-elements";
import Swiper from 'react-native-swiper';
import { getUser } from "../requests/user";

import { Review } from '../types';

export default function Post ( props: { data: Review } ) {
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);

    return(
        <Card containerStyle={styles.post}>
            <View style={styles.postHeader}>
                <PostAvatar user={props.data.userHandle} />
                <Text style={styles.username}>{ props.data.userHandle }</Text>
                <PostRating value={props.data.rating} />
            </View>
            <View style={{height: 300}}>
              <ImageViewer images={props.data.images}/>
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
                  ellipsizeMode='tail'>
                    { props.data.body }
                </Text>
            </View>
        </Card>
    );
}

function PostAvatar(props: {user: string}) {
  const [loading, setLoading] = useState(true);
  const [userImage, setUserImage] = useState("");

  React.useEffect(() => {
    setLoading(true);
    getUser(props.user).then((userData) => {
      setLoading(false);
      setUserImage(userData.imageURL);
      // console.log(userData);
    }).catch(e => console.log('Failed to get user'))
  }, [props.user]);

  const defaultAvatar = (<Avatar rounded 
                          title={ props.user[0].toUpperCase() } 
                          overlayContainerStyle={{backgroundColor: '#BDBDBD'}}
                        />);

  return (
    loading || !userImage ? defaultAvatar : 
    <Avatar rounded source={{ uri: `data:image/gif;base64,${userImage}` }}/>
  );
}

function PostRating(props: { value: number }) {
  return (
    <View style={styles.ratingContainer}>
      <Text style={styles.ratingValue}>{props.value}</Text>
      <Icon size={35} name="star" color="#EAC400" />
    </View>
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
                style={styles.actionIcon}
            />
            <Icon
                size={40}
                name={saved}
                type='font-awesome'
                onPress={() => props.setSaved(!props.saved)}
                style={styles.actionIcon}
            />
        </View>
    );
}

function ImageViewer( props: { images: Array<string>}) {
  return (
    <Swiper loop={false} style={styles.imageSwiper}>
      { props.images.map((image, idx) => (
        <View key={idx}>
          <Image source={{uri: `data:image/gif;base64,${image}`}} style={styles.image}/>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  username: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 18,
    flexGrow: 1,
  },
  ratingValue: {
    fontSize: 18,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  imageSwiper: {
    height: 400,
  },
  image: {
    height: 300,
  },
  description: {
    margin: 10,
  },
});
