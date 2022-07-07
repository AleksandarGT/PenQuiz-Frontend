import { HStack, VStack, Text, Divider, View, Box } from "native-base";
import React from "react";
import { CharacterResponse } from "../../types/gameCharacterTypes";
import CharacterCard from "./CharacterCard";

export default function CharacterComponent({ characterResponse }: { characterResponse: CharacterResponse }) {
    return (
        <View style={{ justifyContent: 'center', flex: 1 }}>
            <HStack justifyContent={"space-evenly"}>
                <Box flex={0.5}>

                <CharacterCard avatarImageName={characterResponse.avatarName} avatarName={characterResponse.name} />
                </Box>
                <VStack flex={0.5}>
                    {/* Header text */}
                    <Text textAlign="center" color="#fff" fontSize={{ base: "md", md: "lg", lg: "xl", xl: "5xl" }} style={{ fontFamily: 'Before-Collapse', }}>
                        {characterResponse.name}
                    </Text>

                    <Divider my={9} />
                    <Text>{characterResponse.description}</Text>
                    <Divider my={9} />
                    <Text>Special ability: {characterResponse.abilityDescription}</Text>
                </VStack>
            </HStack>
        </View>
    )
}