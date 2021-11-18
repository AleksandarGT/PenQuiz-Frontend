import React, { useEffect, useRef, useState } from 'react';
import { Platform, Text, StyleSheet, View, ActivityIndicator, Button, Image } from 'react-native';
import { useRecoilValue } from 'recoil';
import { useAuthActions } from '../hooks';
import LoginComponent from '../components/LoginComponent';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '../helpers';
import TestingSvg from '../components/Testing/TestingSvg';
import * as Linking from 'expo-linking';
import { authStatus } from '../state';
import { HomeDrawer } from './HomeDrawer'
import { LoadingComponent } from './LoadingComponent'
import { GameLobby } from '../components/GameLobby'
import GameMap from '../components/GameMapComponents/GameMap';
import MultipleChoiceScreen from '../components/GameMapComponents/MultipleChoiceScreen';

export * from './LoadingComponent';


const Stack = createStackNavigator();
const prefix = Linking.createURL('http://localhost:19006');
export function Routes() {
  const localAuthStatus = useRecoilValue(authStatus);

  const useuseAuthActions = useAuthActions();
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
  };

  function SwitchAuthState() {

    if (localAuthStatus === 'LOADING') {
      return (
        <Stack.Screen name="Loading" options={{ headerShown: false }} component={LoadingComponent} />
      )
    }
    else if (localAuthStatus === "LOGGED") {
      return (
        <>
          <Stack.Screen name="MultipleChoiceScreen" options={{ headerShown: false }} component={MultipleChoiceScreen} />
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