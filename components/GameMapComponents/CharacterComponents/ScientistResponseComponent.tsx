import React, { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { authAtom } from "../../../state"
import { scientistHintQuestionAtom } from "../../../state/character"
import { IAuthData } from "../../../types/authTypes"
import { CharacterType } from "../../../types/gameCharacterTypes"
import { Box, Text } from "native-base"
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
            <Box>
                <Text>Answer is between:</Text>
                <Text>{scientistState?.minRange} - {scientistState?.maxRange}</Text>
            </Box>
        </>
    )
}