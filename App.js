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

  const Status = { 'INACTIVE': 1, 'ACTIVE': 2 }
  const [servicesStatus, setServicesStatus] = useState({
    Status: __DEV__ ? Status.ACTIVE : Status.INACTIVE,
    Message: ""
  })

  // Pings all required services so they don't idle
  useEffect(() => {
    if(!__DEV__) return;

    Promise.all([
      fetch("https://conquiz-account-api.azurewebsites.net/api/account").then(res => {
        if (!res.ok)
          throw "Account Service Unavailable"
      }),
      fetch("https://conquiz-game-api.azurewebsites.net/api/game").then(res => {
        if (!res.ok)
          throw "Game Service Unavailable"
      }),
      fetch("https://conquiz-question-api.azurewebsites.net/api/question").then(res => {
        if (!res.ok)
          throw "Question Service Unavailable"
      }),
    ])
      .then(() => {
        setServicesStatus({ Status: Status.ACTIVE, Message: "" })
      })
      .catch((er) => {
        setServicesStatus({ Status: Status.INACTIVE, Message: er })
      })
  }, [])

  // Handle orientation on mobile devices
  useEffect(() => {
    if (Platform.OS === 'web') return
    changeScreenOrientation()
  })

  return (
    <RecoilRoot>
      <NativeBaseProvider theme={theme}>
        <StatusBar hidden={true} />
        {servicesStatus.Status == Status.INACTIVE || !fontsLoaded ? <LoadingComponent message={servicesStatus.Message} /> : <Routes />}
        {/* <Routes /> */}
      </NativeBaseProvider>
    </RecoilRoot>
  )
}