import React from 'react';
import { View, Button, Text } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import {useSignalR} from '../actions/useSignalR'
export function Feed({ navigation, route }) {
    const connection = useSignalR();

    useEffect(() => {
        if(connection) {
            connection.on('ReceiveMessage', ((e) => {
                console.log(e)
            }))
        }
    }, [connection])

    function SendMessage() {
        if(connection) {
            connection.invoke("SendMessage", "Cool bro")
        }
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Feed Screen</Text>
            <Button
                title="Send message"
                onPress={() => {
                    SendMessage()
                }}
            />
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