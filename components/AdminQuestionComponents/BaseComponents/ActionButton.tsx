import { Box, Text } from "native-base"
import React from "react"
import { Pressable } from "native-base"

export default function TemplateButton({ onClick, mode, accept = false, reject = false, isEditable = true }) {
    return (
        <Pressable disabled={!isEditable} onPress={() => {
            onClick()
        }}>
            {({ isHovered, isFocused, isPressed }) => {
                return (
                    <Box borderColor="white" borderWidth={1} px={9} shadow={3} bg={!isEditable ? "gray.500" : accept && isPressed ? "green.700" : accept && isHovered ? "green.600" : accept ? "#00930F" : reject && isPressed ? "red.700" : reject && isHovered ? "red.600" : "#A01B1B"} borderRadius={50}>
                        <Box pb={2} pt={2}>
                            <Text fontSize={{ base: "md", md: "lg", lg: "xl", xl: "xl" }}>
                                {accept && mode == "view" ? "Edit" : mode == "verify" ? "Accept" : null}
                                {reject && "Reject"}
                            </Text>
                        </Box>
                    </Box>
                )
            }}
        </Pressable>
    )
}