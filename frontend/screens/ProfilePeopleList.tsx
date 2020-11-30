import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { UserNavigationItem } from '../components/UserNavigationItem';

export const ProfilePeopleList = (props: any) => {
  const navigation = props.navigation;
  const users = props.route.params.users;
  const following = props.route.params.myFollowing;
  return (
    <ScrollView style={styles.container}>
      {users.length === 0 && (
        <View>
          <Text>No users!</Text>
        </View>
      )}
      {users.map((user: any) => (
        <UserNavigationItem
          user={user}
          navigation={navigation}
          key={user.handle}
          following={following}
        />
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: '5%',
  },
});
