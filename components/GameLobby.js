import React, { useState } from 'react';
import { View } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import { useSignalR } from '../actions/useSignalR'
import { Text, Button, Input } from 'native-base';

export function GameLobby({ route, navigation }) {
    const [users, setUsers] = useState();
    const [gameInstance, setGameInstance] = useState();
    const [code, setCode] = useState();
    const connection = useSignalR();

    useEffect(() => {
        if (connection) {
            connection.on('AllLobbyPlayers', ((e) => {
                setUsers(e)
            }))
            connection.on('LobbyCanceled', (() => {
                navigation.navigate('Home')
            }))
            connection.on('GetGameInstance', ((gi) => {
                setGameInstance(gi)
            }))
        }
    }, [connection])

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', () => {
            // do something
            connection?.stop()
        });
        return unsubscribe
    }, [navigation])

    function SendMessage() {
        if (connection) {
            connection.invoke("CreateGameLobby")
        }
    }

    function JoinLobby() {
        if (connection) {
            connection.invoke("JoinGameLobby", code)
        }
    }

    return (
        <>
            {gameInstance && (
                <Text color="black">Game code: {gameInstance?.invitationLink}</Text>
            )}
            {users && users.map(x => (
                <Text color="black" key={x.id}>My name is: {x.username}</Text>
            ))}

            <Button onPress={() => SendMessage()}>Game Lobby</Button>
            <Input mt={5} onChangeText={setCode} variant="outline" placeholder="Code" />
            <Button onPress={() => JoinLobby()}>Join game</Button>

        </>
    )
}