import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
// Screens
import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SavedScreen from '../screens/SavedScreen';
import SearchScreen from '../screens/SearchScreen';
import AddMoreInfoScreen from '../screens/AddMoreInfoScreen';
import {
  BottomTabParamList,
  HomeScreenParamList,
  SearchScreenParamList,
  AddScreenParamList,
  SavedScreenParamList,
  ProfileScreenParamList,
} from '../types';
import { ProfilePeopleList } from '../screens/ProfilePeopleList';
import { SavedPostDetails } from '../screens/SavedPostDetails';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        style: { backgroundColor: '#333' },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-home" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-search" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Add"
        component={AddScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-add-circle-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Saved Posts"
        component={SavedScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-bookmark" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-contact" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeScreenStack = createStackNavigator<HomeScreenParamList>();

function HomeScreenNavigator() {
  return (
    <HomeScreenStack.Navigator>
      <HomeScreenStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'Feed',
        }}
      />
    </HomeScreenStack.Navigator>
  );
}

const SearchScreenStack = createStackNavigator<SearchScreenParamList>();

function SearchScreenNavigator() {
  return (
    <SearchScreenStack.Navigator>
      <SearchScreenStack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerTitle: 'Search' }}
      />
      <SearchScreenStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerTitle: 'Profile' }}
      />
      <SearchScreenStack.Screen
        name="Followers"
        component={ProfilePeopleList}
        options={{ headerTitle: 'Followers' }}
      />
      <SearchScreenStack.Screen
        name="Following"
        component={ProfilePeopleList}
        options={{ headerTitle: 'Following' }}
      />
    </SearchScreenStack.Navigator>
  );
}

const AddScreenStack = createStackNavigator<AddScreenParamList>();

function AddScreenNavigator() {
  return (
    <AddScreenStack.Navigator>
      <AddScreenStack.Screen
        name="Add"
        component={AddScreen}
        options={{ headerTitle: 'Add reviews' }}
      />
      <AddScreenStack.Screen
        name="AddMoreInfo"
        component={AddMoreInfoScreen}
        options={{ headerTitle: 'Add more information' }}
      />
    </AddScreenStack.Navigator>
  );
}
const SavedScreenStack = createStackNavigator<SavedScreenParamList>();

function SavedScreenNavigator() {
  return (
    <SavedScreenStack.Navigator>
      <SavedScreenStack.Screen
        name="Saved Posts"
        component={SavedScreen}
        options={{ headerTitle: 'Saved Posts' }}
      />
      <SavedScreenStack.Screen
        name="Post Details"
        component={SavedPostDetails}
        options={{ headerTitle: 'Posts' }}
      />
      <SavedScreenStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerTitle: 'Profile' }}
      />
      <SavedScreenStack.Screen
        name="Followers"
        component={ProfilePeopleList}
        options={{ headerTitle: 'Followers' }}
      />
      <SavedScreenStack.Screen
        name="Following"
        component={ProfilePeopleList}
        options={{ headerTitle: 'Following' }}
      />
    </SavedScreenStack.Navigator>
  );
}
const ProfileScreenStack = createStackNavigator<ProfileScreenParamList>();

function ProfileScreenNavigator() {
  return (
    <ProfileScreenStack.Navigator>
      <ProfileScreenStack.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{ username: null }}
        options={{ headerTitle: 'Profile' }}
      />
      <ProfileScreenStack.Screen
        name="Followers"
        component={ProfilePeopleList}
        initialParams={{ username: null }}
        options={{ headerTitle: 'Followers' }}
      />
      <ProfileScreenStack.Screen
        name="Following"
        component={ProfilePeopleList}
        initialParams={{ username: null }}
        options={{ headerTitle: 'Following' }}
      />
    </ProfileScreenStack.Navigator>
  );
}
