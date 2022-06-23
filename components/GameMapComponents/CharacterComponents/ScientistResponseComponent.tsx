import React, { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { authAtom } from "../../../state"
import { scientistHintQuestionAtom } from "../../../state/character"
import { IAuthData } from "../../../types/authTypes"
import { CharacterType } from "../../../types/gameCharacterTypes"
import { Box, Center, Text } from "native-base"
import { QuestionClientResponse } from "../../../types/gameResponseTypes"

export default function ScientistResponseComponent({ question }: { question: QuestionClientResponse }) {
    const scientistState = useRecoilValue(scientistHintQuestionAtom)
    const user = useRecoilValue(authAtom) as IAuthData
    const [isHidden, setIsHidden] = useState(true)


    useEffect(() => {
        const participAbilities = question.participants.find(e => e.playerId == user.id)!.gameCharacter.characterAbilities

        console.log(participAbilities)
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
                <Box backgroundColor={"#071D56"} mt={2} textAlign={"center"} borderRadius={15} p={3}>
                    <Text>Answer is between:</Text>
                    <Text fontWeight={"bold"}>{scientistState?.minRange} - {scientistState?.maxRange}</Text>
                </Box>
            </Center>
        </>
    )
}