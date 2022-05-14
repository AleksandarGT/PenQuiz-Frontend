import * as Google from 'expo-auth-session/providers/google'
import { GOOGLE_CLIENT_URL } from '@env'
import { NATIVE_ANDROID_GOOGLE_CLIENT_URL } from "../injectable"
import { Platform } from 'react-native'
import { AuthSessionResult } from 'expo-auth-session'

global.Buffer = global.Buffer || require('buffer').Buffer


export interface IWebGoogleAuth {
    googlePromptAsync(): Promise<AuthSessionResult>
    googleResponse: AuthSessionResult | null
}

export function useWebGoogleAuth() : IWebGoogleAuth {

    // web
    const [request, googleResponse, googlePromptAsync] = Google.useIdTokenAuthRequest({
        expoClientId: GOOGLE_CLIENT_URL,
        iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        androidClientId: NATIVE_ANDROID_GOOGLE_CLIENT_URL,
        webClientId: GOOGLE_CLIENT_URL,
    })

    return {
        googleResponse,
        googlePromptAsync
    }
}