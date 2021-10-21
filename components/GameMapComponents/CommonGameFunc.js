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
    "id": 643,
    "resultId": 0,
    "questionTimerSeconds": 30,
    "startTime": "2021-10-22T00:00:07.587",
    "endTime": null,
    "mapid": 1,
    "participantsId": 0,
    "gameCreatorId": 1,
    "gameState": 1,
    "invitationLink": "0542",
    "gameRoundNumber": 1,
    "map": null,
    "objectTerritory": [
        {
            "id": 2196,
            "mapTerritoryId": 1,
            "gameInstanceId": 643,
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
            "id": 2193,
            "mapTerritoryId": 2,
            "gameInstanceId": 643,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 2,
                "territoryName": "Wistan",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 2194,
            "mapTerritoryId": 3,
            "gameInstanceId": 643,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 3,
                "territoryName": "Prusnia",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 2195,
            "mapTerritoryId": 4,
            "gameInstanceId": 643,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 4,
                "territoryName": "Ronetia",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 2200,
            "mapTerritoryId": 5,
            "gameInstanceId": 643,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 5,
                "territoryName": "Sona",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 2197,
            "mapTerritoryId": 6,
            "gameInstanceId": 643,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 6,
                "territoryName": "Caba",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 2198,
            "mapTerritoryId": 7,
            "gameInstanceId": 643,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 7,
                "territoryName": "Laly",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 2199,
            "mapTerritoryId": 8,
            "gameInstanceId": 643,
            "isCapital": true,
            "territoryScore": 0,
            "takenBy": 4,
            "attackedBy": null,
            "mapTerritory": {
                "id": 8,
                "territoryName": "Kide",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 2191,
            "mapTerritoryId": 9,
            "gameInstanceId": 643,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 9,
                "territoryName": "Renyt",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 2192,
            "mapTerritoryId": 10,
            "gameInstanceId": 643,
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
            "id": 2189,
            "mapTerritoryId": 11,
            "gameInstanceId": 643,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 11,
                "territoryName": "Rilanor",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 2188,
            "mapTerritoryId": 12,
            "gameInstanceId": 643,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 12,
                "territoryName": "Caydo",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 2187,
            "mapTerritoryId": 13,
            "gameInstanceId": 643,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 13,
                "territoryName": "Sopore",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 2186,
            "mapTerritoryId": 14,
            "gameInstanceId": 643,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 14,
                "territoryName": "Tustra",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 2185,
            "mapTerritoryId": 15,
            "gameInstanceId": 643,
            "isCapital": true,
            "territoryScore": 0,
            "takenBy": 1,
            "attackedBy": null,
            "mapTerritory": {
                "id": 15,
                "territoryName": "Napana",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 2184,
            "mapTerritoryId": 16,
            "gameInstanceId": 643,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 16,
                "territoryName": "Ramac",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 2183,
            "mapTerritoryId": 17,
            "gameInstanceId": 643,
            "isCapital": true,
            "territoryScore": 0,
            "takenBy": 2,
            "attackedBy": null,
            "mapTerritory": {
                "id": 17,
                "territoryName": "Dager",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 2182,
            "mapTerritoryId": 18,
            "gameInstanceId": 643,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 18,
                "territoryName": "Ranku",
                "mapId": 1,
                "map": null,
                "bordersNextToTerritoryNavigation": [],
                "bordersThisTerritoryNavigation": [],
                "objectTerritory": []
            }
        },
        {
            "id": 2190,
            "mapTerritoryId": 19,
            "gameInstanceId": 643,
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
            "id": 2181,
            "mapTerritoryId": 20,
            "gameInstanceId": 643,
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
            "id": 837,
            "avatarName": "penguinAvatar2",
            "playerId": 1,
            "gameId": 643,
            "isBot": false,
            "score": 0,
            "player": {
                "id": 1,
                "email": "legendsxchaos@gmail.com",
                "username": "Boosted Penguin",
                "role": "user",
                "isBanned": false,
                "isOnline": false,
                "provider": false,
                "isInGame": false,
                "participants": [],
                "refreshToken": []
            }
        },
        {
            "id": 838,
            "avatarName": "penguinAvatar",
            "playerId": 2,
            "gameId": 643,
            "isBot": false,
            "score": 0,
            "player": {
                "id": 2,
                "email": "0xxxmclegendxxx0@gmail.com",
                "username": "Alex Todorov",
                "role": "user",
                "isBanned": false,
                "isOnline": false,
                "provider": false,
                "isInGame": false,
                "participants": [],
                "refreshToken": []
            }
        },
        {
            "id": 839,
            "avatarName": "penguinAvatar3",
            "playerId": 4,
            "gameId": 643,
            "isBot": false,
            "score": 0,
            "player": {
                "id": 4,
                "email": "tenantcomplaints69@gmail.com",
                "username": "Joseph Stalin",
                "role": "user",
                "isBanned": false,
                "isOnline": false,
                "provider": false,
                "isInGame": false,
                "participants": [],
                "refreshToken": []
            }
        }
    ],
    "rounds": [
        {
            "id": 1867,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 1,
            "attackerId": 1,
            "defenderId": null,
            "gameInstanceId": 643,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1866,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 2,
            "attackerId": 4,
            "defenderId": null,
            "gameInstanceId": 643,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1865,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 3,
            "attackerId": 2,
            "defenderId": null,
            "gameInstanceId": 643,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1864,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 4,
            "attackerId": 4,
            "defenderId": null,
            "gameInstanceId": 643,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1870,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 5,
            "attackerId": 1,
            "defenderId": null,
            "gameInstanceId": 643,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1863,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 6,
            "attackerId": 2,
            "defenderId": null,
            "gameInstanceId": 643,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1862,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 7,
            "attackerId": 4,
            "defenderId": null,
            "gameInstanceId": 643,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1861,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 8,
            "attackerId": 1,
            "defenderId": null,
            "gameInstanceId": 643,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1869,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 9,
            "attackerId": 2,
            "defenderId": null,
            "gameInstanceId": 643,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1860,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 10,
            "attackerId": 1,
            "defenderId": null,
            "gameInstanceId": 643,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1859,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 11,
            "attackerId": 4,
            "defenderId": null,
            "gameInstanceId": 643,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1858,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 12,
            "attackerId": 2,
            "defenderId": null,
            "gameInstanceId": 643,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1857,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 13,
            "attackerId": 1,
            "defenderId": null,
            "gameInstanceId": 643,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1856,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 14,
            "attackerId": 4,
            "defenderId": null,
            "gameInstanceId": 643,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1855,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 15,
            "attackerId": 2,
            "defenderId": null,
            "gameInstanceId": 643,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1854,
            "roundStage": 0,
            "isLastUntakenTerritories": true,
            "gameRoundNumber": 16,
            "attackerId": null,
            "defenderId": null,
            "gameInstanceId": 643,
            "description": "Number question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1868,
            "roundStage": 0,
            "isLastUntakenTerritories": true,
            "gameRoundNumber": 17,
            "attackerId": null,
            "defenderId": null,
            "gameInstanceId": 643,
            "description": "Number question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        }
    ]
}