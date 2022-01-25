import { Box, Center, VStack, Image, Text } from 'native-base'
import React from 'react'
import { Platform } from 'react-native';
import { useRecoilValue } from 'recoil';
import { participantSelector } from '../../../state';
import { gameSvgs, GetAvatarColor } from '../CommonGameFunc';

export function MultipleAvatars({ avatarNames }) {
    const participants = useRecoilValue(participantSelector)

    return (
        <VStack flex={1}>
            <Center>
                <Box shadow={5} borderWidth={1} p={2} bg="white" borderRadius={25} mt={3}>
                    <Box style={{ backgroundColor: GetAvatarColor(avatarNames[0]), borderRadius: 20 }} shadow={7}>
                        <Box m={2} p={2} backgroundColor="white" borderRadius={2000} shadow={5}>
                            <VStack>
                                <Center>
                                    <Image
                                        source={Platform.OS == "web" ? gameSvgs.find(x => x.name == avatarNames[0]).img : gameSvgs.find(x => x.name == avatarNames[0]).imgPng}
                                        alt="Alternate Text"
                                        resizeMode="contain"
                                        size={Platform.OS == "web" ? "md" : "xs"}
                                    />
                                </Center>
                            </VStack>
                        </Box>
                    </Box>
                    <Text color="black" textAlign="center" fontSize="lg" mt={1}>
                        {participants?.find(x => x.avatarName == avatarNames[0])?.player.username ?? "undefined"}
                    </Text>
                </Box>


                <Box mt={2} shadow={5} borderWidth={1} p={2} bg="white" borderRadius={25} mt={3}>
                    <Box style={{ backgroundColor: GetAvatarColor(avatarNames[1]), borderRadius: 20 }} shadow={7}>
                        <Box m={2} p={2} backgroundColor="white" borderRadius={2000} shadow={5}>
                            <VStack>
                                <Center>
                                    <Image
                                        source={Platform.OS == "web" ? gameSvgs.find(x => x.name == avatarNames[1]).img : gameSvgs.find(x => x.name == avatarNames[1]).imgPng}
                                        alt="Alternate Text"
                                        resizeMode="contain"
                                        size={Platform.OS == "web" ? "md" : "xs"}
                                    />
                                </Center>
                            </VStack>
                        </Box>
                    </Box>
                    <Text color="black" textAlign="center" fontSize="lg" mt={1}>
                        {participants?.find(x => x.avatarName == avatarNames[1])?.player.username ?? "undefined"}
                    </Text>
                </Box>
            </Center>

        </VStack >
    )
}