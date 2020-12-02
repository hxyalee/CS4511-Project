import * as React from 'react';
import { StyleSheet, TextInput, Button, Platform, Image } from 'react-native';
import {
  SearchBar,
  ButtonGroup,
  AirbnbRating,
  Input,
  ElementObject,
} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { ExpandingTextInput } from '../components/ExpandingTextInput';
import { Text, View } from '../components/Themed';
import * as FileSystem from 'expo-file-system';
import { NavigationScreenProp } from 'react-navigation';
import { Picker } from '@react-native-picker/picker';
import { addReview } from '../requests/reviews';
import { useFonts, OpenSans_700Bold } from '@expo-google-fonts/open-sans';
import { AppLoading } from 'expo';

export default function AddScreen({ navigation }: any) {
  const [restaurant, setRestaurant] = React.useState('');
  const [image, setImage] = React.useState<string | null>(null);
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [rating, setRating] = React.useState(5);
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

  const handleSubmit = () => {
    const body = {
      rating: rating,
      body: description,
      price: price,
      location: restaurant,
      image: image,
    };
    if (description === '') return;
    // TODO: Error checks; please check if the fields are empty

    addReview(body).then((res) => console.log(res));
  };
  let [fontsLoaded] = useFonts({
    OpenSans_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      {/* <View>
        <Text style={styles.text}>Userhandle and Icon goes here</Text>
      </View> */}
      <View style={styles.restaurantSearch}>
        <Text style={styles.promptText}>Which restaurant did you eat at?</Text>
        <SearchBar
          placeholder={`Restaurant Name`}
          onChangeText={(text) => setRestaurant(text)}
          round
          lightTheme
          inputStyle={{
            color: 'black',
            backgroundColor: 'white',
            fontSize: 16,
          }}
          inputContainerStyle={{
            backgroundColor: 'white'
          }}
          value={restaurant}
          containerStyle={{
            backgroundColor:
              'black' /*Edit according to app theme (background color) */,
          }}
        />
      </View>
      <View style={styles.rating}>
        <Text style={styles.promptText}>What did you think?</Text>
        {/* note: rating is still in progress: will use rest of documentation here: https://reactnativeelements.com/docs/rating/ */}
        <AirbnbRating
          count={5}
          reviews={['Terrible', 'Bad', 'OK', 'Good', 'Amazing']}
          defaultRating={rating}
          onFinishRating={(e) => setRating(e)}
          size={20}
          starStyle={{
            backgroundColor: 'black',
          }}
        />
      </View>
      <Input
        style={styles.input}
        placeholder="Write your review here..."
        onChangeText={(e) => setDescription(e)}
      />
      {/* <Picker
        selectedValue={price}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue, itemIndex) => setPrice(itemIndex)}
      >
        <Picker.Item label="$" value={0} />
        <Picker.Item label="$$" value={1} />
        <Picker.Item label="$$$" value={2} />
      </Picker> */}
      <View style={styles.button}>
        <Button 
          title="Add photo(s)" 
          onPress={pickImage}
          color='black'
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Add more information"
          color='black'
          onPress={() => navigation.navigate('AddMoreInfo')}
        />
      </View>
      <View style={styles.submitButton}>
        <Button 
          title="Preview post" 
          onPress={handleSubmit} 
          color='white'
        />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  restaurantSearch: {
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: 'black',
  },
  promptText: {
    fontSize: 16,
    fontFamily: 'OpenSans_700Bold',
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    margin: 10,
    top: 10,
  },
  text: {
    backgroundColor: 'black',
    color: 'white',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#F7FAFC',
    borderRadius: 50,
    width: '80%',
    margin: 10,
  },
  rating: {
    backgroundColor: 'black',
  },
  submitButton: {
    backgroundColor: '#9378FF',
    borderRadius: 60,
    width: '50%',
  }
});
