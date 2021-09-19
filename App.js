import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View, AppRegistry  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GoogleComponent from './components/GoogleComponent';
import GridSquares from './components/GridSquares';
import LoginComponent from './components/LoginComponent';
import { SignalRComponent } from './components/SignalRComponent';
import { RecoilRoot } from 'recoil';

import { LogBox } from 'react-native';

// Ignore timer warning 
LogBox.ignoreLogs(['Setting a timer']);
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={LoginComponent}/>
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  )
}