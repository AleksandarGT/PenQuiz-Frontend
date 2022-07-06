import { Box, Center, Divider, HStack, Image, Pressable, Text, Tooltip, View } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { Platform } from "react-native";
import { useRecoilValue } from "recoil";
import { WizardUseMultipleChoiceHint } from "../../../hooks";
import { gameTimerAtom, authAtom, gameInstanceAtom } from "../../../state";
import { IAuthData } from "../../../types/authTypes";
import { CharacterType } from "../../../types/gameCharacterTypes";
import { QuestionClientResponse } from "../../../types/gameResponseTypes";

export default function WizardActionComponent({ question, invisible }
    : { question: QuestionClientResponse, invisible?: boolean }) {

    const [showWizardButton, setShowWizardButton] = useState<boolean>(false);
    const [wizardAbilityUsed, setWizardAbilityUsed] = useState<boolean>(false);

    const globalDisplayTime = useRecoilValue(gameTimerAtom)
    const user = useRecoilValue(authAtom) as IAuthData
    const gameInstance = useRecoilValue(gameInstanceAtom)

    const getThisUserWizardAbilities = useMemo(() => {
        return question.participants.find(e => e.playerId == user.id)?.gameCharacter?.characterAbilities.wizardCharacterAbilitiesResponse
    }, [question, user])

    const areAllHintsUsed = useMemo(() => {
        if (!getThisUserWizardAbilities) return true;

        return getThisUserWizardAbilities?.mcQuestionHintUseCount >= getThisUserWizardAbilities?.mcQuestionHintMaxUseCount
    }, [getThisUserWizardAbilities])


    useEffect(() => {
        const thisUserParticipant = question.participants.find(e => e.playerId == user.id)

        if (thisUserParticipant?.gameCharacter?.characterAbilities.characterType != CharacterType.WIZARD) return

        // Visible only on multiple rounds
        if (question.type != "multiple")
            return

        setShowWizardButton(true)
        setWizardAbilityUsed(false)
    }, [question.question, user])


    // If the wizard ability was used this round do not allow any more activations for this round
    useEffect(() => {
        if (!getThisUserWizardAbilities || !getThisUserWizardAbilities.abilityUsedInRounds)
            return

        const currentRound =
            gameInstance?.rounds.find(e => e.gameRoundNumber == gameInstance.gameRoundNumber)

        if (!getThisUserWizardAbilities.abilityUsedInRounds.some(e => e == currentRound?.id))
            return

        setWizardAbilityUsed(true)
    }, [getThisUserWizardAbilities?.abilityUsedInRounds])


    if (!showWizardButton)
        return null


    return (
        <View opacity={invisible ? 0 : 100} >
            <HStack mt={6}>
                <Center>
                    <Pressable disabled={invisible || areAllHintsUsed || wizardAbilityUsed} onPress={() => {
                        WizardUseMultipleChoiceHint(globalDisplayTime)
                        setWizardAbilityUsed(true)
                    }}>
                        {({ isHovered, isFocused, isPressed }) => {
                            return (
                                <Box justifyContent={"center"} style={{
                                    aspectRatio: 1 / 1,
                                }} px={1.5} shadow={3} bg={
                                    isPressed ? "#6654D6" : isHovered ? "#5A48C6" : "#3E2E9E"
                                } borderRadius={25}>
                                    <Center >
                                        <HStack alignItems={"center"}>

                                            <Text fontWeight={"bold"} color={"#C5DFFF"} fontSize={"lg"} selectable={false} >
                                                Help!
                                            </Text>
                                            <Image
                                                source={Platform.OS == "web" ? require("../../../assets/characterAssets/wizardWand.svg") : require("../../../assets/characterAssets/wizardWand.png")}
                                                resizeMode="contain"
                                                size="xs"
                                                alt="wz"
                                            />
                                        </HStack>
                                        <Divider my={1} backgroundColor={"#C5DFFF"} />
                                        <Text fontWeight={"bold"} fontSize={"md"} color={"#C5DFFF"} selectable={false}>
                                            {getThisUserWizardAbilities?.mcQuestionHintUseCount} / {getThisUserWizardAbilities?.mcQuestionHintMaxUseCount} uses
                                        </Text>
                                    </Center>
                                </Box>
                            )
                        }}
                    </Pressable>
                </Center>

                {Platform.OS == "web" && <Tooltip label="Removes 2 wrong answers" placement="right">
                    <Image
                        source={require("../../../assets/characterAssets/hintPopup.svg")}
                        resizeMode="contain"
                        size="xs"
                    />
                </Tooltip>}
            </HStack>
        </View>
    )
}