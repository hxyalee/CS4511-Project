import React, { useState } from "react";
import { Text, Image, StyleSheet, View } from "react-native";
import { Avatar, Card, Icon } from "react-native-elements";

import { Review } from '../types';

export default function Post ( props: { data: Review } ) {
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);

    return(
        <Card containerStyle={styles.post}>
            <View style={styles.postHeader}>
                <Avatar rounded title="MT" overlayContainerStyle={{backgroundColor: '#BDBDBD'}}/>
                <Text style={styles.username}>{ props.data.userHandle }</Text>
                <PostRating value={props.data.rating} />
            </View>
            <Image
                source={{
                    uri: 'https://assets.bonappetit.com/photos/5b9a901947aaaf7cd9ea90f2/16:9/w_2560%2Cc_limit/ba-recipe-pasta-al-limone.jpg',
                }}
                style={{ height: 300 }}
            />
            <View style={styles.bottomContainer}>
                <Text numberOfLines={2} ellipsizeMode='tail'>{ props.data.description }</Text>
                <PostActionsContainer liked={liked} setLiked={setLiked} saved={saved} setSaved={setSaved}/>
            </View>
        </Card>
    );
}

function PostRating(props: {value: number}) {
    return (
        <View style={styles.ratingContainer}>
            <Text style={styles.ratingValue}>{props.value}</Text>
            <Icon size={35} name='star' color='#EAC400'/>
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
            />
            <Icon
                size={40}
                name={saved}
                type='font-awesome'
                onPress={() => props.setSaved(!props.saved)}
            />
        </View>
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
        padding: 10,
    },
    actionContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    }
});