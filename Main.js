import React, { useEffect, useState } from 'react';
import { Platform, Text, StyleSheet, View, ActivityIndicator, Button } from 'react-native';
import { useRecoilValue } from 'recoil';
import { authActions } from './actions';
import GoogleComponent from './components/GoogleComponent';
import GridSquares from './components/GridSquares';
import LoginComponent from './components/LoginComponent';
import { SignalRComponent } from './components/SignalRComponent';
import NativeBaseExample from './components/NativeBaseExample';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './helpers';
import TestingSvg from './components/TestingSvg';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();


export default function Main() {
  const useAuthActions = authActions();
  let [fontsLoaded] = useFonts({
    'Before-Collapse': require('./assets/BeforeCollapse.ttf'),
  });
  useEffect(() => {
    // Call refresh token. If auth is successful you will navigate to main component
    // If not to login / register component
    useAuthActions.refreshToken()
  }, [])


  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {/* <Stack.Screen options={{headerShown: false}} name="NativeBaseExample" component={NativeBaseExample} /> */}
        <Stack.Screen name="Loading" component={loadingComponent} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginComponent} />
        <Stack.Screen name="Grid" component={GridSquares} />
        <Stack.Screen options={{
          title: "SomeTitle",
          headerRight: () => (
            <Button
              title="Logout"
              onPress={() => useAuthActions.logout()}
              color="green" />
          )
        }} name="SVG" component={TestingSvg} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function loadingComponent() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});