import React, { useEffect, useRef, useState } from 'react';
import { Platform, Text, StyleSheet, View, ActivityIndicator, Button, Image } from 'react-native';
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
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useWindowDimensions } from 'react-native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


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
        <Stack.Screen name="Loading" component={loadingComponent} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginComponent} />
        <Stack.Screen name="Grid" component={GridSquares} />
        <Stack.Screen
          name="SVG"
          component={MyDrawer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
    </View>
  );
}

function Article() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen</Text>
    </View>
  );
}

function MyDrawer() {

  const dimensions = useWindowDimensions();

  const isLargeScreen = dimensions.width >= 768;

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: isLargeScreen ? false : true,
        drawerType: isLargeScreen ? 'permanent' : 'front',
        drawerStyle: isLargeScreen ? null : { width: '80%', },
      }}
    >
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  );
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