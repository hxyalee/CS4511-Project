import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Rating, Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { ScrollView } from 'react-native-gesture-handler';

import { Review } from '../types';
import { Chip } from '../components/Chip';
import UserProfileImage from '../components/UserProfileImage';

export default function ReviewScreen(props: { route: { params: { review : Review}}}) {
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const review = props.route.params.review;

    return(
        <View style={styles.root}>
            <ScrollView style={{ width: '100%' }}>
                <View style={styles.postHeader}>
                    <UserProfileImage user={review.userHandle} size={60}/>
                    <View style={styles.postHeaderDetails}>
                        <Text style={styles.userHandle}>
                            { review.userHandle }
                        </Text>
                        <Text style={styles.restaurantName}>
                            { review.restaurant }
                        </Text>
                        <Rating 
                            startingValue={review.rating}
                            imageSize={20}
                            showRating={false}
                            tintColor={'#222'}
                            readonly
                        />
                    </View>
                </View>
                <View style={styles.imageContainer}>
                    <ImageViewer images={review.images} />
                </View>
                <View style={styles.bottomContainer}>
                    <PostActionsContainer 
                        liked={liked}
                        setLiked={setLiked}
                        saved={saved}
                        setSaved={setSaved}
                    />
                    <Text style={styles.description}>{review.body}</Text>
                    <View style={styles.chipContainer}>
                        { review.price > 0 && 
                            <Chip value={'$'.repeat(review.price)} backgroundColor="#5E72E4" color="#FFFFFF"/>
                        }
                        { review.cuisine.map((label, idx) => (
                            <Chip key={idx} value={label} backgroundColor="#5E72E4" color="#FFFFFF"/>
                        ))}
                        { review.dietary.map((label, idx) => (
                            <Chip key={idx} value={label} backgroundColor="#5E72E4" color="#FFFFFF"/>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

function ImageViewer( props: { images: Array<string>}) {
    return (
        <Swiper loop={false} paginationStyle={styles.pagination}>
            { props.images.map((image, idx) => (
              <View key={idx} style={styles.imageContainer}>
                <Image source={{uri: `data:image/gif;base64,${image}`}} style={styles.image}/>
              </View>
            ))}
          </Swiper>    
    );
}

function PostActionsContainer(
    props: {liked: boolean, setLiked: any, saved: boolean, setSaved: any}) {
    
    const heart = (props.liked) ? 'heart' : 'heart-o';
    const heartColor = (props.liked) ? '#DC0000' : '#FFF';
    const saved = (props.saved) ? 'bookmark' : 'bookmark-o';

    return (
        <View style={styles.actionContainer}>
            <Icon 
                size={40}
                name={heart}
                type='font-awesome'
                color={heartColor}
                onPress={() => props.setLiked(!props.liked)}
            />
            <Icon
                size={40}
                name={saved}
                type='font-awesome'
                color="#FFF"
                onPress={() => props.setSaved(!props.saved)}
                containerStyle={{ marginLeft: 10}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#222',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    postHeader: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
    },
    postHeaderDetails: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 20,
    },
    userHandle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    restaurantName: {
        color: '#28A5FF',
    },
    pagination: {
        position: 'relative',
        top: 20,
    },
    image: {
        height: '100%',
    },
    imageContainer: {
        height: Dimensions.get('window').height * 0.6,
    },
    bottomContainer: {
        margin: 10,
    },
    description: {
        color: "#fff",
    },
    actionContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    chipContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 5,
    },
});