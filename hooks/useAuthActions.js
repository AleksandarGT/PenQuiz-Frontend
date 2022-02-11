import { useRecoilState, useSetRecoilState } from 'recoil'

import { useFetchWrapper } from '../helpers'
import { authAtom } from '../state'
import * as Google from 'expo-auth-session/providers/google'
import { GOOGLE_CLIENT_URL } from '@env'
import { ACCOUNT_SERVICE_API_URL } from "../injectable"
import { closeConnection } from './SignalRSetup'
import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export { useAuthActions }
global.Buffer = global.Buffer || require('buffer').Buffer

function useAuthActions() {

    const baseUrl = `${ACCOUNT_SERVICE_API_URL}/api/account`
    const fetchWrapper = useFetchWrapper()
    const setAuth = useSetRecoilState(authAtom)
    //TODO
    // This establishes the connection automatically and then you can destroy it
    // To prevent this behavior - have a custom class that doesn't try to establish a connection on create
    var timeout


    function startRefreshTokenTimer(jwt) {
        try {
            // Calculate when to call refresh token refresh
            // if(auth?.jwtToken) return
            const tokenExp = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64'))
            const expires = new Date(tokenExp.exp * 1000)
            const timeoutSec = expires.getTime() - Date.now() - (60 * 1000)
            console.log(`${timeoutSec / 1000} s before next JWT fetch call`)
            timeout = setTimeout(() => refreshToken(), timeoutSec)
        }
        catch (error) {
            console.log("Something went wrong with the JWT expiration date! Refresh token timer not started!")
        }
    }

    const [request, googleResponse, googlePromptAsync] = Google.useIdTokenAuthRequest({
        expoClientId: GOOGLE_CLIENT_URL,
        iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        webClientId: GOOGLE_CLIENT_URL,
    })

    return {
        login,
        logout,
        googleResponse,
        googlePromptAsync,
        refreshToken,
    }


    function login(tokenId) {
        return fetchWrapper.post(`${baseUrl}/authenticate`, { TokenId: tokenId })
            .then(user => {
                console.log("Success auth")
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                //localStorage.setItem('user', JSON.stringify(user));
                setAuth(user)

                if (Platform.OS != "web") {
                    AsyncStorage.setItem("@user", JSON.stringify(user))
                }
                else {
                    startRefreshTokenTimer(user.jwtToken)
                }


                // get return url from location state or default to home page
                //const { from } = history.location.state || { from: { pathname: '/' } };
                //history.push(from);
            })
    }

    function refreshToken() {
        if (Platform.OS != "web") {
            AsyncStorage.getItem("@user").then(res => {
                const jsonRes = JSON.parse(res)
                setAuth(jsonRes)
                return
            })
        }
        else {
            return fetchWrapper.post(`${baseUrl}/refresh-token`).then(user => {
                setAuth(user)
                //removeBackStack('Home')
                startRefreshTokenTimer(user.jwtToken)
            }).catch(() => {
                setAuth(null)
                //removeBackStack('Login')
                //navigate('Login')
            })
        }
    }

    function logout() {
        if (Platform.OS != "web") {
            AsyncStorage.removeItem("@user").then(res => {
                setAuth(null)
                return
            })
        }
        fetchWrapper.post(`${baseUrl}/revoke-cookie`).then(res => {
            clearTimeout(timeout)
            closeConnection()
            setAuth(null)

            //removeBackStack('Login');
        })
    }
}