import React, { useState, useEffect } from 'react';
import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Button, withTheme } from 'react-native-elements';
import BackgroundDecoration from '../assets/images/login-detail.svg';
import BurgerIcon from '../assets/images/burger.svg';
import BurgerHeart from '../assets/images/burgerheart.svg';
import PasswordIcon from '../assets/images/passwordIcon.svg';
import UsernameIcon from '../assets/images/usernameIcon.svg';
import { NavigationScreenProp } from 'react-navigation';
import { AppLoading } from 'expo';
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import { OpenSans_700Bold } from '@expo-google-fonts/open-sans';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  let [fontsLoaded] = useFonts({
    Righteous_400Regular,
    OpenSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const handleLogin = () => {
    fetch(`https://asia-east2-project-4d358.cloudfunctions.net/api/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        if (Object.keys(res).includes('error')) console.log(res);
        else {
          console.log(res);
          await storeData(res.token);
          await navigation.navigate('Main');
        }
      });
  };

  const storeData = async (token: string) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch {
      console.log('Try again');
    }
  };

  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <BackgroundDecoration
            style={{
              position: 'absolute',
              top: -160,
              left: -135,
              right: 0,
              bottom: 0,
            }}
          />

          <Text style={styles.feedlogo}>Feed</Text>
          <BurgerHeart style={styles.burgerheart} />
          <BurgerIcon style={styles.burgericon} />
          <TextInput
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            style={styles.textInput}
            autoCapitalize={"none"}
            autoCorrect={false}
            autoCompleteType={"off"}
          ></TextInput>
          {/* <UsernameIcon/> */}
          <TextInput
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            style={styles.textInput}
            secureTextEntry={true}
            autoCapitalize={"none"}
            autoCorrect={false}
            autoCompleteType={"off"}
          />
          {/* <PasswordIcon style={styles.passwordicon}/> */}
          {error.length !== 0 && (
            <View>
              <Text>{error}</Text>
            </View>
          )}
          <TouchableOpacity style={styles.button}>
            <Button title="     " onPress={handleLogin} />
            <Text style={styles.buttonText}>LOG IN</Text>
          </TouchableOpacity>
          {/* <View style={styles.button}>
            <Button title="     " onPress={handleLogin} />
            <Text style={styles.buttonText}>LOG IN</Text>
          </View> */}
          <Text style={styles.text}>
            Don't have an account?
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate('Register')}> Sign up
            </Text>
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );

  /* const login = (email, pass) =>  */
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#182359',
  },
  textInput: {
    borderRadius: 4,
    width: '75%',
    height: 44,
    paddingLeft: 35,
    margin: 5,
    backgroundColor: 'white',
    top: 70,
    marginBottom: 17,
  },
  button: {
    width: '40%',
    //justifyContent: 'center',
    //alignItems: 'center',
    top: 85,
    fontSize: 10,
    //fontSize: 50,

    //ontFamily: 'OpenSans_700Bold',
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  burgericon: {
    position: 'absolute',
    alignItems: 'center',
    top: 205,
  },
  burgerheart: {
    position: 'absolute',
    top: 180,
    left: 130,
  },
  feedlogo: {
    fontSize: 90,
    color: 'white',
    textAlign: 'center',
    top: 70,
    position: 'absolute',
    fontFamily: 'Righteous_400Regular',
  },
  text: {
    color: 'white',
    top: 120,
    fontFamily: 'OpenSans_700Bold',
  },
  passwordicon: {
    position: 'absolute',
    left: 60,
    bottom: 269,
  },
  emailIcon: {
    position: 'absolute',
    left: 60,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'OpenSans_700Bold',
    color: 'white',
    top: -30,
  },
});
