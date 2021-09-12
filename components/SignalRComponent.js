import { StyleSheet, ScrollView, TouchableOpacity, Text, View, Button, Alert, AppRegistry } from 'react-native';
import React, { Platform, useEffect, useState } from 'react';
import { HubConnection, HubConnectionBuilder, JsonHubProtocol, LogLevel } from "@microsoft/signalr";

export function SignalRComponent() {
    const [connection, setConnection] = useState(null);
    const [count, setCount] = useState(5)

    // useEffect(() => {
    //     fetch("http://localhost:5000/api/example/awe")
    //         .then((response) => response.json())
    //         .then((json) => {
    //             console.log(json)
    //         })
    // })
    useEffect(() => {
        const connect = new HubConnectionBuilder()
        .withUrl("http://localhost:5000/chathubs")
        .withAutomaticReconnect()
        .withHubProtocol(new JsonHubProtocol())
        .configureLogging(LogLevel.Information)
        .build();

        setConnection(connect);
    }, [])

    useEffect(() => {

    if (connection) {
        connection
        .start()
        .then(() => {
            connection.on("ReceiveMessage", (message) => {
                console.log(message)
            });
            console.log(connection)
        })
        .catch((error) => console.log(error));
    }
    }, [connection]);

    const sendMessage = async () => {
        if (connection) {
            // await connection.send("SendMessage", `I send this. NR: ${count}`);
            await connection.invoke("SendMessage", `I send this. NR: ${count}`);
            setCount(count + 1)
        }
    };

    return (
        <View style={styles.main}>
            <Text>I am text</Text>
            <Button title={'FUCK CORS'} onPress={sendMessage} type="primary" />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})