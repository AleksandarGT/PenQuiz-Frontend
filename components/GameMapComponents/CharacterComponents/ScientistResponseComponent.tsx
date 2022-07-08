import React, { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { authAtom } from "../../../state"
import { scientistHintQuestionAtom } from "../../../state/character"
import { IAuthData } from "../../../types/authTypes"
import { CharacterType } from "../../../types/gameCharacterTypes"
import { Box, Center, HStack, Text, VStack, Image, Divider } from "native-base"
import { QuestionClientResponse } from "../../../types/gameResponseTypes"
import { Platform } from "react-native"

export default function ScientistResponseComponent({ question }: { question: QuestionClientResponse }) {
    const scientistState = useRecoilValue(scientistHintQuestionAtom)
    const user = useRecoilValue(authAtom) as IAuthData
    const [isHidden, setIsHidden] = useState(true)


    useEffect(() => {
        const participAbilities = question.participants.find(e => e.playerId == user.id)?.gameCharacter.characterAbilities

        if (!participAbilities) {
            setIsHidden(true)
            return
        }

        if (!scientistState) {
            setIsHidden(true)
            return
        }

        // If current character is not scientist, do not show the scientist response
        if (participAbilities.characterType != CharacterType.SCIENTIST) {
            setIsHidden(true)
            return
        }

        setIsHidden(false)
    }, [question, scientistState])

    if (isHidden)
        return null

    return (
        <>
            <Center>
                <Box backgroundColor={"#071D56"} mt={2} textAlign={"center"} borderRadius={20} borderColor={"#C5DFFF"} borderWidth={2} p={3}>
                    <HStack>
                        {Platform.OS == "web" ?
                            <VStack>
                                <Text color={"#C5DFFF"} fontSize={{ base: "md", md: "lg", lg: "xl" }} fontWeight={"bold"}>{scientistState?.minRange} - {scientistState?.maxRange}</Text>
                                <Divider />
                                <Text color={"#C5DFFF"} fontWeight="bold">Correct answer</Text>
                            </VStack>
                            :
                            <HStack>
                                <Text color={"#C5DFFF"} fontWeight={"bold"}>{scientistState?.minRange} - {scientistState?.maxRange}</Text>
                                <Text ml={3} color={"#C5DFFF"} fontWeight="bold">Correct answer</Text>
                            </HStack>
                        }
                        {Platform.OS == "web" && <Image
                            source={Platform.OS == "web" ? require("../../../assets/characterAssets/scientistFlask.svg") : require("../../../assets/characterAssets/scientistFlask.png")}
                            resizeMode="contain"
                            alt="sc"
                            size="xs"
                        />}
                    </HStack>
                </Box>
            </Center>
        </>
    )
}