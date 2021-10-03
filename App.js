import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Platform, Text } from 'react-native';
import GridSquares from './components/GridSquares';

import { RecoilRoot } from 'recoil';
import * as ScreenOrientation from 'expo-screen-orientation';

import { LogBox } from 'react-native';

import Main from './Main.js'
import 'react-native-gesture-handler';
import { NativeBaseProvider } from 'native-base';

// Ignore timer warning 
LogBox.ignoreLogs(['Setting a timer']);


export default function App() {
  function changeScreenOrientation() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
      .then(() => console.log("Successfully locked screen to landscape"))
      .catch((err) => console.log(err));
  }

  // Handle orientation on mobile devices
  useEffect(() => {
    if (Platform.OS === 'web') return
    changeScreenOrientation()
  })

  return (
    <RecoilRoot>
      <NativeBaseProvider>
        <Main />
      </NativeBaseProvider>
    </RecoilRoot>
  )
}