import React, { useState, useEffect } from 'react'
import { View, ImageBackground, StyleSheet, ActivityIndicator, Platform } from 'react-native'
import { Text, Button, Center, Box, Pressable, Alert, VStack, HStack, AspectRatio, Icon, ScrollView } from 'native-base'
import { useIsFocused } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import useAdminUserAccounts from '../../hooks/useAdminUserAccounts';

export default function BaseAdminAccountsComponent() {
    const windowWidth = Dimensions.get('screen').width;
    const [onSuccess, setOnSuccess] = useState()
    const isFocused = useIsFocused()
    const adminUserAccounts = useAdminUserAccounts()

    const [selectedUser, setSelectedUser] = useState()
    const [currentScreen, setCurrentScreen] = useState("base")

    useEffect(() => {
        if (!isFocused) return
        adminUserAccounts.fetchUsers(1)

    }, [isFocused])

    useEffect(() => {
        if (!isFocused) {
            setCurrentScreen("base")
            setOnSuccess(null)
        }
    }, [isFocused])

    function SuccessAlert({ message, status }) {
        return (
            <Alert my={3} maxW="90%" status={status}>
                <VStack space={2} flexShrink={1} w="100%">
                    <HStack flexShrink={1} space={2} >
                        <Alert.Icon mt="1" />
                        <Text fontSize="md" color="coolGray.800">
                            {message}
                        </Text>
                    </HStack>
                </VStack>
            </Alert>
        )
    }


    function ButtonTemplate({ onPressEvent, buttonText, left, right }) {
        return (
            <Pressable onPress={() => {
                onPressEvent()
            }}>
                {({ isHovered, isFocused, isPressed }) => {
                    return (
                        <Box px={9} shadow={3} bg={isPressed ? "#8EC8CD" : isHovered ? "#ACE6EB" : "#C8FBFF"} p={2} borderRadius={50}>
                            <Box px={4} pb={1} pt={1}>
                                <HStack justifyContent="center">
                                    {left && <Center>
                                        <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
                                    </Center>}

                                    <Text fontSize={{ base: "sm", md: "md", lg: "lg", xl: "xl" }} color="#032157" fontStyle="italic">
                                        {buttonText}
                                    </Text>

                                    {right && <Center>
                                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                                    </Center>}
                                </HStack>

                            </Box>
                        </Box>
                    )
                }}
            </Pressable>
        )
    }

    function AccountRow({ user, onPress }) {
        return (
            <Pressable onPress={() => {
                onPress()
            }}>
                {({ isHovered, isFocused, isPressed }) => {
                    return (
                        <Box width="100%" p={2} borderWidth={2} borderColor="#B6F6FF" bg={isPressed ? "#0C3958" : isHovered ? "#0E466D" : "#0F5688"}>
                            <HStack justifyContent="space-between">
                                <Box>
                                    <HStack>
                                        <AspectRatio p={Platform.OS == "web" ? 4 : 3} bg="white" ratio={1 / 1} borderRadius={10}>
                                            <Center>
                                                <MaterialIcons name="account-circle" size={24} color="black" />

                                            </Center>
                                        </AspectRatio>
                                        <Text alignSelf="center" ml={3} isTruncated maxW={windowWidth * 0.4} fontSize={{ base: "md", md: "md", lg: "lg", xl: "xl" }}>
                                            {user.email}
                                        </Text>
                                    </HStack>
                                </Box>
                                <Center>
                                    <HStack>
                                        {/* If person is banned, display annotation */}
                                        {user.isBanned && <Text style={{
                                            backgroundColor: "#8b0000",
                                            color: "#fff"
                                        }} borderRadius={8} p={1}>Banned</Text>}
                                        <Center>
                                            <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
                                        </Center>
                                    </HStack>
                                </Center>


                            </HStack>
                        </Box>
                    )
                }}
            </Pressable>
        )
    }

    function RenderBase() {
        return (
            <View style={{ alignItems: "center", flex: 0.9 }}>

                <Box flex={0.9} width="90%" minWidth="70%" bg="#071D56" p={8} borderRadius={25}>
                    <Text mb={5} textAlign="center" color="#fff" fontSize={{ base: "md", md: "lg", lg: "xl", xl: "3xl" }} style={{ fontFamily: 'Before-Collapse', }}>
                        Game users
                    </Text>

                    {onSuccess && <SuccessAlert message={onSuccess.message} status={onSuccess.status} />}


                    {!adminUserAccounts.userResponse && <ActivityIndicator size="large" />}

                    {adminUserAccounts.userResponse && adminUserAccounts.userResponse.users.length == 0 &&
                        <Text textAlign="center">
                            No users in the system
                        </Text>
                    }

                    <VStack flex={1}>
                        <ScrollView>
                            {adminUserAccounts.userResponse && adminUserAccounts.userResponse.users.map(e => {
                                return (
                                    <AccountRow key={e.id} user={e} onPress={() => {
                                        setSelectedUser(e)
                                        // Call the details panel here 
                                        ///
                                        ///
                                        ///
                                    }} />
                                )
                            })}
                        </ScrollView>




                    </VStack>

                    {adminUserAccounts.userResponse && <HStack justifyContent={adminUserAccounts.userResponse.hasPreviousPage && adminUserAccounts.userResponse.hasNextPage ? "space-between" : adminUserAccounts.userResponse.hasNextPage ? "flex-end" : "flex-start"} mt={5} mx={2}>
                        {adminUserAccounts.userResponse.hasPreviousPage && <ButtonTemplate left buttonText="Previous" onPressEvent={() => {
                            adminUserAccounts.goPrevious()
                        }} />}
                        {adminUserAccounts.userResponse.hasNextPage && <ButtonTemplate right buttonText="Next" onPressEvent={() => {
                            adminUserAccounts.goNext()
                        }} />}
                    </HStack>}

                </Box>
            </View>
        )
    }

    return (
        <ImageBackground source={Platform.OS === 'web' ? require('../../assets/homeBackground.svg') : require('../../assets/homeBackground.png')} resizeMode="cover" style={styles.image}>
            {currentScreen != "base" && <Button onPress={() => {
                setOnSuccess(null)
                setCurrentScreen("base")
            }} colorScheme='white_bd' variant="outline" color="white" style={{ position: "absolute", top: 50, left: 50 }} leftIcon={<Icon as={MaterialIcons} name="arrow-back-ios" size="sm" />}>
                Back
            </Button>}

            <RenderBase />


        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
})