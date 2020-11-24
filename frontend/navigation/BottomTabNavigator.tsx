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
import {
  BottomTabParamList,
  HomeScreenParamList,
  SearchScreenParamList,
  AddScreenParamList,
  SavedScreenParamList,
  ProfileScreenParamList,
} from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
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
        options={{ headerTitle: 'Feed' }}
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
        options={{ headerTitle: 'Profile' }}
      />
    </ProfileScreenStack.Navigator>
  );
}
