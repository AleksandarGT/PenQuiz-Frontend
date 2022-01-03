import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Platform, Text } from 'react-native'
import { RecoilRoot } from 'recoil'
import * as ScreenOrientation from 'expo-screen-orientation'
import { LogBox } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { NativeBaseProvider } from 'native-base'
import { theme } from './theme'
import { useFonts } from 'expo-font'
import { Routes } from './routes/Routes'
import { LoadingComponent } from './routes/LoadingComponent'
// Ignore timer warning 
LogBox.ignoreLogs(['Setting a timer'])
WebBrowser.maybeCompleteAuthSession()

export default function App() {
  function changeScreenOrientation() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
      .then(() => console.log("Successfully locked screen to landscape"))
      .catch((err) => console.log(err))
  }

  let [fontsLoaded] = useFonts({
    'Before-Collapse': require('./assets/BeforeCollapse.ttf'),
  })

  // Handle orientation on mobile devices
  useEffect(() => {
    if (Platform.OS === 'web') return
    changeScreenOrientation()
  })

  return (
    <RecoilRoot>
      <NativeBaseProvider theme={theme}>
        <StatusBar hidden={true} />
        {fontsLoaded ? <Routes /> : <LoadingComponent />}
        {/* <Routes /> */}
      </NativeBaseProvider>
    </RecoilRoot>
  )
}