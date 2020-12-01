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


interface LoginScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  let [fontsLoaded] = useFonts({
    Righteous_400Regular,
    OpenSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  /* const fetchFonts = () => {
    return Font.loadAsync({
    'OpenSans-Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
    });
  };
  const [fontloaded,setfontloaded] = React.useState(false);
  if (!fontloaded) {
    return(
      <AppLoading
      startAsync = { fetchFonts }
      onFinish = { () => { setfontloaded(true) }}
      onError = { console.warn }/>
    )
  } */


  /* let [fontsLoaded] = useFonts({
    OpenSans_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading/>
  }  */
  
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
          ></TextInput>
          {/* <UsernameIcon/> */}
          <TextInput
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            style={styles.textInput}
            secureTextEntry={true}
          />
          {/* <PasswordIcon style={styles.passwordicon}/> */}

          <View style={styles.button}>
            <Button
              title="LOGIN"
              onPress={() => console.log('LOG USER IN')}
            />
          </View>
          <Text style={styles.text}>
            Don't have an account?  
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate('Register')}
            > Sign up</Text>
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
    top: 58,
    marginBottom: 17,
  },
  button: {
    width: '40%',
    //justifyContent: 'center',
    //alignItems: 'center',
    top: 80,
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
});
