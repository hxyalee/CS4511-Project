import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { follow, unfollow } from '../requests/user';
import { Text, View } from './Themed';

export const UserNavigationItem = (props: any) => {
  const user = props.user;
  const navigation = props.navigation;
  const [following, setFollowing] = React.useState([...props.following]);
  const buttonOutline = following.includes(user.handle) ? 'outline' : 'solid';
  const handleButtonPress = () => {
    if (following.includes(user.handle)) {
      unfollow(user.handle);
      setFollowing(following.filter((u) => user.handle !== u));
    } else {
      follow(user.handle);
      setFollowing([...following, user.handle]);
    }
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.push('Profile', { username: user.handle })}
    >
      <View style={styles.avatarContainer}>
        <Image
          source={require('../assets/images/nopic.jpeg')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.handle}>
        <Text style={{ fontSize: 18 }}>@{user.handle}</Text>
        <Text style={styles.subhandle}>{user.name}</Text>
      </View>
      <View style={{ position: 'absolute', right: 5 }}>
        <Button
          title={`${following.includes(user.handle) ? 'Following' : 'Follow'}`}
          type={buttonOutline}
          onPress={handleButtonPress}
        />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#333',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 5,
  },
  avatarContainer: {
    width: 65,
    height: 65,
    backgroundColor: 'transparent',
    // overflow: 'hidden',
  },
  image: {
    flex: 1,
    borderRadius: 100,
  },
  handle: {
    backgroundColor: 'transparent',
    marginHorizontal: 20,
  },
  subhandle: {
    fontSize: 14,
  },
});
