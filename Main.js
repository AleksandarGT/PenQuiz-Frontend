import React, { useEffect, useState } from 'react';
import { Platform, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useRecoilValue } from 'recoil';
import { authActions } from './actions';
import GoogleComponent from './components/GoogleComponent';
import GridSquares from './components/GridSquares';
import LoginComponent from './components/LoginComponent';
import { SignalRComponent } from './components/SignalRComponent';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './helpers';
import TestingSvg from './components/TestingSvg';

const Stack = createStackNavigator();


export default function Main() {
    const useAuthActions = authActions();

    useEffect(() => {
        // Call refresh token. If auth is successful you will navigate to main component
        // If not to login / register component
        useAuthActions.refreshToken()
    }, [])


    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                <Stack.Screen name="Loading" component={loadingComponent} />
                <Stack.Screen name="Login" component={LoginComponent} />
                <Stack.Screen name="Grid" component={GridSquares} />
                <Stack.Screen name="SVG" component={TestingSvg} />
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