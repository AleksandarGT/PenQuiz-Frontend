import React, { useState } from 'react';
import { Text, Button, Input, Center, Modal, } from 'native-base';
import { View } from 'react-native';
import { useGameLobby, StatusCode } from '../actions/'

export function GameLobby({ route, navigation }) {
    const lobby = useGameLobby();

    const [backAction, setBackAction] = useState()
    React.useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {

                // Prevent default behavior of leaving the screen
                e.preventDefault();

                // Prompt the user before leaving the screen
                setBackAction(e.data.action)

            }),
        [navigation]
    );



    function CustomModal() {
        return (
            <Modal isOpen={backAction} onClose={() => setBackAction(null)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Contact Us</Modal.Header>
                    <Modal.Body>
                        <Text>
                            Are you sure you want to leave the game lobby? If you are the owner of it, the lobby will be canceled.
                        </Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button
                                onPress={() => {
                                    setBackAction(null)
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onPress={() => {
                                    lobby.LeaveGameLobby()
                                    setBackAction(null)
                                    navigation.dispatch(backAction)
                                }}
                            >
                                Go back
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        )

    }

    return (
        <>
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Center>
                    <CustomModal />
                    <Text color="black">Content</Text>
                    <Text color="black">Game Instance: {lobby?.gameInstance?.invitationLink}</Text>
                </Center>
            </View>
        </>
    )
}