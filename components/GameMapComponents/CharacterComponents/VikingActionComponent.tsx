import { Box, Center, Pressable, Text } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { VikingUseAbility, WizardUseMultipleChoiceHint } from "../../../hooks";
import { gameTimerAtom, authAtom, gameInstanceAtom } from "../../../state";
import { vikingAbilityUsedInRoundAtom } from "../../../state/character";
import { IAuthData } from "../../../types/authTypes";
import { CharacterType } from "../../../types/gameCharacterTypes";
import { QuestionClientResponse } from "../../../types/gameResponseTypes";

export default function VikingActionComponent({ question, invisible }
    : { question: QuestionClientResponse, invisible?: boolean }) {

    const [showVikingButton, setShowVikingButton] = useState<boolean>(false);
    const [vikingAbilityUsed, setVikingAbilityUsed] = useState<boolean>(false);
    const gameInstance = useRecoilValue(gameInstanceAtom)

    const vikingAbilityUsedInRoundId = useRecoilValue(vikingAbilityUsedInRoundAtom)
    const globalDisplayTime = useRecoilValue(gameTimerAtom)
    const user = useRecoilValue(authAtom) as IAuthData

    const getThisVikingAbilities = useMemo(() => {
        return question.participants.find(e => e.playerId == user.id)?.gameCharacter?.characterAbilities.vikingCharacterAbilitiesResponse
    }, [question, user])

    const areAllFortifiesUsed = useMemo(() => {
        if (!getThisVikingAbilities) return true;

        return getThisVikingAbilities?.fortifyCapitalUseCount >= getThisVikingAbilities?.fortifyCapitalMaxUseCount
    }, [getThisVikingAbilities])


    useEffect(() => {
        const thisUserParticipant = question.participants.find(e => e.playerId == user.id)

        if (thisUserParticipant?.gameCharacter?.characterAbilities.characterType != CharacterType.VIKING) return


        const currentRound =
            gameInstance?.rounds.find(e => e.gameRoundNumber == gameInstance.gameRoundNumber)

        // Visible only on capital rounds
        if (!currentRound || !currentRound.pvpRound || !currentRound.pvpRound.attackedTerritory?.isCapital)
            return

        // Without using the viking ability the max capital rounds would be 1
        // Therefore, we can assume that if there is more than 1, then this person used it in this round

        // Wouldn't work because we receive an updated game instance after the round is complete
        if (currentRound.pvpRound.capitalRounds.length > 1)
            return

        setShowVikingButton(true)
    }, [question, user])


    // If the viking ability was used this round do not allow any more activations for this round
    useEffect(() => {
        if (!vikingAbilityUsedInRoundId)
            return

        const currentRound =
            gameInstance?.rounds.find(e => e.gameRoundNumber == gameInstance.gameRoundNumber)

        if (currentRound?.id != vikingAbilityUsedInRoundId)
            return

        setVikingAbilityUsed(true)
    }, [vikingAbilityUsedInRoundId])

    if (!showVikingButton)
        return null


    return (
        <Pressable opacity={invisible ? 0 : 100} disabled={invisible || areAllFortifiesUsed || vikingAbilityUsed} onPress={() => {
            VikingUseAbility(globalDisplayTime)
            setVikingAbilityUsed(true)
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
                                Viking
                            </Text>
                            <Text selectable={false}>
                                {getThisVikingAbilities?.fortifyCapitalUseCount} / {getThisVikingAbilities?.fortifyCapitalMaxUseCount}
                            </Text>
                        </Center>
                    </Box>
                )
            }}
        </Pressable>
    )
}