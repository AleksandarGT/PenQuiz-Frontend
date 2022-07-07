import React, { useState } from 'react'
import { Text, Center, Box, Input, HStack, Icon, Pressable, Button, Alert, VStack } from 'native-base'
import DefaultAlert from '../Popups/DefaultAlert'
import { MaterialIcons } from '@expo/vector-icons';
import useAdminAccountActions from '../../hooks/useAdminAccountActions';
import { DetailedUserResponse } from '../../types/adminAccountTypes';

function TemplateButton({ onClick, isAdmin, isBanned }: { onClick: () => void, isAdmin: boolean, isBanned: boolean }) {
    return (
        <Pressable disabled={isAdmin} onPress={() => {
            onClick()
        }}>
            {({ isHovered, isFocused, isPressed }) => {
                return (
                    <Box borderColor="white" borderWidth={1} px={9} shadow={3} bg={isAdmin ? "gray.500" : isBanned && isPressed ? "green.700" : isBanned && isHovered ? "green.600" : isBanned ? "#00930F" : !isBanned && isPressed ? "red.700" : !isBanned && isHovered ? "red.600" : "#A01B1B"} borderRadius={50}>
                        <Box pb={2} pt={2}>
                            <Text selectable={false} fontSize={{ base: "md", md: "lg", lg: "xl", xl: "xl" }}>
                                {isBanned ? "Unban" : "Ban"}
                            </Text>
                        </Box>
                    </Box>
                )
            }}
        </Pressable>
    )
}
export default function DetailsUserComponent({ userData }: { userData: DetailedUserResponse }) {
    const adminActions = useAdminAccountActions(userData.id, userData.userGlobalIdentifier)

    const [isBanned, setIsBanned] = useState<boolean>(userData.isBanned)

    async function OnBanActionClick() {
        if (isBanned) {
            const res = await adminActions.unBanUser()
            if (res) {
                setIsBanned(false)
            }
            return
        }

        const res = await adminActions.banUser()
        if (res) {
            setIsBanned(true)
        }
    }

    function SuccessAlert({ message }: { message: string }) {
        return (
            <Alert my={3} maxW="90%" status="success">
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

    return (
        <Center>
            {/* {adminActions.serverSuccess && <SuccessAlert message={adminActions.serverSuccess} />} */}
            {adminActions.serverError && <DefaultAlert message={adminActions.serverError} />}

            {/* User ID */}
            <Box width="50%" minWidth="250px" maxWidth="600px">

                {/* Show banned banner */}
                {isBanned ?
                    <HStack mb={2} justifyContent={"space-between"}>
                        <Text ml={2} fontSize="lg">User ID:</Text>
                        <Text style={{
                            backgroundColor: "#8b0000",
                            color: "#fff"
                        }} borderRadius={8} p={1}>Banned</Text>
                    </HStack>
                    :
                    <Text ml={2} fontSize="lg">User ID:</Text>
                }
                <Input
                    shadow={3}
                    value={userData.id.toString()}
                    mb={2}
                    variant="rounded"
                    backgroundColor="#CDCDCD"
                    editable={false}
                    color="black"
                    size="md"
                />
            </Box>

            {/* User Global ID */}
            <Box width="50%" minWidth="250px" maxWidth="600px">
                <Text ml={2} fontSize="lg">User Global ID:</Text>

                <Input
                    shadow={3}
                    value={userData.userGlobalIdentifier}
                    mb={2}
                    variant="rounded"
                    editable={false}
                    color="black"
                    backgroundColor="#CDCDCD"
                    size="md"
                />
            </Box>


            {/* Email */}
            <Box width="50%" minWidth="250px" maxWidth="600px">
                <Text ml={2} fontSize="lg">Email:</Text>

                <Input
                    shadow={3}
                    value={userData.email}
                    mb={2}
                    variant="rounded"
                    editable={false}
                    color="black"
                    backgroundColor="#CDCDCD"
                    size="md"
                />
            </Box>


            {/* Username */}
            <Box width="50%" minWidth="250px" maxWidth="600px">
                <Text ml={2} fontSize="lg">Username:</Text>

                <Input
                    shadow={3}
                    value={userData.username}
                    mb={2}
                    variant="rounded"
                    editable={false}
                    color="black"
                    backgroundColor="#CDCDCD"
                    size="md"
                />
            </Box>

            {/* Last logged on */}
            <Box width="50%" minWidth="250px" maxWidth="600px">
                <Text ml={2} fontSize="lg">Last logged:</Text>

                <Input
                    shadow={3}
                    value={userData.lastLoggedAt}
                    mb={2}
                    variant="rounded"
                    editable={false}
                    color="black"
                    backgroundColor="#CDCDCD"
                    size="md"
                />
            </Box>


            <Box mt={6} />

            <HStack width="50%" minWidth="250px" maxWidth="600px" justifyContent="space-between">
                <TemplateButton isAdmin={userData.role == "admin"} isBanned={isBanned} onClick={OnBanActionClick} />
                <Button onPress={adminActions.giftUser} colorScheme="purple">
                    <Text fontSize="lg" >Gift king</Text>
                </Button>
            </HStack>

        </Center>
    )
}
