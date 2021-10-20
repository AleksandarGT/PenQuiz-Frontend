import React, { useState } from "react"
import Svg, { Defs, Path, G, Text } from "react-native-svg"
import { View, Button, StyleSheet, useWindowDimensions, Platform } from 'react-native';
/* SVGR has dropped some elements not supported by react-native-svg: style */
import { useHeaderHeight } from '@react-navigation/elements';
import { Center } from "native-base";

export default function AntarcticaMapSvg({ onTerritoryClick }) {
  const [selected, setSelected] = useState([])

  const antarcticaBorders = require('../assets/Antarctica.json')
  const antarcticaTerritorySVG = require('../assets/AntarcticaTerritory.json')

  // Original map dimensions
  const originalWidth = 694.41;
  const originalHeight = 587.05;

  // Calculated max height without header
  const windowHeight = useWindowDimensions().height

  const calculatedWidth = originalWidth + (0 * originalWidth)
  const calculatedHeight = originalHeight + (0 * originalHeight)
  const aspectRatio = calculatedWidth / calculatedHeight;

  function loadSVGs() {
    var jsx = [];
    Object.keys(antarcticaTerritorySVG).forEach((k) => {

      jsx.push(
        <G key={k}>
          <Path
            onClick={Platform.OS === 'web' ? () => onTerritoryClick(k) : null}
            onPress={Platform.OS !== 'web' ? () => onTerritoryClick(k) : null}
            id={k}
            fill={selected.includes(k) ? "orange" : "#D7FFFE"}
            stroke="#000"
            strokeMiterlimit={10}
            className="prefix__cls-1"
            d={antarcticaTerritorySVG[k]}
          />
        </G>

      )
    })

    return jsx;
  }

  return (
    <View style={{ height: windowHeight - 160, aspectRatio }}>

      <Svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${calculatedWidth} ${calculatedHeight}`}>
        <Defs></Defs>
        <G id="prefix__Layer_2" data-name="Layer 2">
          <G id="prefix__svg130">
            {loadSVGs()}
          </G>
        </G>
      </Svg>
    </View>
  )
}