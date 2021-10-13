/**
 * Entrypoint for the app
 *
 *
 * @Author Aleksi Kytö, Niko Lindborg, Aleksi Kosonen
 * */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MainProvider} from './contexts/MainContext';
import Navigator from './navigators/Navigator';
import {
  // eslint-disable-next-line camelcase
  RobotoCondensed_400Regular,
  // eslint-disable-next-line camelcase
  RobotoCondensed_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto-condensed';
import AppLoading from 'expo-app-loading';

const App = () => {
  const [fontsLoaded] = useFonts({
    RobotoCondensed_400Regular,
    RobotoCondensed_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaProvider>
        <MainProvider>
          <Navigator />
        </MainProvider>
      </SafeAreaProvider>
    );
  }
};

export default App;
