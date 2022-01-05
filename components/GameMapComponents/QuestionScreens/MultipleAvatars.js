import { Box, Center, VStack, Image } from 'native-base'
import React from 'react'
import { Platform } from 'react-native';
import { gameSvgs, GetAvatarColor } from '../CommonGameFunc';

export function MultipleAvatars({ avatarNames }) {
    return (
        <VStack flex={1}>
            <Center>
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

                <Box mt={2} style={{ backgroundColor: GetAvatarColor(avatarNames[1]), borderRadius: 20 }} shadow={7}>
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
            </Center>

        </VStack>
    )
}