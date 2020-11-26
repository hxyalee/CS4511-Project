
import * as React from 'react';
import { StyleSheet, TextInput, Button, Platform, Image } from 'react-native';
import { SearchBar, ButtonGroup, AirbnbRating, Input,  ElementObject } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { ExpandingTextInput } from '../components/ExpandingTextInput';
import { Text, View } from '../components/Themed';
import * as FileSystem from 'expo-file-system';
import {NavigationScreenProp} from "react-navigation";


export default function AddScreen({navigation}:NavigationScreenProp<any,any>) {
  const [restaurant, setRestaurant] = React.useState('');
  const [image, setImage] = React.useState<string | null>(null);
  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
      .then((res) => {
        if (res.cancelled) return;
        const filepath = res.uri;
        return FileSystem.readAsStringAsync(filepath, {
          encoding: FileSystem.EncodingType.Base64,
        }).then((base64) => {
          setImage(base64);
        });
      })
      .catch((e) => console.log(e));
  };
  return (
    <View style={styles.container}>
      <View>
        <Text>Userhandle and Icon goes here</Text>
      </View>
      <View style={styles.restaurantSearch}>
        <Text style={styles.promptText}>Which restaurant did you eat at?</Text>
        <SearchBar
          placeholder={`Restaurant Name`}
          onChangeText={(text) => setRestaurant(text)}
          value={restaurant}
          containerStyle={{
            backgroundColor:
              '#fff' /*Edit according to app theme (background color) */,
          }}
        />
      </View>
      <View>
        <Text style={styles.promptText}>What did you think?</Text>
        {/* note: rating is still in progress: will use rest of documentation here: https://reactnativeelements.com/docs/rating/ */}
        <AirbnbRating
          count={5}
          reviews={["Terrible", "Bad", "OK", "Good", "Amazing"]}
          defaultRating={5}
          size={20}
        />
        <Input
          placeholder='Write your review here...'
        />
      </View>
      <Button title="Add photo(s)" onPress={pickImage} />
      {/* Need to npm install @react-navigation/native */}
      {/* npm install --save-dev @types/react-navigation */}
      <Button title="Add more information"       
        onPress={() =>
          navigation.navigate("AddMoreInfo")
      } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  restaurantSearch: {
    paddingHorizontal: 10,
    width: '100%',
  },
  promptText: {
    fontSize: 20,
  },
});

