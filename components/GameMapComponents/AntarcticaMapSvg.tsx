import React from "react"
import Svg, { Path, G, Text } from "react-native-svg"
import { View, useWindowDimensions } from 'react-native';
/* SVGR has dropped some elements not supported by react-native-svg: style */
import { useRecoilValue } from 'recoil'
import { authAtom } from '../../state'
import { GetParticipantColor, GetAttackTerritoryPossibilityColor } from './CommonGameFunc'
import DefaultAlert from "../Popups/DefaultAlert";
import { GameInstanceResponse } from "../../types/gameInstanceTypes";
import { IPlayerAttackPossibilities } from "../../types/gameResponseTypes";

interface AntarcticaMapSvgParams {
  onTerritoryClick: (territoryName: string) => void
  gameMapException: string,
  gameInstance: GameInstanceResponse,
  playerAttackPossibilities: IPlayerAttackPossibilities
}
export default function AntarcticaMapSvg({ gameMapException,
  onTerritoryClick,
  gameInstance,
  playerAttackPossibilities
}: AntarcticaMapSvgParams) {

  //const antarcticaBorders = require('../../assets/Antarctica.json')
  const antarcticaSVGElements = require('../../assets/AntarcticaSvgElements.json')
  // Original map dimensions
  const originalWidth = 694.3;
  const originalHeight = 587.02;
  // Calculated max height without header
  const windowHeight = useWindowDimensions().height
  const currentUser = useRecoilValue(authAtom)

  const aspectRatio = originalWidth / originalHeight;

  function SetTerritoryColor(territoryName: string) {
    if (playerAttackPossibilities && playerAttackPossibilities.attackerId == currentUser?.id && playerAttackPossibilities?.availableAttackTerritories?.find(x => x == territoryName)) {
      return GetAttackTerritoryPossibilityColor(gameInstance, playerAttackPossibilities.attackerId)
    }
    return GetParticipantColor(gameInstance, gameInstance.objectTerritory.find(x => x.mapTerritory.territoryName == territoryName).takenBy) ?? "#d7fffe"
  }

  function SVGTerritories() {
    var jsx = []
    Object.keys(antarcticaSVGElements).forEach((k) => {
      jsx.push(

        // @ts-ignore
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
                fill="black"
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