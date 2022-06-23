import { Box, Center, Pressable, Text } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { WizardUseMultipleChoiceHint } from "../../../hooks";
import { gameTimerAtom, authAtom, gameInstanceAtom } from "../../../state";
import { IAuthData } from "../../../types/authTypes";
import { CharacterType } from "../../../types/gameCharacterTypes";
import { QuestionClientResponse } from "../../../types/gameResponseTypes";

export default function ScientistActionComponent({ question, invisible }
    : { question: QuestionClientResponse, invisible?: boolean }) {

    const [showScientistButton, setShowScientistButton] = useState<boolean>(false);
    const [scientistAbilityUsed, setScientistAbilityUsed] = useState<boolean>(false);

    const globalDisplayTime = useRecoilValue(gameTimerAtom)
    const user = useRecoilValue(authAtom) as IAuthData
    const gameInstance = useRecoilValue(gameInstanceAtom)

    const getThisUserScientistAbilities = useMemo(() => {
        return question.participants.find(e => e.playerId == user.id)?.gameCharacter?.characterAbilities.scientistCharacterAbilitiesResponse
    }, [question, user])

    const areAllHintsUsed = useMemo(() => {
        if (!getThisUserScientistAbilities) return true;

        return getThisUserScientistAbilities?.numberQuestionHintUseCount >= getThisUserScientistAbilities?.numberQuestionHintMaxUseCount
    }, [getThisUserScientistAbilities])


    useEffect(() => {
        const thisUserParticipant = question.participants.find(e => e.playerId == user.id)

        if (thisUserParticipant?.gameCharacter?.characterAbilities.characterType != CharacterType.SCIENTIST) return

        // Visible only on number rounds
        if (question.type != "number")
            return

        setShowScientistButton(true)
        setScientistAbilityUsed(false)
    }, [question.question, user])


    // If the wizard ability was used this round do not allow any more activations for this round
    useEffect(() => {
        if (!getThisUserScientistAbilities || !getThisUserScientistAbilities.abilityUsedInRounds)
            return

        const currentRound =
            gameInstance?.rounds.find(e => e.gameRoundNumber == gameInstance.gameRoundNumber)

        if (!getThisUserScientistAbilities.abilityUsedInRounds.some(e => e == currentRound?.id))
            return
            
        setScientistAbilityUsed(true)
    }, [getThisUserScientistAbilities?.abilityUsedInRounds])


    if (!showScientistButton)
        return null


    return (
        <Pressable opacity={invisible ? 0 : 100} disabled={invisible || areAllHintsUsed || scientistAbilityUsed} onPress={() => {
            WizardUseMultipleChoiceHint(globalDisplayTime)
            setScientistAbilityUsed(true)
        }}>
            {({ isHovered, isFocused, isPressed }) => {
                return (
                    <Box style={{
                        aspectRatio: 1 / 1,
                    }} p={2} mt={6} shadow={3} bg={
                        isPressed ? "#0D569B" : isHovered ? "#06326F" : "#071D56"
                    } borderRadius={10}>
                        <Center>
                            <Text selectable={false} >
                                Scientist
                            </Text>
                            <Text selectable={false}>
                                {getThisUserScientistAbilities?.numberQuestionHintUseCount} / {getThisUserScientistAbilities?.numberQuestionHintMaxUseCount}
                            </Text>
                        </Center>
                    </Box>
                )
            }}
        </Pressable>
    )
}