import { EXPO_GO_ANDROID_GOOGLE_CLIENT_URL, NATIVE_ANDROID_GOOGLE_CLIENT_URL } from "../injectable"
import * as GoogleAndroid from 'expo-google-app-auth';

global.Buffer = global.Buffer || require('buffer').Buffer

export function useAndroidGoogleAuth() {

    // Android
    async function googlePromptAsync() {
        try {
            const result = await GoogleAndroid.logInAsync({
                // Expo go - dev
                androidClientId: EXPO_GO_ANDROID_GOOGLE_CLIENT_URL,

                // Android native - production
                androidStandaloneAppClientId: NATIVE_ANDROID_GOOGLE_CLIENT_URL,
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                return { status: "success", idToken: result.idToken }
            } else {
                return { status: "canceled" };
            }
        } catch (e) {
            console.log(e)
            return { status: "error" };
        }
    }

    return {
        googlePromptAsync
    }
}