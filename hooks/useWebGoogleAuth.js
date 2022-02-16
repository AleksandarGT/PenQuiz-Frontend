import * as Google from 'expo-auth-session/providers/google'
import { GOOGLE_CLIENT_URL } from '@env'
import { NATIVE_ANDROID_GOOGLE_CLIENT_URL } from "../injectable"

global.Buffer = global.Buffer || require('buffer').Buffer

export function useWebGoogleAuth() {

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