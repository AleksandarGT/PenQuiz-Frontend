import React, { useState, useEffect } from 'react'
import { View, ImageBackground, StyleSheet, ActivityIndicator, Platform } from 'react-native'
import { Text, Button, Center, Box, Pressable, Alert, VStack, HStack, AspectRatio, Icon, ScrollView, Input, Image, Container, IconButton, Divider } from 'native-base'
import CharacterCard from './CharacterCard';
import { MaterialIcons } from '@expo/vector-icons';


function ChampionHeader({ headerText }: { headerText: string }) {
    return (
        <Box>
            <HStack justifyContent="space-between" alignItems={"flex-end"} >
                <Text fontSize="2xl">{headerText}</Text>

                <IconButton
                    onPress={() => {

                    }}
                    size="md"
                    mt={2}
                    mr={2}
                    variant="outline"
                    _icon={{
                        as: MaterialIcons,
                        name: "info",
                        color: "white"
                    }}
                />

            </HStack>
            <Divider mt={2} mb={5} backgroundColor={"#fff"} />
        </Box>
    )
}

export default function BaseCharacterComponent() {
    const [currentScreen, setCurrentScreen] = useState("base")

    return (
        <ImageBackground source={Platform.OS === 'web' ? require('../../assets/homeBackground.svg') : require('../../assets/homeBackground.png')} resizeMode="cover" style={{
            flex: 1,
            justifyContent: "center"
        }}>
            {currentScreen != "base" && <Button onPress={() => {
                setCurrentScreen("base")
            }} borderColor="white" borderWidth={2} colorScheme='white_bd' variant="outline" color="white" style={{ position: "absolute", top: 5, left: 5 }} leftIcon={<Icon as={MaterialIcons} name="arrow-back-ios" size="sm" />}>
                Back
            </Button>}

            {currentScreen == "base" ?
                <View style={{ alignItems: "center", flex: 0.9 }}>

                    <Box flex={0.9} width="90%" minWidth="70%" bg="#071D56" p={8} borderRadius={25}>

                        {/* Header text */}
                        <Text mb={5} textAlign="center" color="#fff" fontSize={{ base: "md", md: "lg", lg: "xl", xl: "5xl" }} style={{ fontFamily: 'Before-Collapse', }}>
                            ConQuiz Penguins
                        </Text>



                        {/* Characters */}

                        <VStack flex={1}>
                            <ScrollView>
                                {/* Basic champions */}
                                <ChampionHeader headerText={"Basic penguins"} />


                                <HStack justifyContent="space-evenly">
                                    <CharacterCard avatarImageName={"penguinAvatarKing"} avatarName="Pedala" onPress={() => console.log("eh maika ti")} />
                                    <CharacterCard avatarImageName={"penguinAvatarKing"} avatarName="Pedala" onPress={() => console.log("eh maika ti")} />
                                    <CharacterCard avatarImageName={"penguinAvatarKing"} avatarName="Pedala" onPress={() => console.log("eh maika ti")} />
                                </HStack>


                                <Box my={7} />
                                <ChampionHeader headerText={"Premium penguins"} />

                                <HStack justifyContent="space-evenly">
                                    <CharacterCard avatarImageName={"penguinAvatarWizard"} avatarName="Baroveca" onPress={() => console.log("eh maika ti")} />
                                    <CharacterCard avatarImageName={"penguinAvatarWizard"} avatarName="Baroveca" onPress={() => console.log("eh maika ti")} />
                                    <CharacterCard avatarImageName={"penguinAvatarWizard"} avatarName="Baroveca" onPress={() => console.log("eh maika ti")} />
                                </HStack>
                            </ScrollView>

                        </VStack>

                    </Box>
                </View>
                : null
            }



        </ImageBackground>
    )
}