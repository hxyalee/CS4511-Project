import * as React from 'react';
import { StyleSheet, SafeAreaView, FlatList, Button } from 'react-native';
import { SearchBar, ButtonGroup, ElementObject } from 'react-native-elements';

import useDebounce from '../hooks/useDebounce';
import { Text, View } from '../components/Themed';
import axios from 'axios';
import { handleRestaurantSearchRequest } from '../requests/search';
import { SearchItem } from '../components/SearchItem';

export default function SearchScreen() {
  const [query, setQuery] = React.useState<string>('');
  const [isRestaurant, setIsRestaurant] = React.useState<boolean>(false);
  const [noData, setNoData] = React.useState<boolean>(false);
  const [listItems, setListItems] = React.useState<any[]>([]);
  const buttonItem = React.useRef<ButtonGroup>(null);

  // Button Componenets
  const userText = () => <Text>User</Text>;
  const restaurantText = () => <Text>Restaurant</Text>;
  const buttons: ElementObject[] = [
    { element: userText },
    { element: restaurantText },
  ];

  const debouncedFetch = useDebounce(query, 600);
  React.useEffect(() => {
    // Make sure input not empty
    if (debouncedFetch) {
      if (isRestaurant)
        handleRestaurantSearchRequest({ query }).then((res) =>
          setListItems(res.restaurnts)
        );
      else return;
    }
  }, [debouncedFetch]);

  const handleChangeText = (queryString: React.SetStateAction<string>) => {
    if (queryString === '') setNoData(true);
    else setNoData(false);
    setQuery(queryString);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <SearchBar
          placeholder={`Search for ${isRestaurant ? 'restaurants' : 'users'}`}
          onChangeText={handleChangeText}
          value={query}
        />
        <ButtonGroup
          onPress={(idx) =>
            idx === 0 ? setIsRestaurant(false) : setIsRestaurant(true)
          }
          buttons={buttons}
          selectedIndex={isRestaurant ? 1 : 0}
          ref={buttonItem}
          containerStyle={{ backgroundColor: 'gray' }}
        />
        <FlatList
          data={listItems}
          renderItem={(item) => (
            <SearchItem
              name={item.item.name}
              id={item.item.id}
              img={item.item.img}
              location={item.item.location}
              rating={item.item.rating}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  buttongroup: {
    alignSelf: 'stretch',
  },
});
