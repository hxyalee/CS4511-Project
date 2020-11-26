import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { UserNavigationItem } from '../components/UserNavigationItem';

export const ProfilePeopleList = (props: any) => {
  const navigation = props.navigation;
  const users = props.route.params.users;
  return (
    <ScrollView style={styles.container}>
      {users.map((user: any) => (
        <UserNavigationItem
          user={user}
          navigation={navigation}
          key={user.handle}
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
