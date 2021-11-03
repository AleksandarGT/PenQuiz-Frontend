export function GetAvatarColor(avatarName) {
    return ReturnColor(avatarName)
}


export function GetParticipantColor(gameInstance, playerId) {
    let particip = gameInstance.participants.find(x => x.playerId == playerId)

    return ReturnColor(particip?.avatarName);
}

function ReturnColor(avatarName) {
    switch (avatarName) {
        case "penguinAvatar":
            return "#5074FF"
        case "penguinAvatar2":
            return "#8350FF"
        case "penguinAvatar3":
            return "#FF5074"
    }
}


export const gameInstanceMock = {
    "id": 36,
    "resultId": 0,
    "questionTimerSeconds": 30,
    "startTime": "2021-11-03T16:08:12.1610715+01:00",
    "endTime": null,
    "mapid": 1,
    "participantsId": 0,
    "gameCreatorId": 3,
    "gameState": 1,
    "invitationLink": "8240",
    "gameRoundNumber": 1,
    "map": null,
    "objectTerritory": [
        {
            "id": 181,
            "mapTerritoryId": 1,
            "gameInstanceId": 36,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 1,
                "territoryName": "Vibri",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 182,
            "mapTerritoryId": 2,
            "gameInstanceId": 36,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 2,
                "territoryName": "Ranku",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 183,
            "mapTerritoryId": 3,
            "gameInstanceId": 36,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 3,
                "territoryName": "Dager",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 184,
            "mapTerritoryId": 4,
            "gameInstanceId": 36,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 4,
                "territoryName": "Ramac",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 185,
            "mapTerritoryId": 5,
            "gameInstanceId": 36,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 5,
                "territoryName": "Napana",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 186,
            "mapTerritoryId": 6,
            "gameInstanceId": 36,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 6,
                "territoryName": "Tustra",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 187,
            "mapTerritoryId": 7,
            "gameInstanceId": 36,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 7,
                "territoryName": "Sopore",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 188,
            "mapTerritoryId": 8,
            "gameInstanceId": 36,
            "isCapital": true,
            "territoryScore": 0,
            "takenBy": 3,
            "attackedBy": null,
            "mapTerritory": {
                "id": 8,
                "territoryName": "Caydo",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 189,
            "mapTerritoryId": 9,
            "gameInstanceId": 36,
            "isCapital": true,
            "territoryScore": 0,
            "takenBy": 2,
            "attackedBy": null,
            "mapTerritory": {
                "id": 9,
                "territoryName": "Rilanor",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 190,
            "mapTerritoryId": 10,
            "gameInstanceId": 36,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 10,
                "territoryName": "Lisu",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 191,
            "mapTerritoryId": 11,
            "gameInstanceId": 36,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 11,
                "territoryName": "Renyt",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 192,
            "mapTerritoryId": 12,
            "gameInstanceId": 36,
            "isCapital": true,
            "territoryScore": 0,
            "takenBy": 1,
            "attackedBy": null,
            "mapTerritory": {
                "id": 12,
                "territoryName": "Kide",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 193,
            "mapTerritoryId": 13,
            "gameInstanceId": 36,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 13,
                "territoryName": "Laly",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 194,
            "mapTerritoryId": 14,
            "gameInstanceId": 36,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 14,
                "territoryName": "Caba",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 195,
            "mapTerritoryId": 15,
            "gameInstanceId": 36,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 15,
                "territoryName": "Sona",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 196,
            "mapTerritoryId": 16,
            "gameInstanceId": 36,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 16,
                "territoryName": "Ronetia",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 197,
            "mapTerritoryId": 17,
            "gameInstanceId": 36,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 17,
                "territoryName": "Prusnia",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 198,
            "mapTerritoryId": 18,
            "gameInstanceId": 36,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 18,
                "territoryName": "Wistan",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 199,
            "mapTerritoryId": 19,
            "gameInstanceId": 36,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 19,
                "territoryName": "Rospa",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 200,
            "mapTerritoryId": 20,
            "gameInstanceId": 36,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 20,
                "territoryName": "Bavi",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        }
    ],
    "participants": [
        {
            "id": 54,
            "avatarName": "penguinAvatar3",
            "playerId": 3,
            "gameId": 36,
            "isBot": true,
            "score": 0,
            "player": {
                "id": 3,
                "username": "Boosted Penguin",
                "isInGame": false,
                "externalId": 3,
                "participants": []
            }
        },
        {
            "id": 55,
            "avatarName": "penguinAvatar",
            "playerId": 1,
            "gameId": 36,
            "isBot": false,
            "score": 0,
            "player": {
                "id": 1,
                "username": "Aleksandar Todorov",
                "isInGame": false,
                "externalId": 1,
                "participants": []
            }
        },
        {
            "id": 56,
            "avatarName": "penguinAvatar2",
            "playerId": 2,
            "gameId": 36,
            "isBot": false,
            "score": 0,
            "player": {
                "id": 2,
                "username": "Alex Todorov",
                "isInGame": false,
                "externalId": 2,
                "participants": []
            }
        }
    ],
    "rounds": [
        {
            "id": 154,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 1,
            "attackerId": 2,
            "defenderId": null,
            "gameInstanceId": 36,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 155,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 2,
            "attackerId": 3,
            "defenderId": null,
            "gameInstanceId": 36,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 156,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 3,
            "attackerId": 1,
            "defenderId": null,
            "gameInstanceId": 36,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 157,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 4,
            "attackerId": 3,
            "defenderId": null,
            "gameInstanceId": 36,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 158,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 5,
            "attackerId": 1,
            "defenderId": null,
            "gameInstanceId": 36,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 159,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 6,
            "attackerId": 2,
            "defenderId": null,
            "gameInstanceId": 36,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 160,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 7,
            "attackerId": 1,
            "defenderId": null,
            "gameInstanceId": 36,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 161,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 8,
            "attackerId": 3,
            "defenderId": null,
            "gameInstanceId": 36,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 162,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 9,
            "attackerId": 2,
            "defenderId": null,
            "gameInstanceId": 36,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 163,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 10,
            "attackerId": 3,
            "defenderId": null,
            "gameInstanceId": 36,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 164,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 11,
            "attackerId": 1,
            "defenderId": null,
            "gameInstanceId": 36,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 165,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 12,
            "attackerId": 2,
            "defenderId": null,
            "gameInstanceId": 36,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 166,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 13,
            "attackerId": 2,
            "defenderId": null,
            "gameInstanceId": 36,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 167,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 14,
            "attackerId": 3,
            "defenderId": null,
            "gameInstanceId": 36,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 168,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 15,
            "attackerId": 1,
            "defenderId": null,
            "gameInstanceId": 36,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 169,
            "roundStage": 0,
            "isLastUntakenTerritories": true,
            "gameRoundNumber": 16,
            "attackerId": null,
            "defenderId": null,
            "gameInstanceId": 36,
            "description": "Number question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 170,
            "roundStage": 0,
            "isLastUntakenTerritories": true,
            "gameRoundNumber": 17,
            "attackerId": null,
            "defenderId": null,
            "gameInstanceId": 36,
            "description": "Number question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        }
    ]
}