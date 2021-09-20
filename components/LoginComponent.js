import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../state';
import { authActions } from '../actions';
import { View, Text, Button } from 'react-native';
import React from 'react';
import {BACKEND_API_URL, GOOGLE_CLIENT_URL} from '@env'


export default function Login({ history }) {
    const auth = useRecoilValue(authAtom);
    const userActions = authActions();

    // Call refresh token on start to fetch a new jwt using your refreshtoken
    useEffect(() => {
        // userActions.refreshToken().catch(er => {
        //     // Redirect to login page
        // })
    }, [])

    useEffect(() => {
        if (userActions.googleResponse?.type === 'success') {
            onLogin({tokenId: userActions.googleResponse.params.id_token})
        }
      }, [userActions.googleResponse]);


    function onLogin({tokenId}) {
        return userActions.login(tokenId).catch(error => {
            console.log(error)
        })
    }

    function callProtectedThing() {
        userActions.refreshToken()
        .then((e) => {
            console.log(e)
            fetch(`${BACKEND_API_URL}/api/example/awer`, {headers: {Authorization: `Bearer ${e}`}}).then((e) => console.log(e)).catch((e) => console.log(e))
        })
        .catch((e) => console.log(e))

    }

    return (
        <View>
            <Text>This is login content fuck me :(</Text>
            <Text>{auth?.username}</Text>
            <Text>{auth ? "This will render if auth has value" : "This will render if there is no AUTH"}</Text>
            <Button onPress={() => userActions.googlePromptAsync()} title="Some content" />
            <Button onPress={() => callProtectedThing()} title="Protected" />
        </View>
    )
}