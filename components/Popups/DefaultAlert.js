import React from 'react'
import {Alert, VStack, HStack, Text} from 'native-base'

export default function DefaultAlert({ message }) {
    return (
        <Alert my={3} maxW="80%" status="error">
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