import { Box, Center, Divider, HStack, Image, Pressable, Text, Tooltip, View } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { VikingUseAbility, WizardUseMultipleChoiceHint } from "../../../hooks";
import { gameTimerAtom, authAtom, gameInstanceAtom } from "../../../state";
import { IAuthData } from "../../../types/authTypes";
import { CharacterType } from "../../../types/gameCharacterTypes";
import { QuestionClientResponse } from "../../../types/gameResponseTypes";

export default function VikingActionComponent({ question, invisible }
    : { question: QuestionClientResponse, invisible?: boolean }) {

    const [showVikingButton, setShowVikingButton] = useState<boolean>(false);
    const [vikingAbilityUsed, setVikingAbilityUsed] = useState<boolean>(false);
    const gameInstance = useRecoilValue(gameInstanceAtom)

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

        // If you aren't the defender don't show button
        if (currentRound?.pvpRound.defenderId != user.id)
            return

        // Without using the viking ability the max capital rounds would be 1
        // Therefore, we can assume that if there is more than 1, then this person used it in this round
        if (currentRound.pvpRound.capitalRounds.length > 1)
            return

        setShowVikingButton(true)
    }, [question, user])


    // If the viking ability was used this round do not allow any more activations for this round
    useEffect(() => {
        if (!getThisVikingAbilities || !getThisVikingAbilities.abilityUsedInRounds)
            return

        const currentRound =
            gameInstance?.rounds.find(e => e.gameRoundNumber == gameInstance.gameRoundNumber)

        if (!getThisVikingAbilities.abilityUsedInRounds.some(e => e == currentRound?.id))
            return

        setVikingAbilityUsed(true)
    }, [getThisVikingAbilities?.abilityUsedInRounds])

    if (!showVikingButton)
        return null


    return (
        <View opacity={invisible ? 0 : 100} >
            <HStack mt={6}>
                <Center>
                    <Pressable disabled={invisible || areAllFortifiesUsed || vikingAbilityUsed} onPress={() => {
                        VikingUseAbility(globalDisplayTime)
                        setVikingAbilityUsed(true)
                    }}>
                        {({ isHovered, isFocused, isPressed }) => {
                            return (
                                <Box justifyContent={"center"} style={{
                                    aspectRatio: 1 / 1,
                                }} px={1.5} shadow={3} bg={
                                    isPressed ? "#3DAE15" : isHovered ? "#31930E" : "#216609"
                                } borderRadius={25}>
                                    <Center >
                                        <HStack alignItems={"center"}>

                                            <Text fontWeight={"bold"} color={"#C5DFFF"} fontSize={"lg"} selectable={false} >
                                                Help!
                                            </Text>
                                            <Image
                                                source={require("../../../assets/characterAssets/vikingAxe.svg")}
                                                alt="Alternate Text"
                                                resizeMode="contain"
                                                size="xs"
                                            />
                                        </HStack>
                                        <Divider my={1} backgroundColor={"#C5DFFF"} />
                                        <Text fontWeight={"bold"} fontSize={"md"} color={"#C5DFFF"} selectable={false}>
                                            {getThisVikingAbilities?.fortifyCapitalUseCount} / {getThisVikingAbilities?.fortifyCapitalMaxUseCount} uses
                                        </Text>
                                    </Center>
                                </Box>
                            )
                        }}
                    </Pressable>
                </Center>

                <Tooltip label="Adds an additional capital round" placement="right">
                    <Image
                        source={require("../../../assets/characterAssets/hintPopup.svg")}
                        alt="Alternate Text"
                        resizeMode="contain"
                        size="xs"
                    />
                </Tooltip>
            </HStack>
        </View>
    )
}