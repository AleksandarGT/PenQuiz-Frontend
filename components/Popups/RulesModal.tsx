import React from 'react'
import { VStack, Text, HStack, Modal, useBreakpointValue, View } from 'native-base'

interface RulesModalParams {
    setShowRulesModal: (value: boolean) => void,
    showRulesModal: boolean;
}

export default function RulesModal({ showRulesModal, setShowRulesModal }: RulesModalParams) {
    const fullWidth: boolean = useBreakpointValue({
        base: true,
        lg: false,
    })

    function RenderContent({ maxW = "40%" }) {
        return (
            <>
                <VStack textAlign={"left"} style={{ maxWidth: maxW }}>
                    <Text color="#fff" fontSize={{ base: 40, lg: 50 }} style={{ fontFamily: 'Before-Collapse', }}>
                        Game Rules
                    </Text>
                    <Text>
                        PenQuiz is a round-based PvP trivia game
                        revolved around capturing the territories
                        of the continent of Antarctica.
                    </Text>
                    <Text fontWeight="bold" fontSize={{ base: "lg", lg: "3xl" }}>
                        Start of game
                    </Text>
                    <Text >
                        Each player starts of with a single random territory on
                        the map which is their capital. Initial stage of the game
                        requires the players to attack territories next to
                        their capital. If they answer correctly they gain the
                        territory and their score increases.
                    </Text>
                    <Text fontWeight="bold" fontSize={{ base: "lg", lg: "3xl" }}>
                        Blitz stage
                    </Text>
                    <Text >
                        Second stage of the game involves blitz questions
                        depending on the amount of left untaken territories
                        on the map. Whichever players answer is closest
                        the correct one gains a random territory on the map.
                    </Text>
                </VStack>

                <VStack textAlign={"left"} style={{ maxWidth: maxW }}>
                    <Text fontWeight="bold" fontSize={{ base: "lg", lg: "3xl" }}>
                        PvP stage
                    </Text>
                    <Text>
                        Last stage of the game consists of player attacking
                        other players territories. If the attacker wins they
                        gain the territory, if the defender wins they keep the
                        territory and if they both answer correctly they
                        compete in an additional blitz question to determine
                        the winner.
                    </Text>
                    <Text fontWeight="bold" fontSize={{ base: "lg", lg: "3xl" }}>
                        PvP stage capital
                    </Text>
                    <Text >
                        If a player attacks someone elses capital
                        and wins 2 questions consequentially,
                        they gain all the defenders territories and
                        the defender loses the game.
                    </Text>
                    <Text fontWeight="bold" fontSize={{ base: "lg", lg: "3xl" }}>
                        Winner
                    </Text>
                    <Text>
                        In the end of the pvp stage of the game,
                        whichever player has the highest score
                        wins the match.
                    </Text>
                </VStack>
            </>
        )
    }

    return (
        <>
            <Modal size="full" p={8} isOpen={showRulesModal} onClose={() => setShowRulesModal(false)}>
                <Modal.Content borderRadius={25}>
                    <Modal.Body p={8} bg="#0395BA">
                        <Modal.CloseButton />

                        {fullWidth ?
                            <RenderContent maxW='100%' /> :
                            <HStack style={{ justifyContent: "space-around", alignItems: "flex-end" }}>
                                <RenderContent />
                            </HStack>
                        }


                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </>
    )
}