import React from 'react'
import { VStack, Text, Modal } from 'native-base'
import { Linking } from 'react-native';


interface AboutModelParams {
    showAboutModal: boolean,
    setShowAboutModal: (value: boolean) => void
}

export default function AboutModal({ showAboutModal, setShowAboutModal }: AboutModelParams) {
    function RenderContent({ maxW = "40%" }) {
        return (
            <>
                <VStack style={{ maxWidth: maxW }}>
                    <Text color="#fff" fontSize={{ base: 40, lg: 50 }} style={{ fontFamily: 'Before-Collapse', textAlign: "left" }}>
                        About  PenQuiz
                    </Text>
                    <Text>
                        PenQuiz is developed and maintained by Aleksandar Todorov
                        as an open-source project found on Github <Text style={{ color: "black" }} onPress={() => {
                            Linking.openURL("https://github.com/BoostedPenguin/ConQuiz-Backend")
                        }}>here</Text>.
                        {"\n"}
                        {"\n"}
                        For any questions or inqueries regarding the game,
                        please contact: legendsxchaos@gmail.com
                    </Text>
                </VStack>
            </>
        )
    }

    return (
        <>
            <Modal size="lg" p={8} isOpen={showAboutModal} onClose={() => setShowAboutModal(false)}>
                <Modal.Content borderRadius={25}>
                    <Modal.Body p={8} bg="#0395BA">
                        <Modal.CloseButton />

                        <RenderContent maxW='100%' /> :



                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </>
    )
}