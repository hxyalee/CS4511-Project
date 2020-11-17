import React from 'react';
import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { Button } from 'react-native-elements';

export default function LoginScreen() {
  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>Social Feed</Text>
          <TextInput
            placeholder="Username"
            style={{
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 15,
              width: '50%',
              height: 40,
              paddingLeft: 6,
              margin: 5,
            }}
          />
          <TextInput
            placeholder="Password"
            style={{
              margin: 5,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 15,
              width: '50%',
              height: 40,
              paddingLeft: 6,
            }}
            secureTextEntry={true}
          />
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button title="Login" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
