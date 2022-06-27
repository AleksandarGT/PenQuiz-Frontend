import React, { useState, useEffect, useMemo } from 'react'
import { View, ImageBackground, StyleSheet, ActivityIndicator, Platform } from 'react-native'
import { Text, Button, Center, Box, Pressable, Alert, VStack, HStack, AspectRatio, Icon, ScrollView, Input, Image, Container, IconButton, Divider } from 'native-base'
import CharacterCard from './CharacterCard';
import { MaterialIcons } from '@expo/vector-icons';
import useCharacterData from '../../hooks/useCharacterData';
import DefaultAlert from '../Popups/DefaultAlert';
import { CharacterResponse } from '../../types/gameCharacterTypes';
import CharacterComponent from './CharacterComponent';


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
    const [selectedCharacter, setSelectedCharacter] = useState<CharacterResponse>()
    const {
        serverError,
        characters,
        getCharacter,
        freeCharacters,
        premiumCharacters,
    } = useCharacterData()

    // How many elements per row
    const charactersPerRow = 3

    // Adds each of the free characters into a row by 3
    const rowedFreeCharacters = useMemo(() => {
        if (!freeCharacters) return
        const rows = [...Array(Math.ceil(freeCharacters.length / charactersPerRow))];

        return rows.map((row, idx) => freeCharacters.slice(idx * charactersPerRow, idx * charactersPerRow + charactersPerRow))
    }, [characters])

    // Adds each of the premium characters into a row by 3
    const rowedPremiumCharacters = useMemo(() => {
        if (!premiumCharacters) return
        const rows = [...Array(Math.ceil(premiumCharacters.length / charactersPerRow))];

        return rows.map((row, idx) => premiumCharacters.slice(idx * charactersPerRow, idx * charactersPerRow + charactersPerRow))
    }, [characters])

    return (
        <ImageBackground source={Platform.OS === 'web' ? require('../../assets/homeBackground.svg') : require('../../assets/homeBackground.png')} resizeMode="cover" style={{
            flex: 1,
            justifyContent: "center"
        }}>


            {selectedCharacter && <Button onPress={() => {
                setSelectedCharacter(undefined)
            }} borderColor="white" borderWidth={2} colorScheme='white_bd' variant="outline" color="white" style={{ position: "absolute", top: 5, left: 5 }} leftIcon={<Icon as={MaterialIcons} name="arrow-back-ios" size="sm" />}>
                Back
            </Button>}

            <View style={{ alignItems: "center", flex: 0.9 }}>

                <Box flex={0.9} width="90%" minWidth="70%" bg="#071D56" p={8} borderRadius={25}>
                    {!selectedCharacter ?
                        <>
                            {/* Header text */}
                            <Text mb={5} textAlign="center" color="#fff" fontSize={{ base: "md", md: "lg", lg: "xl", xl: "5xl" }} style={{ fontFamily: 'Before-Collapse', }}>
                                ConQuiz Penguins
                            </Text>


                            {/* Display error if fetching characters */}
                            {serverError && <DefaultAlert message={serverError} />}

                            {/* Characters */}
                            <VStack flex={1}>
                                <ScrollView>
                                    {/* Basic champions */}
                                    <ChampionHeader headerText={"Basic penguins"} />
                                    {rowedFreeCharacters?.map(itemRow =>
                                        <HStack key={`${itemRow.length}-stack-free`} my={3} justifyContent="space-evenly">
                                            {itemRow.map(item =>
                                                <CharacterCard key={item.avatarName} avatarImageName={item.avatarName} avatarName={item.name} onPress={() => {
                                                    setSelectedCharacter(item)
                                                }} />
                                            )}

                                            {/* Invisible elements to keep the proportions on screen */}
                                            {itemRow.length != charactersPerRow && [...Array(charactersPerRow - itemRow.length)].map((el, i) =>
                                                <CharacterCard invisible key={`${i}-free`} avatarImageName={"penguinAvatarKing"} avatarName={"penguinAvatarKing"} />
                                            )}
                                        </HStack>
                                    )}


                                    <Box my={7} />
                                    <ChampionHeader headerText={"Premium penguins"} />

                                    {rowedPremiumCharacters?.map(itemRow =>
                                        <HStack key={`${itemRow.length}-stack-premium`} my={3} justifyContent="space-evenly">
                                            {itemRow.map(item =>
                                                <CharacterCard key={item.avatarName} avatarImageName={item.avatarName} avatarName={item.name} onPress={() => setSelectedCharacter(item)} />
                                            )}

                                            {/* Invisible elements to keep the proportions on screen */}
                                            {itemRow.length != charactersPerRow && [...Array(charactersPerRow - itemRow.length)].map((el, i) =>
                                                <CharacterCard key={`${i}-premium`} invisible avatarImageName={"penguinAvatarKing"} avatarName={"King"} />
                                            )}
                                        </HStack>
                                    )}
                                </ScrollView>

                            </VStack>
                        </>
                        : <CharacterComponent characterResponse={selectedCharacter} />}
                </Box>
            </View>
        </ImageBackground>
    )
}