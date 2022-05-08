import { Box, Center, HStack, Icon, Text } from "native-base";
import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import MCQuestionTimer from "./QuestionScreens/MCQuestionTimer";
/* SVGR has dropped some elements not supported by react-native-svg: title */


export function CapitalRoundTimer({ question }) {
    return (
        <>
            {/* Timer */}
            <HStack mb={5} justifyContent={"space-between"} >

                {/* 
                    This copies the right sidebar and hides it,
                    Centers timer perfectly
                */}

                <HStack style={{
                    opacity: 0
                }}>
                    <Center>

                        <Box p={1} backgroundColor={"cyan.800"} borderRadius={10}>
                            <Text fontSize={{ sm: "md", md: "lg", lg: "xl" }} p={1} px={3} fontWeight="bold" color="#fff" >Capital</Text>
                        </Box>
                    </Center>
                    {Array(question.capitalRoundsRemaining).fill(0).map((_, i) => <TowerSvg key={`upper_${i}`} />)}
                </HStack>

                <MCQuestionTimer key="gameTimer" />

                <HStack>
                    <Center>

                        <Box p={1} backgroundColor={"cyan.800"} borderRadius={10}>
                            <Text fontSize={{ sm: "md", md: "lg", lg: "xl" }} p={1} px={3} fontWeight="bold" color="#fff" >Capital</Text>
                        </Box>
                    </Center>
                    {Array(question.capitalRoundsRemaining).fill(0).map((_, i) => <TowerSvg key={`under_${i}`} />)}
                </HStack>
            </HStack>
        </>
    )
}

export function TowerSvg() {
    return (
        <Icon
            size="4xl"
            viewBox="0 0 512.002 512.002"
        >
            <Path strokeWidth={3} stroke={"#000"} fill="#fff" d="m414.431 488.2-14.497-373.03H112.07L97.573 488.2a22.91 22.91 0 0 0 22.894 23.801h67.928v-155.12c0-37.278 30.328-67.606 67.607-67.606 37.279 0 67.607 30.328 67.607 67.606v155.121h67.928a22.92 22.92 0 0 0 16.513-7.029 22.902 22.902 0 0 0 6.381-16.773zM404.98 0c-12.653 0-22.911 10.258-22.911 22.911v28.277H278.912V22.911C278.912 10.258 268.654 0 256.001 0S233.09 10.258 233.09 22.911v28.277H129.933V22.911C129.933 10.258 119.675 0 107.022 0S84.111 10.258 84.111 22.911v51.188c0 10.373 6.899 19.126 16.355 21.947 2.079.62 4.277.964 6.556.964H404.98c2.28 0 4.478-.344 6.556-.964 9.456-2.821 16.355-11.573 16.355-21.947V22.911C427.891 10.258 417.633 0 404.98 0z" />
        </Icon>
    )

}

export function LastRoundIndicator() {
    return (

        <>
            {/* Timer */}
            <HStack mb={5} justifyContent={"space-between"} >

                {/* 
                This copies the right sidebar and hides it,
                Centers timer perfectly
            */}

                <HStack style={{
                    opacity: 0
                }}>
                    <Center>
                        <Box p={1} backgroundColor={"cyan.800"} borderRadius={10}>
                            <Text fontSize={{ sm: "md", md: "lg", lg: "xl" }} p={1} px={3} fontWeight="bold" color="#fff" >Final determinant round</Text>
                        </Box>
                    </Center>
                </HStack>

                <MCQuestionTimer key="gameTimer" />

                <HStack>
                    <Center>

                        <Box p={1} backgroundColor={"cyan.800"} borderRadius={10}>
                            <Text fontSize={{ sm: "md", md: "lg", lg: "xl" }} p={1} px={3} fontWeight="bold" color="#fff" >Final determinant round</Text>
                        </Box>
                    </Center>
                </HStack>
            </HStack>
        </>
    )

}