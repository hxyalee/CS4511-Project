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
import { registerUser } from '../requests/authenticate';

interface RegisterScreenProps {
  navigation: NavigationScreenProp<any, any>;
}
export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [handle, setHandle] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  let [fontsLoaded] = useFonts({
    Righteous_400Regular,
    OpenSans_700Bold,
  });

  /* Handle Registration */
  const handleRegister = () => {
    const body = {
      handle: handle,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    }
    // Error checks
    /* if (handle === "") {
      console.log("Handle must not be empty");
      return;
    } */
    registerUser(body).then((res) => console.log(res)); 
    console.log(body);
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
          <BurgerHeart style={styles.burgerheart} />
          <BurgerIcon style={styles.burgericon} />
          <TextInput
            placeholder="Username"
            onChangeText={(text) => setHandle(text)}
            //value={email}
            autoCompleteType={'off'}
            autoCapitalize={'none'}
            autoCorrect={false}
            style={styles.textInput}
          ></TextInput>
          <TextInput
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            //value={email}
            autoCompleteType={'off'}
            autoCapitalize={'none'}
            style={styles.textInput}
          ></TextInput>
          {/* <UsernameIcon/> */}
          <TextInput
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            //value={password}
            style={styles.textInput}
            secureTextEntry={true}
          />
          <TextInput
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          //value={password}
          style={styles.textInput}
          secureTextEntry={true}
        />
          {/* <PasswordIcon style={styles.passwordicon}/> */}
          <View style={styles.button}>
            <Button 
              title="CREATE MY ACCOUNT"
              onPress={handleRegister}/>
          </View>
          <Text style={styles.text}>
            Already have an account?
            <Text style={styles.linkText} onPress={() => navigation.goBack()}> Log In</Text>
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
    top: 112,
    marginBottom: 11,
  },
  button: {
    width: '80%',
    //justifyContent: 'center',
    //alignItems: 'center',
    top: 112,
    fontSize: 14,
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
    top: 185,
    left: 130,
  },
  feedlogo: {
    fontSize: 90,
    color: 'white',
    textAlign: 'center',
    top: 80,
    position: 'absolute',
    fontFamily: 'Righteous_400Regular',
  },
  text: {
    color: 'white',
    top: 140,
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
});
