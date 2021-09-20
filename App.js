import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Platform, Text  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GoogleComponent from './components/GoogleComponent';
import GridSquares from './components/GridSquares';
import LoginComponent from './components/LoginComponent';
import { SignalRComponent } from './components/SignalRComponent';
import { RecoilRoot } from 'recoil';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Google from 'expo-auth-session/providers/google';

import { LogBox } from 'react-native';

// Ignore timer warning 
LogBox.ignoreLogs(['Setting a timer']);
const Stack = createNativeStackNavigator();


export default function App() {
  function changeScreenOrientation() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
    .then(() => console.log("Successfully locked screen to landscape"))
    .catch((err) => console.log(err));
  }

  useEffect(() => {
    if(Platform.OS === 'web') return
    changeScreenOrientation()
  })


  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Grid" component={LoginComponent}/>
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  )
}