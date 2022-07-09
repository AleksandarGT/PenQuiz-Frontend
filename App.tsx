import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Platform, Text, View } from 'react-native'
import { RecoilRoot } from 'recoil'
import * as ScreenOrientation from 'expo-screen-orientation'
import { LogBox } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { NativeBaseProvider } from 'native-base'
import { theme } from './theme'
import { useFonts } from 'expo-font'
import { Routes } from './routes/Routes'
import { LoadingComponent } from './routes/LoadingComponent'
import { activateKeepAwake } from 'expo-keep-awake'
// Ignore timer warning 
LogBox.ignoreLogs(['Setting a timer'])
WebBrowser.maybeCompleteAuthSession()




enum Status {
  INACTIVE,
  ACTIVE,
}

interface IServicesStatus {
  Status: Status,
  Message: string,
}

export default function App() {

  function changeScreenOrientation() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
      .then(() => console.log("Successfully locked screen to landscape"))
      .catch((err) => console.log(err))
  }

  let [fontsLoaded] = useFonts({
    'Before-Collapse': require('./assets/BeforeCollapse.ttf'),
  })



  const [servicesStatus, setServicesStatus] = useState<IServicesStatus>({
    Status: __DEV__ ? Status.ACTIVE : Status.INACTIVE,
    Message: ""
  })

  const [isMobileFromWeb, setIsMobileFromWeb] = useState<boolean>(false)

  // Pings all required services so they don't idle
  useEffect(() => {
    if (__DEV__) return;
    setServicesStatus({ Status: Status.INACTIVE, Message: "Loading PenQuiz, please wait..." })

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
      .catch(() => {
        setServicesStatus({ Status: Status.INACTIVE, Message: "Unknown error occurred. Please try again later." })
      })
  }, [])

  // Handle orientation on mobile devices
  useEffect(() => {
    if (Platform.OS === 'web') return
    changeScreenOrientation()
    activateKeepAwake()
  }, [])


  // Handle clicks on mobile devices using a web browser
  // Redirect them to the playstore (or to link from where to download the apk)
  useEffect(() => {
    if (!navigator.userAgent) return
    const ua = navigator.userAgent.toLowerCase();
    const isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

    if (!isAndroid)
      return

    setIsMobileFromWeb(true)
  }, [])


  return (
    <RecoilRoot>
      <NativeBaseProvider theme={theme}>
        <StatusBar hidden={true} />

        {servicesStatus.Status == Status.INACTIVE || !fontsLoaded ?
          <LoadingComponent message={servicesStatus.Message} /> : isMobileFromWeb ?
            <LoadingComponent message='Please download and install PenQuiz app for Android devices:' link='https://onedrive.live.com/download?cid=D25E3AABFBD442D5&resid=d25e3aabfbd442d5%2112006&authkey=AFUTx5Dgm91DciU' /> :
            <Routes />
        }

      </NativeBaseProvider>
    </RecoilRoot>
  )
}