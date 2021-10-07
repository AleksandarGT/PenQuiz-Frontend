import React from 'react';
import { View } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import { useSignalR } from '../actions/useSignalR'
import { Text, Button } from 'native-base';

export function Feed({ navigation, route }) {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Feed Screen</Text>
            <Button
                onPress={() => {
                    navigation.navigate('GameLobby')
                }}
                my={5}
            >Start Game</Button>
            <Button
                title="Join Game"
                onPress={() => {
                    navigation.navigate('Article', {
                        url: 'picachu-i-want-u'
                    })
                }}
            >Join Game</Button>
        </View>
    );
}