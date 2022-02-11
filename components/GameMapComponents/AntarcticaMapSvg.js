import React, { useState } from "react"
import Svg, { Defs, Path, G, Text, TSpan } from "react-native-svg"
import { View, Button, StyleSheet, useWindowDimensions, Platform } from 'react-native';
/* SVGR has dropped some elements not supported by react-native-svg: style */
import { useHeaderHeight } from '@react-navigation/elements';
import { Center } from "native-base";
import { useRecoilValue } from 'recoil'
import { authAtom, gameInstanceAtom } from '../../state'
import { GetParticipantColor, gameInstanceMock, playerAttackPossibilitiesMock, GetAttackTerritoryPossibilityColor } from './CommonGameFunc'
import DefaultAlert from "../Popups/DefaultAlert";

export default function AntarcticaMapSvg({ gameMapException, onTerritoryClick, gameInstance = gameInstanceMock, playerAttackPossibilities = playerAttackPossibilitiesMock }) {
  const antarcticaBorders = require('../../assets/Antarctica.json')
  const antarcticaSVGElements = require('../../assets/AntarcticaSvgElements.json')
  // Original map dimensions
  const originalWidth = 694.3;
  const originalHeight = 587.02;
  // Calculated max height without header
  const windowHeight = useWindowDimensions().height
  const currentUser = useRecoilValue(authAtom)

  const aspectRatio = originalWidth / originalHeight;

  function SetTerritoryColor(territoryName) {
    if(playerAttackPossibilities.attackerId == currentUser?.id && playerAttackPossibilities?.availableAttackTerritories?.find(x => x == territoryName)) {
      return GetAttackTerritoryPossibilityColor(gameInstance, playerAttackPossibilities.attackerId)
    }
    return GetParticipantColor(gameInstance, gameInstance.objectTerritory.find(x => x.mapTerritory.territoryName == territoryName).takenBy) ?? "#d7fffe"
  }

  function SVGTerritories() {
    var jsx = []
    Object.keys(antarcticaSVGElements).forEach((k) => {
      jsx.push(
        <G key={k} onClick={() => onTerritoryClick(k)} onPress={() => onTerritoryClick(k)}>
          {/* Territory path */}
          <Path
            d={antarcticaSVGElements[k].TerritoryPath}
            fill={SetTerritoryColor(k)}
            stroke="#000"
            strokeMiterlimit={10}
            fillRule="evenodd"
          />



          {/* Conditionally rendering the capital  */}
          {gameInstance.objectTerritory.find(x => x.mapTerritory.territoryName == k).isCapital ? (
            <>
              {/* Line between score and igloo */}
              <Path
                fill="none"
                stroke="#51565f"
                strokeMiterlimit={10}
                d={antarcticaSVGElements[k].IglooScoreLine}
              />

              {/* Igloo background color */}
              <Path
                d={antarcticaSVGElements[k].IglooBackgroundColor}
                fill="#e4f2de"
              />

              {/* Igloo door */}
              <Path
                d={antarcticaSVGElements[k].IglooDoor}
                fill="#ae938d"
              />

              {/* Flag color */}
              <Path fill="#50dd8e" d={antarcticaSVGElements[k].FlagColor} />

              {/* Igloo texture */}
              <Path
                d={antarcticaSVGElements[k].IglooTexture}
                fill="#51565f"
              />
            </>
          ) : null}



          {gameInstance.objectTerritory.find(x => x.mapTerritory.territoryName == k).attackedBy ?
            <>
              {/* Attack Icon */}
              <Path
                d={antarcticaSVGElements[k].AttackIcon}
              />
              {/* Attack Icon Color*/}
              <Path fill={GetParticipantColor(gameInstance, gameInstance.objectTerritory.find(x => x.mapTerritory.territoryName == k).attackedBy)} d={antarcticaSVGElements[k].AttackIconFill} />
            </>
            : null}


          {/* Score */}
          <Text
            transform={antarcticaSVGElements[k].ScorePosition}
            fontSize={25}
            pointerEvents="none"
            fill="#fff"
            stroke="#000"
            strokeMiterlimit={10}
            strokeWidth={1}
            fontFamily="Arial-BoldMT,Arial"
            fontWeight={700}
          >
            {gameInstance.objectTerritory.find(x => x.mapTerritory.territoryName == k)?.territoryScore ?? 0}
          </Text>
        </G>
      )
    })
    return jsx
  }

  return (
    <View style={{ height: windowHeight - 160, aspectRatio, flex: 0.8 }}>
      {gameMapException ?
        <DefaultAlert message={gameMapException} />
        :
        null
      }
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 694.3 587.02"
      >
        <G data-name="Layer 2">
          <G data-name="Layer 1">
            {SVGTerritories()}
          </G>
        </G>
      </Svg>
    </View>
  )
}