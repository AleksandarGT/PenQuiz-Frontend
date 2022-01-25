import { Box, Image, Center, VStack, Text } from 'native-base'
import React from 'react'
import { Platform } from 'react-native';
import { useRecoilValue } from 'recoil';
import { participantSelector } from '../../../state';
import { gameSvgs, GetAvatarColor } from '../CommonGameFunc';

export function PlayerAvatar({ supportIcon, avatarName }) {
    const participants = useRecoilValue(participantSelector)

    return (
        <VStack justifyContent="center" flex={1}>
            <Center>
                <Center  style={{ borderColor: "white", borderWidth: 5, borderRadius: 15 }} p={2}>
                    <Image
                        source={Platform.OS == "web" ? gameSvgs.find(x => x.name == supportIcon).img : gameSvgs.find(x => x.name == supportIcon).imgPng}
                        alt="Alternate Text"
                        resizeMode="contain"
                        size={Platform.OS == "web" ? "sm" : "xs"}
                    />
                </Center>

                <Box shadow={5} borderWidth={1} p={6} bg="white" borderRadius={25} mt={3}>
                    <Box style={{ backgroundColor: GetAvatarColor(avatarName), borderRadius: 20 }} shadow={7}>
                        <Box m={2} p={2} backgroundColor="white" borderRadius={2000} shadow={5}>
                            <VStack>
                                <Center>
                                    <Image
                                        source={Platform.OS == "web" ? gameSvgs.find(x => x.name == avatarName).img : gameSvgs.find(x => x.name == avatarName).imgPng}
                                        alt="Alternate Text"
                                        resizeMode="contain"
                                        size={Platform.OS == "web" ? "md" : "xs"}
                                    />
                                </Center>
                            </VStack>
                        </Box>
                    </Box>
                    <Text color="black" textAlign="center" fontSize="lg" mt={1}>
                        {participants?.find(x => x.avatarName == avatarName)?.player.username ?? "undefined"}
                    </Text>
                </Box>
            </Center>

        </VStack>
    )
}