import { Box, Center, Container, HStack, Text, VStack, Image, Divider, Pressable, Input, Button, IconButton } from 'native-base'
import React, { useEffect, useState } from 'react'
import { ImageBackground, Platform, View } from 'react-native'
import { gameInstanceMock, gameSvgs, GetAvatarColor, multipleChoiceQuestionMock, numberChoicePvpQuestionMock, numberChoiceQuestionMock, playerQuestionAnswersMock, playerQuestionNumberAnswersMock } from '../CommonGameFunc'
import { authAtom, gameTimerAtom } from '../../../state'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { MaterialIcons } from '@expo/vector-icons'

export default function AnswerNumberQuestionComponent({question, AnswerNumberQuestion}) {
    const [answer, setAnswer] = useState("")
    const [isAnswered, setisAnswered] = useState(false)
    const user = useRecoilValue(authAtom)
    const timer = useRecoilValue(gameTimerAtom)

    return (
        <>
            {isAnswered ?
                <HStack mt={9} mb={2} justifyContent="center">
                    <Box width="33%" paddingY={6} borderRadius={25} bg={GetAvatarColor(question.participants.find(y => y.playerId == user.id).avatarName)}>
                        <Center alignItems="center" justifyContent="center">
                            <Text fontSize={{ base: "md", md: "lg", lg: "xl", xl: 26 }}>{answer}</Text>
                        </Center>
                    </Box>
                </HStack>
                :
                <Center mt={9} mb={2}>
                    <HStack>
                        <Input onChangeText={(e) => {
                            if (/^\d+$/.test(e) || !e) {
                                setAnswer(e)
                            }
                        }}
                            onSubmitEditing={() => {
                                if (isAnswered) return
                                setisAnswered(true)
                                AnswerNumberQuestion(answer, timer)
                            }}
                            value={answer}
                            maxLength={14}
                            mr={2}
                            keyboardType="numeric"
                            variant="rounded"
                            bg="#D7D7D7"
                            color="black"
                            _hover={{ bg: "#C6C6C6" }}
                            size="sm"
                            width="50%"
                            placeholder="" />

                        <IconButton
                            onPress={() => {
                                if (isAnswered) return
                                setisAnswered(true)
                                AnswerNumberQuestion(answer, timer)
                            }}
                            size="md"
                            colorScheme="blue_button_bd"
                            variant="solid"
                            _icon={{
                                as: MaterialIcons,
                                name: "check",
                                color: "white"
                            }}
                        />
                    </HStack>
                </Center>
            }
        </>
    )
}