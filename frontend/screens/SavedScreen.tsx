import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import EditScreenInfo from '../components/EditScreenInfo';
import { SavedCard } from '../components/SavedCard';
import { Text, View } from '../components/Themed';

export default function SavedScreen() {
  return (
    <ScrollView>
      <View style={styles.separator}>
        <SavedCard />
      </View>
      <View style={styles.separator}>
        <SavedCard />
      </View>
      <View style={styles.separator}>
        <SavedCard />
      </View>
      <View style={styles.separator}>
        <SavedCard />
      </View>
      <View style={styles.separator}>
        <SavedCard />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    margin: 20,
  },
});

// fetch('http://localhost:5000/project-4d358/asia-east2/api/getReviews')
//  method:'POST',
//  he
