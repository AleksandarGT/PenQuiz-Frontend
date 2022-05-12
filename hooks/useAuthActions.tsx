import { useRecoilState, useSetRecoilState } from 'recoil'

import { useFetchWrapper } from '../helpers'
import { authAtom } from '../state'
import * as Google from 'expo-auth-session/providers/google'
import { ACCOUNT_SERVICE_API_URL } from "../injectable"
import { closeConnection } from './SignalRSetup'
import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import { AuthJWTToken, IAuthData } from '../types/authTypes'

export { useAuthActions }
global.Buffer = global.Buffer || require('buffer').Buffer



function useAuthActions() {

    const baseUrl = `${ACCOUNT_SERVICE_API_URL}/api/account`
    const fetchWrapper = useFetchWrapper()
    const setAuth = useSetRecoilState(authAtom)
    //TODO
    // This establishes the connection automatically and then you can destroy it
    // To prevent this behavior - have a custom class that doesn't try to establish a connection on create
    var timeout: ReturnType<typeof setTimeout>

    function startRefreshTokenTimer(jwt: string) {
        try {
            // Calculate when to call refresh token refresh
            // if(auth?.jwtToken) return

            const tokenExp = jwt_decode<AuthJWTToken>(jwt).exp
            const expires = new Date(tokenExp * 1000)
            const timeoutSec = expires.getTime() - Date.now() - (60 * 1000)
            console.log(`${timeoutSec / 1000} s before next JWT fetch call`)
            timeout = setTimeout(() => refreshToken(), timeoutSec)
        }
        catch (error) {
            console.log("Something went wrong with the JWT expiration date! Refresh token timer not started!")
        }
    }

    return {
        login,
        logout,
        refreshToken,
    }


    async function login(tokenId: string) {
        const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { TokenId: tokenId }) as IAuthData

        console.log("Success auth")
        setAuth(user)
        if (Platform.OS != "web") {
            AsyncStorage.setItem("@user", JSON.stringify(user))
        }
        else {
            startRefreshTokenTimer(user.jwtToken)
        }
    }

    async function refreshToken() {

        // Web refresh token
        if (Platform.OS == "web") {
            try {
                const user = await fetchWrapper.post(`${baseUrl}/refresh-token`)
                setAuth(user)
                //removeBackStack('Home')
                startRefreshTokenTimer(user.jwtToken)
            } catch {
                setAuth(null)
            }

            return
        }

        // Mobile refresh token
        const res = await AsyncStorage.getItem("@user")

        if (!res) {
            setAuth(null)
            return
        }

        const jsonRes = JSON.parse(res)

        // If expired log out user
        const expiry = jwt_decode<AuthJWTToken>(jsonRes.jwtToken).exp

        if (Date.now() < expiry * 1000) {
            setAuth(jsonRes)
            return
        }

        console.log("JWT Token is expired")
        await AsyncStorage.removeItem("@user")
        setAuth(null)
    }

    async function logout() {
        if (Platform.OS != "web") {
            await AsyncStorage.removeItem("@user")
            setAuth(null)

            return
        }

        await fetchWrapper.post(`${baseUrl}/revoke-cookie`)
        
        clearTimeout(timeout)
        closeConnection()
        setAuth(null)

        //removeBackStack('Login');
    }
}