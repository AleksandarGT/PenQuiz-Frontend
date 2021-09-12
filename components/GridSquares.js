import { StyleSheet, ScrollView, TouchableOpacity, Text, View, Button, Alert } from 'react-native';
import React, { Platform, useEffect, useState } from 'react';

export default function GridSquares() {
    const [defaultRows] = useState(6)
    const [defaultColumns] = useState(9)
    const [disableMode, setDisableMode] = useState(false)

    const [squares, setSquares] = useState(() => {
        var s = [];
        let y = 0;
        let x = 0;
        let id = 0;

        [...Array(defaultColumns * defaultRows)].map(z => {
            s.push({
                id: id++,
                x: x++,
                y: y,
                isTaken: false,
                isDisabled: false
            })
            if(x && x % defaultColumns == 0) {
                x = 0
                y++
            }
        })
        return s
    })

    function onSquarePress(square) {

        // Handle disabled mode marking an item as disabled to prevent it from being clicked
        if(disableMode) {
            if(square.isTaken) {
                Platform?.OS ?? alert("Can't disable a taken block. Reset the builder first.")
                
                return
            }
            return setSquares(squares.map(item => item === square ? {...item, isDisabled : !item.isDisabled} : item))
        }

        // Is the first item you choose
        const takenItems = squares.filter((item) => item.isTaken)
        if(takenItems.length == 0) {
            return setSquares(squares.map(item => item === square ? {...item, isTaken : true} : item))
        }

        // Check horizontal axis if you can take this item
        // the SQUARE x
        // Check if your items has any item on the same x
        // If it has check if your item is next to the selected item
        console.log(`$justclicked: ${square.x} || yourfirst: ${takenItems[0].x}`)
        
        const sameHorizontalAxis = takenItems.filter((item) => item.y == square.y && (item.x + 1 == square.x || item.x - 1 == square.x))
        if(sameHorizontalAxis.length > 0) {
            return setSquares(squares.map(item => item === square ? {...item, isTaken : true} : item))
        }


        const sameVerticalAxis = takenItems.filter((item) => item.x == square.x && (item.y + 1 == square.y || item.y - 1 == square.y))

        if(sameVerticalAxis.length > 0) {
            return setSquares(squares.map(item => item === square ? {...item, isTaken : true} : item))
        }
    }

    const squaresView = (squares) => {
        // Add view from 0-7 X and close
        // Add another view from 0-7 X and close...
        var g = []
        var sm = 3123;
        var last = 0;
        while(last < defaultRows) {
            g.push(<View key={sm++} style={styles.container}>
                {squares.filter((element) => {
                return element.y == last
            }).map((element) => {
                return  <ClickableCircle key={element.id} square={element} disableMode={disableMode} onPress={onSquarePress} />
            })}


            </View>)
            last++
        }
        return g
    }

    return (
        <View style={styles.main_view}>
            <View style={styles.super_container}>

                {/* {squares.map(e => <ClickableCircle key={e.id.toString()} square={e} onPress={onSquarePress} />)} */}
                {squaresView(squares)}

            </View>
            <View style={[styles.fixToText, {marginBottom: 50}]}>

                <CustomButton onpress={() => setDisableMode(!disableMode)} bdcolor={"black"} text={`Toggle DISABLE mode ${!disableMode ? "on" : "off"}`} />
                <CustomButton onpress={() => setSquares(squares.map(item => {
                        item.isTaken = false
                        return item
                    }))} bdcolor={"purple"} text={`Reset all taken blocks`} />
                <CustomButton onpress={() => console.log(squares.map(x => {
                        x.isTaken = false
                        return x
                    }))} bdcolor={"green"} text={`Export map (console)`} />
            </View>
        </View>
    )
}

const CustomButton = ({text, bdcolor, onpress}) => {
    return (
        <TouchableOpacity
        style={{backgroundColor: bdcolor, padding: 20}}
        onPress={onpress}
        >
            <Text style={{color: "white"}}>{text}</Text>
        </TouchableOpacity>
    )
}


const ClickableCircle = ({square, onPress, disableMode}) => {
    // const [isClicked, setIsClicked] = useState(false)
    const squareColor = () => {
        if(disableMode) {
            if(square.isTaken) return "blue"

            return square.isDisabled ? "black" : "yellow"
        }

        if(square.isDisabled) {
            return "black"
        }
        return !square.isTaken ? "yellow" : "blue"
    }

    return (
        <TouchableOpacity
        onPress={() => {
            onPress(square)
            // if(isClicked) return
            // setIsClicked(true)
        }}
        disabled={disableMode ? false : square.isDisabled}
        style={[styles.box, {
            backgroundColor: squareColor()
         }]}
      >
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        backgroundColor: "pink"
    },
    super_container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: "center",
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-around',
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
})