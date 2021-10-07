import React, { useEffect, useRef, useState } from 'react';
import { Platform, Text, StyleSheet, View, ActivityIndicator, Button, Image } from 'react-native';
import { useRecoilValue } from 'recoil';
import { authActions } from '../actions';
import GridSquares from '../components/GridSquares';
import LoginComponent from '../components/LoginComponent';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '../helpers';
import TestingSvg from '../components/TestingSvg';
import * as Linking from 'expo-linking';
import { authStatus } from '../state';
import { HomeDrawer } from './HomeDrawer'
import { LoadingComponent } from './LoadingComponent'
import { GameLobby } from '../components/GameLobby'

export * from './LoadingComponent';


const Stack = createStackNavigator();
const prefix = Linking.createURL('http://localhost:19006');
export function Routes() {
    const localAuthStatus = useRecoilValue(authStatus);
  
    const useAuthActions = authActions();
    useEffect(() => {
      // Call refresh token. If auth is successful you will navigate to main component
      // If not to login / register component
      useAuthActions.refreshToken()
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
          <Stack.Screen name="Loading" component={LoadingComponent} />
        )
      }
      else if (localAuthStatus === "LOGGED") {
        return (
          <>
            <Stack.Screen
              name="Home"
              component={HomeDrawer}
            />
            <Stack.Screen name="GameLobby" component={GameLobby} />
            <Stack.Screen name="Game" component={TestingSvg} />
          </>
        )
      }
      else {
        return (
          <Stack.Screen name="Login" component={LoginComponent} />
        )
      }
    }
  
    return (
      <NavigationContainer linking={linking} ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {SwitchAuthState()}
        </Stack.Navigator>
      </NavigationContainer>
    )
  }