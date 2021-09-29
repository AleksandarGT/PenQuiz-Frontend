import React, { useState } from "react"
import Svg, { SvgProps, Defs, ClipPath, Path, G } from "react-native-svg"
import { View, Text, Button, StyleSheet, Dimensions, Platform } from 'react-native';
/* SVGR has dropped some elements not supported by react-native-svg: style */
import { useHeaderHeight } from '@react-navigation/elements';

export default function SvgComponent() {
  const [paths, setPaths] = useState();
  const [selected, setSelected] = useState([])

  const antarcticaBorders = require('../assets/Antarctica.json')
  const antarcticaTerritorySVG = require('../assets/AntarcticaTerritory.json')

  function populatePaths() {
    console.log("Works");
  }

  // Original map dimensions
  const originalWidth = 694.41;
  const originalHeight = 587.05;

  // Calculated max height without header
  const windowHeight = Dimensions.get("window").height - useHeaderHeight();

  const calculatedWidth = originalWidth + (0 * originalWidth)
  const calculatedHeight = originalHeight + (0 * originalHeight)
  const aspectRatio = calculatedWidth / calculatedHeight;


  function onTerritoryClick(e) {
    if (selected.filter(x => x == e.target.id) == 0) {
      setSelected([...selected, e.target.id]) //simple value
      e.target.setAttribute('fill', 'orange')
    }
    else {
      setSelected(selected.filter((id) => id !== e.target.id))
      e.target.setAttribute('fill', '#D7FFFE')
    }
  }

  function loadSVGs() {
    var jsx = [];
    Object.keys(antarcticaTerritorySVG).forEach((k) => {

      jsx.push(
        <Path
        key={k}
        onClick={(e) => onTerritoryClick(e)}
        id={`prefix_${k}`}
        fill="#D7FFFE"
        stroke="#000"
        strokeMiterlimit={10}
        className="prefix__cls-1"
        d={antarcticaTerritorySVG[k]}
      />
      )
    })

    return jsx;
  }

  function characterBoxes() {
    return (
      <View style={{ flex: 0.1, paddingTop: 50, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
      <View style={[styles.characterBox, { backgroundColor: "green" }]}>
        <Text style={[styles.characterText]}>Person 1</Text>
      </View>
      <View style={[styles.characterBox, { backgroundColor: "blue" }]}>
        <Text style={[styles.characterText]}>Person 2</Text>
      </View>
      <View style={[styles.characterBox, { backgroundColor: "red" }]}>
        <Text style={[styles.characterText]}>Person 3</Text>
      </View>
    </View>
    )
  }

  return (
    <View style={{ height: windowHeight, aspectRatio }}>
      <View style={{ flex: 0.8 }}>
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${calculatedWidth} ${calculatedHeight}`}>
          <Defs></Defs>
          <G id="prefix__Layer_2" data-name="Layer 2">
            <G id="prefix__svg130">
              {loadSVGs()}
            </G>
          </G>
        </Svg>
      </View>
      {characterBoxes()}
      {/* <View style={[{backgroundColor: "blue", width: '100%', height: '100%'}]} /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    backgroundColor: "pink"
  },
  characterBox: {
    justifyContent: "center",
    borderRadius: 50,
    height: "100%",
    width: "25%",
    backgroundColor: "green"
  },
  characterText: { textAlign: "center", justifyContent: "center", fontSize: 30, color: "white" }
})