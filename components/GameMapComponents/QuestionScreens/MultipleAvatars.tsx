import { Box, Center, VStack, Image, Text } from 'native-base'
import React from 'react'
import { Platform } from 'react-native';
import { ParticipantsResponse } from '../../../types/gameInstanceTypes';
import { gameSvgs, GetAvatarColor } from '../CommonGameFunc';

export function MultipleAvatars({ participants }: { participants: ParticipantsResponse[] }) {
    return (
        <VStack flex={1}>
            <Center>
                <Box shadow={5} borderWidth={1} p={2} bg="white" borderRadius={25} mt={3}>
                    <Box style={{ backgroundColor: GetAvatarColor(participants[0].inGameParticipantNumber), borderRadius: 20 }} shadow={7}>
                        <Box m={2} p={2} backgroundColor="white" borderRadius={2000} shadow={5}>
                            <VStack>
                                <Center>
                                    <Image
                                        source={Platform.OS == "web" ? gameSvgs.find(x => x.name == participants[0].gameCharacter?.character.avatarName)!.img
                                            : gameSvgs.find(x => x.name == participants[0].gameCharacter?.character.avatarName)!.imgPng}
                                        alt="alt"
                                        resizeMode="contain"
                                        size={Platform.OS == "web" ? "md" : "xs"}
                                    />
                                </Center>
                            </VStack>
                        </Box>
                    </Box>
                    <Text color="black" isTruncated textAlign="center" fontSize="lg" mt={1}>
                        {participants[0].player?.username ?? "undefined"}
                    </Text>
                </Box>


                <Box mt={2} shadow={5} borderWidth={1} p={2} bg="white" borderRadius={25}>
                    <Box style={{ backgroundColor: GetAvatarColor(participants[1].inGameParticipantNumber), borderRadius: 20 }} shadow={7}>
                        <Box m={2} p={2} backgroundColor="white" borderRadius={2000} shadow={5}>
                            <VStack>
                                <Center>
                                    <Image
                                        source={Platform.OS == "web" ? gameSvgs.find(x => x.name == participants[1].gameCharacter?.character.avatarName)!.img
                                            : gameSvgs.find(x => x.name == participants[1].gameCharacter?.character.avatarName)!.imgPng}
                                        alt="alt"
                                        resizeMode="contain"
                                        size={Platform.OS == "web" ? "md" : "xs"}
                                    />
                                </Center>
                            </VStack>
                        </Box>
                    </Box>
                    <Text color="black" isTruncated textAlign="center" fontSize="lg" mt={1}>
                        {participants[1].player?.username ?? "undefined"}
                    </Text>
                </Box>
            </Center>
        </VStack >
    )
}