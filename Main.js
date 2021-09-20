import React, { useEffect, useState } from 'react';
import { Platform, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useRecoilValue } from 'recoil';
import { authAtom } from './state';
import { authActions } from './actions';
import GoogleComponent from './components/GoogleComponent';
import GridSquares from './components/GridSquares';
import LoginComponent from './components/LoginComponent';
import { NavigationContainer } from '@react-navigation/native';
import { SignalRComponent } from './components/SignalRComponent';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function Main() {
    const logStates = {
        LOADING: 0,
        SUCCESS: 1,
        ERROR: 2,
    }

    const auth = useRecoilValue(authAtom);
    const useAuthActions = authActions();
    const [isLogged, setIsLogged] = useState(logStates.LOADING)




    useEffect(() => {
        useAuthActions.refreshToken()
            .then((ss) => setIsLogged(logStates.SUCCESS))
            .catch((ss) => setIsLogged(logStates.ERROR))
    }, [])





    function renderAuth() {
        switch(isLogged) {
            case logStates.ERROR:
                return <Stack.Screen name="Login" component={LoginComponent} />

            case logStates.LOADING:
                return <Stack.Screen name="Loading" component={loadingComponent} />
                
            case logStates.SUCCESS:
                return <Stack.Screen name="Grid" component={GridSquares} />

                default: 
                return <Stack.Screen name="Loading" component={loadingComponent} />
        }
    }

    function ss() {
        return <Stack.Screen name="Loading" component={loadingComponent} />
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {renderAuth()}
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