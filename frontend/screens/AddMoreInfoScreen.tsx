import * as React from "react";
import { StyleSheet, TextInput, Button, Platform } from "react-native";
import { CheckBox, SearchBar, ButtonGroup, ElementObject, Rating, AirbnbRating, Input } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";

import { ExpandingTextInput } from "../components/ExpandingTextInput";
import { Text, View } from "../components/Themed";

export default function AddMoreInfoScreen() {
  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
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
    });

    console.log(result);

    // if (!result.cancelled) {
    //   setImage(result.uri);
    // }
  };

  const buttons = ['$', '$$', '$$$']

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.promptText}>What was the price range?</Text>
          {/* <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={{height: 30}}
          /> */}
      </View>
      <View>
        <Text style={styles.promptText}>What dietary options were available?</Text>
        {/* <CheckBox
          title='Vegetarian'
          // checked={this.state.checked}
        />

        <CheckBox
          title='Vegan'
          // checked={this.state.checked}
        /> */}
      </View>
      <View>
        <Text style={styles.promptText}>What was the cuisine type?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  restaurantSearch: {
    paddingHorizontal: 10,
    width: "100%",
  },
  promptText: {
    fontSize: 20,
  },
});
