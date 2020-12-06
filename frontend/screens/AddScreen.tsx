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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uploadPhoto } from '../requests/user';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';

const wait = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
export default function AddScreen({ navigation }: any) {
  const [restaurant, setRestaurant] = React.useState('');
  const [image, setImage] = React.useState<string | null>(null);
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [rating, setRating] = React.useState(5);
  const [token, setToken] = React.useState<null | string>('');
  const [refreshing, setRefreshing] = React.useState(false);
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setToken(token);
    } catch {
      console.log('no token');
    }
  };
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
  React.useEffect(() => {
    getToken();
  }, [token]);

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
    setRefreshing(true);
    const body = {
      rating: rating,
      body: description,
      price: price,
      restaurant,
      image: image,
    };
    if (description === '') {
      setRefreshing(false);
      return;
    }
    if (restaurant === '') {
      setRefreshing(false);
      return;
    }
    // TODO: Error checks; please check if the fields are empty
    if (!token) return;
    addReview(token, body).then((res) => {
      if (res.status === 'success') {
        setRestaurant('');
        setImage(null);
        setDescription('');
        setPrice(0);
        setRating(5);
        setRefreshing(false);

        navigation.goBack();
      }
    });
  };
  let [fontsLoaded] = useFonts({
    OpenSans_700Bold,
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
            color: '#333',
            backgroundColor: 'white',
            fontSize: 16,
          }}
          inputContainerStyle={{
            backgroundColor: 'white',
          }}
          value={restaurant}
          containerStyle={{
            backgroundColor:
              '#333' /*Edit according to app theme (background color) */,
          }}
        />
      </View>
      <View style={styles.rating}>
        <Text style={styles.promptText}>What did you think?</Text>
        {/* note: rating is still in progress: will use rest of documentation here:
         https://reactnativeelements.com/docs/rating/ */}
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: '#333',
          }}
        >
          <AirbnbRating
            count={5}
            reviews={['Terrible', 'Bad', 'OK', 'Good', 'Amazing']}
            defaultRating={rating}
            onFinishRating={(e) => setRating(e)}
            size={16}
            starStyle={{
              backgroundColor: '#333',
            }}
          />
          <View
            style={{
              backgroundColor: 'transparent',
              marginTop: 20,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white' }}>Choose Price Range</Text>
            <Picker
              selectedValue={price}
              style={{ height: 50, width: 100, color: 'white' }}
              onValueChange={(itemValue, itemIndex) => setPrice(itemIndex)}
            >
              <Picker.Item label="$" value={0} />
              <Picker.Item label="$$" value={1} />
              <Picker.Item label="$$$" value={2} />
            </Picker>
          </View>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <Input
          style={styles.input}
          placeholder="Write your review here..."
          onChangeText={(e) => setDescription(e)}
          containerStyle={{ width: '70%', maxHeight: 120 }}
          multiline
          maxLength={100}
          blurOnSubmit
        />
        {image ? (
          <Image
            source={{
              uri: `data:image/gif;base64,${image}`,
            }}
            width={100}
            height={100}
            style={{
              width: 100,
              height: 100,
              backgroundColor: '#333',
            }}
          />
        ) : (
          <TouchableOpacity onPress={pickImage}>
            <View
              style={{
                height: 100,
                width: 100,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}
            >
              <Text style={{ color: '#000' }}>No Image </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.button}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}
        >
          {/* {image &&} */}
          <Button
            title={` ${image ? 'Change Photo' : 'Add photo'}`}
            color="#374bcc"
            onPress={pickImage}
          />
        </View>
      </View>

      <View style={styles.submitButton}>
        <Button
          disabled={refreshing}
          title="Post Review"
          onPress={handleSubmit}
          color="#5a5f99"
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
    // justifyContent: 'space-between',
    backgroundColor: '#333',
    height: '100%',
  },
  restaurantSearch: {
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: '#333',
  },
  promptText: {
    fontSize: 16,
    fontFamily: 'OpenSans_700Bold',
    backgroundColor: '#333',
    color: 'white',
    textAlign: 'center',
    margin: 10,
    top: 10,
  },
  text: {
    backgroundColor: '#333',
    color: 'white',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 10,
    fontSize: 16,
    padding: 10,
  },
  button: {
    borderRadius: 50,
    width: '80%',
    backgroundColor: 'transparent',
    margin: 10,
  },
  rating: {
    backgroundColor: '#333',
  },
  submitButton: {
    backgroundColor: '#9378FF',
    borderRadius: 60,
    width: '70%',
    margin: 20,
  },
});
