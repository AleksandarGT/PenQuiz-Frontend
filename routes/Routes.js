import React, { useEffect, useRef, useState } from 'react'
import { Platform, Text, StyleSheet, View, ActivityIndicator, Button, Image } from 'react-native'
import { useRecoilValue } from 'recoil'
import { useAuthActions } from '../hooks'
import LoginComponent from '../components/LoginComponent'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from '../helpers'
import TestingSvg from '../components/Testing/TestingSvg'
import * as Linking from 'expo-linking'
import { authStatus, gameInstanceAtom } from '../state'
import { HomeDrawer } from './HomeDrawer'
import { LoadingComponent } from './LoadingComponent'
import { GameLobby } from '../components/GameLobby'
import GameMap from '../components/GameMapComponents/GameMap'
import MultipleChoiceScreen from '../components/GameMapComponents/MultipleChoiceScreen'
import NumberChoiceScreen from '../components/GameMapComponents/NumberChoiceScreen'
import { GetGameState } from '../components/GameMapComponents/CommonGameFunc'

export * from './LoadingComponent'


const Stack = createStackNavigator()
const prefix = Linking.createURL('http://localhost:19006')
export function Routes() {
  const localAuthStatus = useRecoilValue(authStatus)
  const game = useRecoilValue(gameInstanceAtom)

  const useuseAuthActions = useAuthActions()
  useEffect(() => {
    // Call refresh token. If auth is successful you will navigate to main component
    // If not to login / register component
    useuseAuthActions.refreshToken()
  }, [])

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Home: 'home',
        Game: 'game'
      }
    }
  }


  useEffect(() => {
    if (Platform.OS == 'web') {
      if (__DEV__) return
      function unloadEventHandler(e) {
        // Cancel the event
        e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
        // Chrome requires returnValue to be set
        e.returnValue = '';
      }

      if (GetGameState(game?.gameState) == 'IN_PROGRESS') {
        console.log(GetGameState(game.gameState))
        window.addEventListener('beforeunload', unloadEventHandler);
      }
      else {
        window.removeEventListener('beforeunload', unloadEventHandler)
      }

      return () => window.removeEventListener('beforeunload', unloadEventHandler)
    }
  }, [game?.gameState])

  function SwitchAuthState() {

    if (localAuthStatus === 'LOADING') {
      return (
        <Stack.Screen name="Loading" options={{ headerShown: false }} component={LoadingComponent} />
      )
    }
    else if (localAuthStatus === "LOGGED") {
      return (
        <>
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={HomeDrawer}
          />
          <Stack.Screen name="GameMap" options={{ headerShown: false }} component={GameMap} />
          <Stack.Screen name="Game" options={{ headerShown: false }} component={TestingSvg} />
          <Stack.Screen name="GameLobby" options={{ headerShown: false }} component={GameLobby} />
        </>
      )
    }
    else {
      return (
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginComponent} />
      )
    }
  }

  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <Stack.Navigator >
        {SwitchAuthState()}
      </Stack.Navigator>
    </NavigationContainer>
  )
}