import React from 'react';
import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { Button, withTheme } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import BackgroundDecoration from '../assets/images/login-detail.svg';
import BurgerIcon from '../assets/images/burger.svg';
import BurgerHeart from '../assets/images/burgerheart.svg';

/* export interface Props {
  email: string;
  password: string;
}  */

export default function LoginScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword ] = React.useState("");
  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <BackgroundDecoration style={{
              position: 'absolute',
              top: -160,
              left: -135,
              right: 0,
              bottom: 0,
              
            }}/>
          <Text style={styles.feedlogo}>Feed</Text>
          <BurgerHeart style={styles.burgerheart}/>
          <BurgerIcon style={styles.burgericon}/>
          <TextInput
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            style={styles.textInput}/>
          <TextInput
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            style={styles.textInput}
            secureTextEntry={true}
          />
          <View style={styles.button}>
            <Button title=" LOGIN "/>
          </View>
          <Text style={styles.text}>Don't have an account?
            <Text style={styles.linkText} /* onPress={} */> Sign up.</Text>
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
    paddingLeft: 6,
    margin: 5,
    backgroundColor: 'white',
    top: 58,
    marginBottom: 17,
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    top: 80,
    fontSize: 14,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  burgericon: {
    position:'absolute',
    alignItems: 'center',
    top: 205,
  },
  burgerheart: {
    position:'absolute',
    top: 185,
    left: 130,
  },
  feedlogo: {
    fontSize: 90,
    color: 'white',
    textAlign: 'center',
    top: 80,
    position: 'absolute',
  },
  text: {
    color: 'white',
    top: 90,
  }
})

