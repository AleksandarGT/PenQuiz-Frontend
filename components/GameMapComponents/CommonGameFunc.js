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

export function RoundAttackStage(attackStage) {
    switch (attackStage) {
        case 0:
            return "MULTIPLE_NEUTRAL";
        case 1:
            return "NUMBER_NEUTRAL";
        case 2:
            return "MULTIPLE_PVP";
        case 3:
            return "NUMBER_PVP";
    }
}


export const gameInstanceMock = {
    "id": 1,
    "resultId": 0,
    "questionTimerSeconds": 30,
    "startTime": "2021-11-10T13:40:04.9",
    "endTime": null,
    "mapid": 1,
    "participantsId": 0,
    "gameCreatorId": 1,
    "gameState": 1,
    "invitationLink": "2335",
    "gameRoundNumber": 1,
    "map": null,
    "objectTerritory": [
        {
            "id": 20,
            "mapTerritoryId": 1,
            "gameInstanceId": 1,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "isAttacked": false,
            "neutralRoundsAttacks": [],
            "pvpRounds": [],
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
            "id": 18,
            "mapTerritoryId": 2,
            "gameInstanceId": 1,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "isAttacked": false,
            "neutralRoundsAttacks": [],
            "pvpRounds": [],
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
            "id": 17,
            "mapTerritoryId": 3,
            "gameInstanceId": 1,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "isAttacked": false,
            "neutralRoundsAttacks": [],
            "pvpRounds": [],
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
            "id": 16,
            "mapTerritoryId": 4,
            "gameInstanceId": 1,
            "isCapital": true,
            "territoryScore": 0,
            "takenBy": 1,
            "isAttacked": false,
            "neutralRoundsAttacks": [],
            "pvpRounds": [],
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
            "id": 15,
            "mapTerritoryId": 5,
            "gameInstanceId": 1,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "isAttacked": false,
            "neutralRoundsAttacks": [],
            "pvpRounds": [],
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
            "id": 14,
            "mapTerritoryId": 6,
            "gameInstanceId": 1,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "isAttacked": false,
            "neutralRoundsAttacks": [],
            "pvpRounds": [],
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
            "id": 13,
            "mapTerritoryId": 7,
            "gameInstanceId": 1,
            "isCapital": true,
            "territoryScore": 0,
            "takenBy": 3,
            "isAttacked": false,
            "neutralRoundsAttacks": [],
            "pvpRounds": [],
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
            "id": 12,
            "mapTerritoryId": 8,
            "gameInstanceId": 1,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "isAttacked": false,
            "neutralRoundsAttacks": [],
            "pvpRounds": [],
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
            "id": 11,
            "mapTerritoryId": 9,
            "gameInstanceId": 1,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "isAttacked": false,
            "neutralRoundsAttacks": [],
            "pvpRounds": [],
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
            "id": 19,
            "mapTerritoryId": 10,
            "gameInstanceId": 1,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "isAttacked": false,
            "neutralRoundsAttacks": [],
            "pvpRounds": [],
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
            "id": 9,
            "mapTerritoryId": 11,
            "gameInstanceId": 1,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "isAttacked": false,
            "neutralRoundsAttacks": [],
            "pvpRounds": [],
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
            "id": 8,
            "mapTerritoryId": 12,
            "gameInstanceId": 1,
            "isCapital": true,
            "territoryScore": 0,
            "takenBy": 2,
            "isAttacked": false,
            "neutralRoundsAttacks": [],
            "pvpRounds": [],
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
            "id": 10,
            "mapTerritoryId": 13,
            "gameInstanceId": 1,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "isAttacked": false,
            "neutralRoundsAttacks": [],
            "pvpRounds": [],
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
            "id": 7,
            "mapTerritoryId": 14,
            "gameInstanceId": 1,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "isAttacked": false,
            "neutralRoundsAttacks": [],
            "pvpRounds": [],
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
            "id": 6,
            "mapTerritoryId": 15,
            "gameInstanceId": 1,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "isAttacked": false,
            "neutralRoundsAttacks": [],
            "pvpRounds": [],
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
            "id": 5,
            "mapTerritoryId": 16,
            "gameInstanceId": 1,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "isAttacked": false,
            "neutralRoundsAttacks": [],
            "pvpRounds": [],
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
            "id": 4,
            "mapTerritoryId": 17,
            "gameInstanceId": 1,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "isAttacked": false,
            "neutralRoundsAttacks": [],
            "pvpRounds": [],
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
            "id": 3,
            "mapTerritoryId": 18,
            "gameInstanceId": 1,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "isAttacked": false,
            "neutralRoundsAttacks": [],
            "pvpRounds": [],
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
            "id": 2,
            "mapTerritoryId": 19,
            "gameInstanceId": 1,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "isAttacked": false,
            "neutralRoundsAttacks": [],
            "pvpRounds": [],
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
            "id": 1,
            "mapTerritoryId": 20,
            "gameInstanceId": 1,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "isAttacked": false,
            "neutralRoundsAttacks": [],
            "pvpRounds": [],
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
            "id": 1,
            "avatarName": "penguinAvatar2",
            "playerId": 1,
            "gameId": 1,
            "isBot": false,
            "score": 0,
            "player": {
                "id": 1,
                "username": "Boosted Penguin",
                "isInGame": false,
                "externalId": 1,
                "participants": []
            }
        },
        {
            "id": 2,
            "avatarName": "penguinAvatar",
            "playerId": 2,
            "gameId": 1,
            "isBot": false,
            "score": 0,
            "player": {
                "id": 2,
                "username": "Aleksandar Todorov",
                "isInGame": false,
                "externalId": 2,
                "participants": []
            }
        },
        {
            "id": 3,
            "avatarName": "penguinAvatar3",
            "playerId": 3,
            "gameId": 1,
            "isBot": false,
            "score": 0,
            "player": {
                "id": 3,
                "username": "Alex Todorov",
                "isInGame": false,
                "externalId": 3,
                "participants": []
            }
        }
    ],
    "rounds": [
        {
            "id": 2,
            "roundStage": 0,
            "attackStage": 0,
            "gameInstanceId": 1,
            "gameRoundNumber": 1,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": {
                "id": 1,
                "roundId": 2,
                "attackOrderNumber": 1,
                "territoryAttackers": [
                    {
                        "id": 1,
                        "attackOrderNumber": 1,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 3,
                        "neutralRoundId": 1,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 2,
                        "attackOrderNumber": 2,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 1,
                        "neutralRoundId": 1,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 3,
                        "attackOrderNumber": 3,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 2,
                        "neutralRoundId": 1,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    }
                ]
            },
            "pvpRound": null
        },
        {
            "id": 3,
            "roundStage": 0,
            "attackStage": 0,
            "gameInstanceId": 1,
            "gameRoundNumber": 2,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": {
                "id": 2,
                "roundId": 3,
                "attackOrderNumber": 1,
                "territoryAttackers": [
                    {
                        "id": 4,
                        "attackOrderNumber": 1,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 1,
                        "neutralRoundId": 2,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 5,
                        "attackOrderNumber": 2,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 3,
                        "neutralRoundId": 2,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 6,
                        "attackOrderNumber": 3,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 2,
                        "neutralRoundId": 2,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    }
                ]
            },
            "pvpRound": null
        },
        {
            "id": 4,
            "roundStage": 0,
            "attackStage": 0,
            "gameInstanceId": 1,
            "gameRoundNumber": 3,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": {
                "id": 3,
                "roundId": 4,
                "attackOrderNumber": 1,
                "territoryAttackers": [
                    {
                        "id": 7,
                        "attackOrderNumber": 1,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 3,
                        "neutralRoundId": 3,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 8,
                        "attackOrderNumber": 2,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 1,
                        "neutralRoundId": 3,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 9,
                        "attackOrderNumber": 3,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 2,
                        "neutralRoundId": 3,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    }
                ]
            },
            "pvpRound": null
        },
        {
            "id": 5,
            "roundStage": 0,
            "attackStage": 0,
            "gameInstanceId": 1,
            "gameRoundNumber": 4,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": {
                "id": 4,
                "roundId": 5,
                "attackOrderNumber": 1,
                "territoryAttackers": [
                    {
                        "id": 10,
                        "attackOrderNumber": 1,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 1,
                        "neutralRoundId": 4,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 11,
                        "attackOrderNumber": 2,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 3,
                        "neutralRoundId": 4,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 12,
                        "attackOrderNumber": 3,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 2,
                        "neutralRoundId": 4,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    }
                ]
            },
            "pvpRound": null
        },
        {
            "id": 1,
            "roundStage": 0,
            "attackStage": 0,
            "gameInstanceId": 1,
            "gameRoundNumber": 5,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": {
                "id": 5,
                "roundId": 1,
                "attackOrderNumber": 1,
                "territoryAttackers": [
                    {
                        "id": 13,
                        "attackOrderNumber": 1,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 1,
                        "neutralRoundId": 5,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 14,
                        "attackOrderNumber": 2,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 3,
                        "neutralRoundId": 5,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 15,
                        "attackOrderNumber": 3,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 2,
                        "neutralRoundId": 5,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    }
                ]
            },
            "pvpRound": null
        }
    ]
}