import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import { useSignalR } from '../actions/useSignalR'
import { Text, Button, Input } from 'native-base';

export function GameLobby({ route, navigation }) {
    const [users, setUsers] = useState([]);
    const [isDisconnected, setIsDisconnected] = useState(false);
    const [joiningGameException, setJoiningGameException] = useState();
    const [gameInstance, setGameInstance] = useState();
    const [code, setCode] = useState();
    const connection = useSignalR();

    connection.onreconnecting(() => {
        setIsDisconnected(true)
    })
    connection.onreconnected(() => {
        setIsDisconnected(false)
    })
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
            connection.on('JoiningGameException', ((er) => {
                setJoiningGameException(er)
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

    if (isDisconnected) {
        return (
            <>
                <ActivityIndicator size="large" />

            </>
        )
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
            {joiningGameException ? (
                <Text color="black">{joiningGameException}</Text>
            ) : null}
            <Button onPress={() => JoinLobby()}>Join game</Button>
            <Button isDisabled={users.length == 3 ? false : true} onPress={() => JoinLobby()}>Start Game</Button>

        </>
    )
}