import React, { useState } from 'react'
import { ImageBackground, StyleSheet, Platform } from 'react-native'
import { Center, Box, IconButton } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import RulesModal from '../Popups/RulesModal'


export default function GameDashboardBase(props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal }) {
    const [showRulesModal, setShowRulesModal] = useState(false)

    return (
        <ImageBackground source={Platform.OS === 'web' ? require('../../assets/homeBackground.svg') : require('../../assets/homeBackground.png')} resizeMode="cover" style={styles.image}>
            <Box top="5" position="absolute" right="5">
                <Center>
                    <IconButton
                        onPress={() => {
                            setShowRulesModal(true)
                        }}
                        size="md"
                        variant="outline"
                        _icon={{
                            as: Ionicons,
                            size: "2xl",
                            name: "game-controller",
                            color: "white"
                        }}
                    />
                </Center>
            </Box>
            <RulesModal showRulesModal={showRulesModal} setShowRulesModal={setShowRulesModal} />

            {props.children}
        
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
})