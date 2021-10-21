import { StyleSheet, ScrollView, TouchableOpacity, Text, View, Button } from 'react-native';
import React, { useState } from 'react';

export default function FlexibleSquares() {
    const [arrayCount, setArrayCount] = useState(1)


    return (
        <View style={styles.mainbox}>
            <View style={styles.super_container}>
                <View style={styles.container}>
                    {[...Array(arrayCount)].map(x =>
                    <ClickableCircle onPress={() => {setArrayCount(arrayCount + 1)}} style={[styles.box, {backgroundColor: "blue"}]} />
                    )}
                </View>

                <View style={styles.container}>
                    {[...Array(arrayCount)].map(x =>
                    <ClickableCircle onPress={() => {setArrayCount(arrayCount + 1)}} style={[styles.box, {backgroundColor: "blue"}]} />
                    )}
                </View>

                <View style={styles.container}>
                    {[...Array(arrayCount)].map(x =>
                    <ClickableCircle onPress={() => {setArrayCount(arrayCount + 1)}} style={[styles.box, {backgroundColor: "blue"}]} />
                    )}
                </View>
            </View>

            <Button
            onPress={() => {
                setArrayCount(1)
            }}
            title="Reset"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            />

        </View>
    )
}

const ClickableCircle = ({onPress}) => {
    const [isClicked, setIsClicked] = useState(false)
    return (
        <TouchableOpacity
        onPress={() => {
            if(isClicked) return
            onPress()
            setIsClicked(true)
        }}
        style={[styles.box, {backgroundColor: !isClicked ? "yellow" :  "blue"}]}
      >
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainbox: {
        flex: 1,
        backgroundColor: 'pink',
    },
    super_container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: "center",
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    box: {
        backgroundColor: "yellow",
        borderColor: "black",
        borderWidth: 2,
        width: 50,
        height: 50,
    },
});