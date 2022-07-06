import React from 'react'
import { ImageBackground, Platform } from 'react-native'
import { Text, Button, Center, Box, Pressable, Image, } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons';
import { GetPenguinAvatarImage } from '../GameMapComponents/CommonGameFunc';

export default function CharacterCard({
    avatarName,
    avatarImageName,
    onPress,
    invisible,
    unavailable,
    selected,
}: {
    avatarName: string,
    avatarImageName: string,
    onPress?: () => void,
    unavailable?: boolean,
    invisible?: boolean,
    selected?: boolean,
}) {

    return (
        <Center opacity={invisible ? 0 : 100}>

            <Pressable disabled={invisible || unavailable} onPress={() => {
                onPress && onPress()
            }}>
                {({ isHovered, isFocused, isPressed }) => {
                    return (
                        <Box style={{
                            backgroundColor: "#fff",
                            borderRadius: 25,
                            borderColor: "gold",
                            borderWidth: selected ? 3 : 0,
                        }}>
                            {unavailable && <Box height="100%" style={{
                                position: "absolute",
                                borderRadius: 25,
                                zIndex: 150,
                                elevation: 10,
                                backgroundColor: "rgba(0, 0, 0, 0.6)",
                                justifyContent: "center"
                            }}
                                width="100%" />}

                            <ImageBackground style={{
                                backgroundColor: "#032157",
                            }} source={Platform.OS === "web" ? require('../../assets/characterBackground.svg') : require('../../assets/characterBackground.png')} imageStyle={{ borderRadius: 25, borderColor: "#fff", borderWidth: 2, opacity: 0.8 }} resizeMode="cover" >

                                {/* On hover, press toggle overlay */}
                                {(isHovered || isPressed) && <Box height="100%" style={{
                                    position: "absolute",
                                    zIndex: 150,
                                    elevation: 10,
                                    backgroundColor: `rgba(0, 0, 0, ${isPressed ? 0.4 : 0.3})`,
                                    justifyContent: "center",
                                    borderRadius: 25,
                                }} width="100%" />}


                                <Box px={3} m={3}>

                                    <Image
                                        source={GetPenguinAvatarImage(avatarImageName)}
                                        alt="Alternate Text"
                                        resizeMode="contain"
                                        size={Platform.OS == "web" ? "48" : "sm"}
                                    />
                                </Box>
                                <Box style={{
                                    borderBottomLeftRadius: 25,
                                    borderBottomRightRadius: 25,
                                    borderColor: "#fff",
                                    borderBottomWidth: 2,
                                    borderLeftWidth: 2,
                                    borderRightWidth: 2
                                }} p={3} backgroundColor="#0F5688">
                                    <Text selectable={false} textAlign={"center"} fontSize={{ base: "md", md: "lg", lg: "xl", xl: "4xl" }} style={{ fontFamily: 'Before-Collapse', }}>
                                        {avatarName}
                                    </Text>
                                </Box>

                            </ImageBackground>
                        </Box>

                    )
                }}
            </Pressable>
        </Center>
    )
}