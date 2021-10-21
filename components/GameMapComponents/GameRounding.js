import { Center, Container, HStack, Text, Image, VStack, Box, ZStack } from "native-base";
import React, { useState } from "react"
import { View, StyleSheet } from 'react-native';

export default function GameRounding() {
    return (
        <>
            <View style={{
                flex: 1,
                backgroundColor: "#BFD2D4",
                borderRadius: 10,
                justifyContent: "center"
            }}>
                <HStack style={{ flex: 1 }}>


                    {[...Array(18)].map((x, index) =>
                        <View key={index} style={[index == 12 ? {
                            // This probably won't work on mobile, fix there
                            outlineColor: 'rgba(6, 28, 83, 0.8)',
                            outlineStyle: "solid",
                            outlineWidth: 4,
                            elevation: 5,
                        } : null, {
                            flex: 1,
                            backgroundColor: index % 3 == 1 ? "#5074FF" : index % 3 == 2 ? "#FF5074" : "#8350FF",
                            margin: 8,
                            borderRadius: 5,
                            marginRight: index % 3 == 2 ? 10 : 0,
                            marginVertical: 30,

                        }]} />
                    )}

                </HStack>

            </View>
        </>
    )
}