import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { AsyncStorage } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

import Routes from './src/routes';
import Colors from './src/constants/Colors';

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialRoute, setInitialRoute] = React.useState('Deslogado');

  React.useEffect(() => {
    async function asyncTasks() {
      try {
        await SplashScreen.preventAutoHideAsync();

        var loggedin = await AsyncStorage.getItem('@myTracking:loggedin');

        if(loggedin){
          setInitialRoute('Logado');
        } else{
          setInitialRoute('Deslogado');
        }

        await SplashScreen.hideAsync();
        setLoadingComplete(true);
      } catch (e) {
        throw new Error(e);
      }
    }

    asyncTasks()
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
          <Routes initialRoute={ initialRoute }/>
          <StatusBar backgroundColor={Colors.colorStatusBar} style="light" />
      </SafeAreaProvider>
    );
  }
}
''