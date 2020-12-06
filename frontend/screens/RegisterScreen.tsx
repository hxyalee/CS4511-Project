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
import { StackScreenProps } from '@react-navigation/stack';
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

interface RegisterScreenProps {
  navigation: NavigationScreenProp<any, any>;
}
export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmpassword] = React.useState('');
  const [handle, setHandle] = React.useState('');
  const [name, setName] = React.useState('');
  let [fontsLoaded] = useFonts({
    Righteous_400Regular,
    OpenSans_700Bold,
  });
  const handleRegister = () => {
    if (password !== confirmPassword) return;
    fetch(`https://asia-east2-project-4d358.cloudfunctions.net/api/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, handle, name, confirmPassword }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log(res);
        if (Object.keys(res).includes('error')) console.log(res);
        else {
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

  if (!fontsLoaded) {
    return <AppLoading />;
  }

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
          {/* <BurgerHeart style={styles.burgerheart} />
          <BurgerIcon style={styles.burgericon} />
 */}
          <TextInput
            placeholder="Name"
            onChangeText={(text) => setName(text)}
            value={name}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Username/Handle"
            onChangeText={(text) => setHandle(text)}
            value={handle}
            style={styles.textInput}
            autoCapitalize={"none"}
            autoCorrect={false}
            autoCompleteType={"off"}
          ></TextInput>
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
          />
          <TextInput
            placeholder="Confirm Password"
            onChangeText={(text) => setConfirmpassword(text)}
            value={confirmPassword}
            style={styles.textInput}
            secureTextEntry={true}
          />
          {/* <PasswordIcon style={styles.passwordicon}/> */}
          <View style={styles.button}>
            {/* <Button title="     ">
              CREATE
            </Button> */}
            <Button title="          " onPress={handleRegister}/>
            <Text style={styles.buttonText}>CREATE MY ACCOUNT</Text>
          </View>
          <Text style={styles.text}>
            Already have an account?
            <Text style={styles.linkText} onPress={() => navigation.goBack()}> Log In
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
    top: 60,
    marginBottom: 14,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  burgericon: {
    position: 'absolute',
    alignItems: 'center',
    top: 180,
  },
  burgerheart: {
    position: 'absolute',
    top: 160,
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
    top: 80,
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
  button: {
    width: '50%',
    //justifyContent: 'center',
    //alignItems: 'center',
    top: 80,
    fontSize: 10,
  },
});
