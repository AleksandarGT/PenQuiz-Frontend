import React, { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { authAtom } from "../../../state"
import { scientistHintQuestionAtom } from "../../../state/character"
import { IAuthData } from "../../../types/authTypes"
import { CharacterType } from "../../../types/gameCharacterTypes"
import { Box, Center, HStack, Text, VStack, Image, Divider } from "native-base"
import { QuestionClientResponse } from "../../../types/gameResponseTypes"

export default function ScientistResponseComponent({ question }: { question: QuestionClientResponse }) {
    const scientistState = useRecoilValue(scientistHintQuestionAtom)
    const user = useRecoilValue(authAtom) as IAuthData
    const [isHidden, setIsHidden] = useState(true)


    useEffect(() => {
        const participAbilities = question.participants.find(e => e.playerId == user.id)!.gameCharacter.characterAbilities

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
                        <VStack>
                            <Text color={"#C5DFFF"} fontSize="lg" fontWeight={"bold"}>{scientistState?.minRange} - {scientistState?.maxRange}</Text>
                            <Divider />
                            <Text color={"#C5DFFF"} fontWeight="bold">Correct answer</Text>
                        </VStack>
                        <Image
                            source={require("../../../assets/characterAssets/scientistFlask.svg")}
                            alt="Alternate Text"
                            resizeMode="contain"
                            size="xs"
                        />
                    </HStack>
                </Box>
            </Center>
        </>
    )
}