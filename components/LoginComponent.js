import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../state';
import { userUserActions } from '../actions';
import { View, Text, Button } from 'react-native';
import React from 'react';


export default function Login({ history }) {
    const auth = useRecoilValue(authAtom);
    const userActions = userUserActions();

    useEffect(() => {
        //if(auth) history.push('/');
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

    return (
        <View>
            <Text>This is login content fuck me :(</Text>
            <Text>{auth?.username}</Text>
            <Text>{auth ? "This will render if auth has value" : "This will render if there is no AUTH"}</Text>
            <Button onPress={() => userActions.googlePromptAsync()} title="Some content" />
        </View>
    )
}