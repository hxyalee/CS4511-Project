import React from "react";
import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Card } from "react-native-elements";

export default function Post () {
    return(
        <Card containerStyle={styles.post}>
            <Card.Title>Hello</Card.Title>
            <Text>This is my card</Text>
        </Card>
    );
}

const styles = StyleSheet.create({
    post: {
        borderRadius: 10,
        width: '100%',
    }
});