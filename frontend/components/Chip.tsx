import React from 'react';
import { View, Text } from 'react-native';

export function Chip(props: { value: string, backgroundColor: string, color: string }) {
    return(
        <View style={{
            backgroundColor: props.backgroundColor,
            padding: 5,
            borderRadius: 40,
            marginRight: 5,
        }}>
            <Text style={{
                fontSize: 12,
                color: props.color,
                paddingHorizontal: 10,
            }}>
                {props.value}
            </Text>
        </View>
    );
}