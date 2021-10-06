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
import * as Linking from 'expo-linking';

import { authStatus } from './state';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const prefix = Linking.createURL('http://localhost:19006');


export default function Main() {
  const localAuthStatus = useRecoilValue(authStatus);

  const useAuthActions = authActions();
  let [fontsLoaded] = useFonts({
    'Before-Collapse': require('./assets/BeforeCollapse.ttf'),
  });
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

    if(localAuthStatus === 'LOADING') {
      return (
        <Stack.Screen name="Loading" component={loadingComponent} />
      )
    }
    else if (localAuthStatus === "LOGGED") {
      return (
        <>
          <Stack.Screen name="Game" component={TestingSvg} />
          <Stack.Screen
            name="Home"
            component={MyDrawer}
            options={{ headerShown: false }}
          />
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
      <Stack.Navigator>
        {SwitchAuthState()}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function Feed({ navigation, route }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
      <Button
        title="Go to articlke"
        onPress={() => {
          navigation.navigate('Article', {
            url: 'picachu-i-want-u'
          })
        }}
      />
    </View>
  );
}

function Article({ navigation, route }) {

  const url = route.params?.url ?? "DefaultURL"
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen: {url}</Text>
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