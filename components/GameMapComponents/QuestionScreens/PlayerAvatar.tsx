import { Box, Image, Center, VStack, Text } from 'native-base'
import React from 'react'
import { Platform } from 'react-native';
import { useRecoilValue } from 'recoil';
import { participantSelector } from '../../../state';
import { ParticipantsResponse } from '../../../types/gameInstanceTypes';
import { gameSvgs, GetAvatarColor } from '../CommonGameFunc';

export function PlayerAvatar({ supportIcon, participant }: { supportIcon: string, participant: ParticipantsResponse }) {
    return (
        <VStack justifyContent="center" flex={1}>
            <Center>
                <Center style={{ borderColor: "white", borderWidth: 5, borderRadius: 15 }} p={2}>
                    <Image
                        source={Platform.OS == "web" ? gameSvgs.find(x => x.name == supportIcon)!.img : gameSvgs.find(x => x.name == supportIcon)!.imgPng}
                        alt="alt"
                        resizeMode="contain"
                        size={Platform.OS == "web" ? "sm" : "xs"}
                    />
                </Center>

                <Box shadow={5} borderWidth={1} p={6} bg="white" borderRadius={25} mt={3}>
                    <Box style={{ backgroundColor: GetAvatarColor(participant.inGameParticipantNumber), borderRadius: 20 }} shadow={7}>
                        <Box m={2} p={2} backgroundColor="white" borderRadius={2000} shadow={5}>
                            <VStack>
                                <Center>
                                    <Image
                                        source={Platform.OS == "web" ? gameSvgs.find(x => x.name == participant.gameCharacter?.character.avatarName)!.img
                                            : gameSvgs.find(x => x.name == participant.gameCharacter?.character.avatarName)!.imgPng}

                                        alt="alt"
                                        resizeMode="contain"
                                        size={Platform.OS == "web" ? "md" : "xs"}
                                    />
                                </Center>
                            </VStack>
                        </Box>
                    </Box>
                    <Text color="black" isTruncated textAlign="center" fontSize="lg" mt={1}>
                        {participant.player?.username ?? "undefined"}
                    </Text>
                </Box>
            </Center>

        </VStack>
    )
}