import React from "react"
import Svg, { Path, G, Text } from "react-native-svg"
import { View, useWindowDimensions } from 'react-native';
/* SVGR has dropped some elements not supported by react-native-svg: style */
import { useRecoilValue } from 'recoil'
import { authAtom } from '../../state'
import { GetParticipantColor, GetNeutralTerritoryPossibilityColor, GetPvpTerritoryPossibilityColor, GetPvpTerritoryNonHighlightColor } from './CommonGameFunc'
import DefaultAlert from "../Popups/DefaultAlert";
import { AttackStage, GameInstanceResponse } from "../../types/gameInstanceTypes";
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
    console.log(currentUser?.id)
    if (playerAttackPossibilities && playerAttackPossibilities.attackerId == currentUser?.id) {

      // On pvp round, different territory color - depending on the attacker and defender color (blend)
      const currentRound = gameInstance.rounds.find(e => e.gameRoundNumber == gameInstance.gameRoundNumber)!


      // Trigger only if the current round requires attacking an enemy territory
      // Always going to be multiple pvp, even if it's a capital
      // First attack on capital is considered multiple pvp, not capital stage
      if (currentRound.attackStage == AttackStage.MULTIPLE_PVP) {

        // Only on pvp stage change territory attack possibilities
        // This is a pvp round, it definitely has an owner
        const territoryAvailableToAttackName = playerAttackPossibilities.availableAttackTerritories.some(e => e == territoryName)
        const ownTerritory = gameInstance.objectTerritory.some(e => e.takenBy == currentUser.id && e.mapTerritory?.territoryName == territoryName);

        const thisTerritoryTakenById = gameInstance.objectTerritory.find(e => e.mapTerritory?.territoryName == territoryName)?.takenBy!

        if (territoryAvailableToAttackName || ownTerritory)
          return GetParticipantColor(gameInstance, thisTerritoryTakenById);


        const avatarName = gameInstance.participants.find(e => e.playerId == thisTerritoryTakenById)!.avatarName

        const response = GetPvpTerritoryNonHighlightColor(avatarName)

        return response
      }

      if (playerAttackPossibilities?.availableAttackTerritories?.some(x => x == territoryName))
        return GetNeutralTerritoryPossibilityColor(gameInstance, playerAttackPossibilities.attackerId)
    }

    const takenBy = gameInstance.objectTerritory.find(x => x.mapTerritory?.territoryName == territoryName)?.takenBy

    if (takenBy)
      return GetParticipantColor(gameInstance, takenBy);

    return "#d7fffe"
  }

  function SVGTerritories() {
    const jsx: JSX.Element[] = []
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
          {gameInstance.objectTerritory.find(x => x.mapTerritory?.territoryName == k)?.isCapital ? (
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



          {gameInstance.objectTerritory.find(x => x.mapTerritory?.territoryName == k)?.attackedBy ?
            <>
              {/* Attack Icon */}
              <Path
                fill="black"
                d={antarcticaSVGElements[k].AttackIcon}
              />
              {/* Attack Icon Color*/}
              <Path fill={GetParticipantColor(gameInstance, gameInstance.objectTerritory.find(x => x.mapTerritory!.territoryName == k)!.attackedBy!)} d={antarcticaSVGElements[k].AttackIconFill} />
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
            {gameInstance.objectTerritory.find(x => x.mapTerritory!.territoryName == k)?.territoryScore ?? 0}
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