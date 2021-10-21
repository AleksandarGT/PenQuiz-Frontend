export function GetAvatarColor(avatarName) {
    return ReturnColor(avatarName)
}


export function GetParticipantColor(gameInstance, playerId) {
    let particip = gameInstance.participants.find(x => x.playerId == playerId)

    return ReturnColor(particip.avatarName);
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
    "id": 641,
    "resultId": 0,
    "questionTimerSeconds": 30,
    "startTime": "2021-10-21T18:58:11.997",
    "endTime": null,
    "mapid": 1,
    "participantsId": 0,
    "gameCreatorId": 1,
    "gameState": 1,
    "invitationLink": "5261",
    "gameRoundNumber": 1,
    "map": null,
    "objectTerritory": [
        {
            "id": 2156,
            "mapTerritoryId": 1,
            "gameInstanceId": 641,
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
            "id": 2153,
            "mapTerritoryId": 2,
            "gameInstanceId": 641,
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
            "id": 2154,
            "mapTerritoryId": 3,
            "gameInstanceId": 641,
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
            "id": 2155,
            "mapTerritoryId": 4,
            "gameInstanceId": 641,
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
            "id": 2160,
            "mapTerritoryId": 5,
            "gameInstanceId": 641,
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
            "id": 2157,
            "mapTerritoryId": 6,
            "gameInstanceId": 641,
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
            "id": 2158,
            "mapTerritoryId": 7,
            "gameInstanceId": 641,
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
            "id": 2159,
            "mapTerritoryId": 8,
            "gameInstanceId": 641,
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
            "id": 2151,
            "mapTerritoryId": 9,
            "gameInstanceId": 641,
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
            "id": 2152,
            "mapTerritoryId": 10,
            "gameInstanceId": 641,
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
            "id": 2149,
            "mapTerritoryId": 11,
            "gameInstanceId": 641,
            "takenBy": 1,
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
            "id": 2148,
            "mapTerritoryId": 12,
            "gameInstanceId": 641,
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
            "id": 2147,
            "mapTerritoryId": 13,
            "gameInstanceId": 641,
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
            "id": 2146,
            "mapTerritoryId": 14,
            "gameInstanceId": 641,
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
            "id": 2145,
            "mapTerritoryId": 15,
            "gameInstanceId": 641,
            "takenBy": null,
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
            "id": 2144,
            "mapTerritoryId": 16,
            "gameInstanceId": 641,
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
            "id": 2143,
            "mapTerritoryId": 17,
            "gameInstanceId": 641,
            "takenBy": null,
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
            "id": 2142,
            "mapTerritoryId": 18,
            "gameInstanceId": 641,
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
            "id": 2150,
            "mapTerritoryId": 19,
            "gameInstanceId": 641,
            "takenBy": 2,
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
            "id": 2141,
            "mapTerritoryId": 20,
            "gameInstanceId": 641,
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
            "id": 831,
            "avatarName": "penguinAvatar3",
            "playerId": 1,
            "gameId": 641,
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
            "id": 832,
            "avatarName": "penguinAvatar2",
            "playerId": 2,
            "gameId": 641,
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
            "id": 833,
            "avatarName": "penguinAvatar",
            "playerId": 4,
            "gameId": 641,
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
            "id": 1833,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 1,
            "attackerId": 1,
            "defenderId": null,
            "gameInstanceId": 641,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1832,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 2,
            "attackerId": 2,
            "defenderId": null,
            "gameInstanceId": 641,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1831,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 3,
            "attackerId": 4,
            "defenderId": null,
            "gameInstanceId": 641,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1830,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 4,
            "attackerId": 2,
            "defenderId": null,
            "gameInstanceId": 641,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1836,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 5,
            "attackerId": 4,
            "defenderId": null,
            "gameInstanceId": 641,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1829,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 6,
            "attackerId": 1,
            "defenderId": null,
            "gameInstanceId": 641,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1828,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 7,
            "attackerId": 1,
            "defenderId": null,
            "gameInstanceId": 641,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1827,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 8,
            "attackerId": 2,
            "defenderId": null,
            "gameInstanceId": 641,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1835,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 9,
            "attackerId": 4,
            "defenderId": null,
            "gameInstanceId": 641,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1826,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 10,
            "attackerId": 4,
            "defenderId": null,
            "gameInstanceId": 641,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1825,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 11,
            "attackerId": 2,
            "defenderId": null,
            "gameInstanceId": 641,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1824,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 12,
            "attackerId": 1,
            "defenderId": null,
            "gameInstanceId": 641,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1823,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 13,
            "attackerId": 2,
            "defenderId": null,
            "gameInstanceId": 641,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1822,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 14,
            "attackerId": 4,
            "defenderId": null,
            "gameInstanceId": 641,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1821,
            "roundStage": 0,
            "isLastUntakenTerritories": false,
            "gameRoundNumber": 15,
            "attackerId": 1,
            "defenderId": null,
            "gameInstanceId": 641,
            "description": "Fixed question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1820,
            "roundStage": 0,
            "isLastUntakenTerritories": true,
            "gameRoundNumber": 16,
            "attackerId": null,
            "defenderId": null,
            "gameInstanceId": 641,
            "description": "Number question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        },
        {
            "id": 1834,
            "roundStage": 0,
            "isLastUntakenTerritories": true,
            "gameRoundNumber": 17,
            "attackerId": null,
            "defenderId": null,
            "gameInstanceId": 641,
            "description": "Number question. Attacker vs NEUTRAL territory",
            "roundWinnerId": null,
            "roundQuestion": []
        }
    ]
}