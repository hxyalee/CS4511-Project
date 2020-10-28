import * as React from 'react';
import { StyleSheet } from 'react-native';
import { SearchBar, ButtonGroup, ElementObject} from 'react-native-elements';

import { Text, View } from '../components/Themed';

export default function SearchScreen() {
  const [query, setQuery] = React.useState<string>('')
  const [isRestaurant, setIsRestaurant] = React.useState<boolean>(false)
  // Button Componenets
  const userText = () => <Text>User</Text>
  const restaurantText = () => <Text>Restaurant</Text>

  const buttons:ElementObject[] = [{element: userText}, {element: restaurantText}]
  return (
    <View style={styles.container}>
      <SearchBar 
        placeholder={`Search for ${isRestaurant ? 'restaurants' : 'users'}`}
        onChangeText={(e) => setQuery(e)} value={query}
        lightTheme 
      />
      <ButtonGroup 
        onPress={idx => idx === 0 ? setIsRestaurant(false) : setIsRestaurant(true)}
        buttons={buttons}
        selectedIndex={isRestaurant ? 1 : 0}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
