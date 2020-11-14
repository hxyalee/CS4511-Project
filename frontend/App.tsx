import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AsyncStorage } from 'react-native';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [token, setToken] = React.useState<string | null>('');
  React.useEffect(() => {
    const hasToken = async () => {
      const v = await AsyncStorage.getItem('token');
      if (v !== null) setToken(v);
      else setToken(null);
    };
    hasToken();
  }, []);
  if (!isLoadingComplete) {
    return null;
  } 
   else if (token === null) {
     return <LoginScreen />;
   } 
  else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
