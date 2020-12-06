import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Icon, Rating } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { unsaveReview } from "../requests/reviews";
import { Review } from "../types";
import UserProfileImage from './UserProfileImage';


export function SaveTile(props: {review: Review, removeSelf: any}) {
    const review = props.review;
    const navigation = useNavigation();

    return(
        <View style={styles.root}>
            <TouchableOpacity style={styles.infoContainer} onPress={() => navigation.navigate('Review', { review: review })}>
                <UserProfileImage user={review.userHandle} size={50} />
                <View style={styles.info}>
                    <Text style={styles.restaurantName}>{review.restaurant}</Text>
                    <Text style={styles.userHandle}>{review.userHandle}</Text>
                    <Rating
                        startingValue={review.rating}
                        imageSize={15}
                        showRating={false}
                        readonly
                    />
                </View>
            </TouchableOpacity>
            <Icon
                size={30}
                name={'trash'}
                type="font-awesome"
                color={'#FF5621'}
                onPress={() => {
                    AsyncStorage.getItem('token').then(token => {
                        if (token !== null) {
                            unsaveReview(token, review.id);
                            props.removeSelf(review.id);
                        }
                    });
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        width: '95%',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        marginHorizontal: 10,
        alignItems: 'flex-start',
    },
    restaurantName: {
        color: '#28A5FF',
        fontSize: 18,
    },
    userHandle: {
        fontWeight: 'bold',
    }
});