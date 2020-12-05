import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { AuthStackParamList } from '../types';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useCachedResources from '../hooks/useCachedResources';
import useColorScheme from '../hooks/useColorScheme';
import Navigation from './Navigation';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigation = () => {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'Login',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: 'Register',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Main"
          component={() => (
            <SafeAreaProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </SafeAreaProvider>
          )}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
