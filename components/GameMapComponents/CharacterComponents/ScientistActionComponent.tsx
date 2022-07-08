import { Box, Center, Divider, HStack, Image, Pressable, Text, Tooltip } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { Platform } from "react-native";
import { useRecoilValue } from "recoil";
import { ScientistUseAbility, WizardUseMultipleChoiceHint } from "../../../hooks";
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
        <>
            <HStack mt={6} opacity={invisible ? 0 : 100}>

                <Pressable disabled={invisible || areAllHintsUsed || scientistAbilityUsed} onPress={() => {
                    if (scientistAbilityUsed) return
                    if (globalDisplayTime <= 0) return

                    ScientistUseAbility(globalDisplayTime)
                    setScientistAbilityUsed(true)
                }}>
                    {({ isHovered, isFocused, isPressed }) => {
                        return (

                            <Box justifyContent={"center"} style={{
                                aspectRatio: 1 / 1,
                            }} px={1.5} shadow={3} bg={
                                isPressed ? "#1E609C" : isHovered ? "#165085" : "#083965"
                            } borderRadius={25}>
                                <Center >
                                    <HStack alignItems={"center"}>

                                        <Text fontWeight={"bold"} color={"#C5DFFF"} fontSize={"lg"} selectable={false} >
                                            Help!
                                        </Text>
                                        <Image
                                            source={Platform.OS == "web" ? require("../../../assets/characterAssets/scientistFlask.svg") : require("../../../assets/characterAssets/scientistFlask.png")}
                                            resizeMode="contain"
                                            size="xs"
                                            alt="sc"
                                        />
                                    </HStack>
                                    <Divider my={1} backgroundColor={"#C5DFFF"} />
                                    <Text fontWeight={"bold"} fontSize={"md"} color={"#C5DFFF"} selectable={false}>
                                        {getThisUserScientistAbilities?.numberQuestionHintUseCount} / {getThisUserScientistAbilities?.numberQuestionHintMaxUseCount} uses
                                    </Text>
                                </Center>
                            </Box>
                        )
                    }}
                </Pressable>
                {Platform.OS == "web" && <Tooltip label="Narrows down the correct answer" placement="right">
                    <Image
                        source={require("../../../assets/characterAssets/hintPopup.svg")}
                        resizeMode="contain"
                        size="xs"
                        alt="sc"
                    />
                </Tooltip>}
            </HStack>

        </>

    )
}