import { Box, Image, Center, VStack } from 'native-base'
import React from 'react'
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
                                    source={gameSvgs.find(x => x.name == avatarName).img}
                                    alt="Alternate Text"
                                    resizeMode="contain"
                                    size="lg"
                                />
                            </Center>
                        </VStack>
                    </Box>
                </Box>

                <Center style={{ borderColor: "black", borderWidth: 2, borderRadius: 15 }} mt={3} p={2}>
                    <Image
                        source={gameSvgs.find(x => x.name == supportIcon).img}
                        alt="Alternate Text"
                        resizeMode="contain"
                        size="sm"
                    />
                </Center>
            </Center>

        </VStack>
    )
}