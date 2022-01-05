import { Box, Image, Center, VStack } from 'native-base'
import React from 'react'
import { Platform } from 'react-native';
import { gameSvgs, GetAvatarColor } from '../CommonGameFunc';

export function PlayerAvatar({ supportIcon, avatarName }) {
    return (
        <VStack flex={1}>
            <Center>
                <Box style={{ backgroundColor: GetAvatarColor(avatarName), borderRadius: 20 }} shadow={7}>
                    <Box m={2} p={2} backgroundColor="white" borderRadius={2000} shadow={5}>
                        <VStack>
                            <Center>
                                <Image
                                    source={Platform.OS == "web" ? gameSvgs.find(x => x.name == avatarName).img : gameSvgs.find(x => x.name == avatarName).imgPng}
                                    alt="Alternate Text"
                                    resizeMode="contain"
                                    size={Platform.OS == "web" ? "lg" : "sm"}
                                />
                            </Center>
                        </VStack>
                    </Box>
                </Box>

                <Center style={{ borderColor: "black", borderWidth: 2, borderRadius: 15 }} mt={3} p={2}>
                    <Image
                        source={Platform.OS == "web" ? gameSvgs.find(x => x.name == supportIcon).img : gameSvgs.find(x => x.name == supportIcon).imgPng}
                        alt="Alternate Text"
                        resizeMode="contain"
                        size={Platform.OS == "web" ? "sm" : "xs"}
                    />
                </Center>
            </Center>

        </VStack>
    )
}