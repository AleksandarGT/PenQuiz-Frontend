import { Center, Container, HStack, Text, Image, VStack, Box } from "native-base";
import React, { useState } from "react"
import { View, StyleSheet } from 'react-native';

export default function GameMap({ participant, hisTurn }) {
    function GetAvatarColor(avatarName) {
        switch (avatarName) {
            case "penguinAvatar":
                return "#5074FF"
            case "penguinAvatar2":
                return "#8350FF"
            case "penguinAvatar3":
                return "#FF5074"
        }
    }
    return (
        <>
            <Box backgroundColor={GetAvatarColor(participant.avatarName)} style={hisTurn ? {
                borderWidth: 5,
                borderColor: "gold"
            } : null} width={300} p={3} m={1} borderRadius={25}>
                <HStack>
                    <Container bg="#fff" borderRadius={200} p={2}>
                        <Image
                            source={require(`../../assets/${participant.avatarName}.svg`)}
                            alt="Alternate Text"
                            resizeMode="contain"
                            size="md"
                        />

                    </Container>
                    <Center>
                        <VStack>

                            <Text ml={2} isTruncated maxWidth={180} fontSize={{ base: "md", md: "lg", lg: "xl" }}>
                                {participant.player.username}
                            </Text>

                            <Box ml={2} width="150" bg="#fff" borderRadius={15}>
                                <Center>
                                    <Text color={GetAvatarColor(participant.avatarName)}
                                        fontSize={{ base: "md", md: "lg", lg: "xl" }}>
                                        {participant.score}
                                    </Text>
                                </Center>
                            </Box>

                        </VStack>
                    </Center>
                </HStack>
            </Box>
        </>
    )
}

const styles = StyleSheet.create({
    dimmedBackground: {
        backgroundColor: "black",
        zIndex: 205
    },
})