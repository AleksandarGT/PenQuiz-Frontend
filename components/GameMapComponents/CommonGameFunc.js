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

export const multipleChoiceQuestionMock = {
    "id": 1,
    "isNeutral" : true,
    "question": "When was Bulgaria founded?",
    "type": "multiple",
    "answers": [
        {
            "id": 1,
            "answer": "681"
        },
        {
            "id": 2,
            "answer": "1332"
        },
        {
            "id": 3,
            "answer": "806"
        },
        {
            "id": 4,
            "answer": "927"
        },
    ],
    "attackerId" : 1,
    "defenderId" : 2,
    "participants" : [
        {
            "avatarName" : "penguinAvatar",
            "playerId" : 1,
            
        },
        {
            "avatarName" : "penguinAvatar2",
            "playerId" : 2,
        },
        {
            "avatarName" : "penguinAvatar3",
            "playerId" : 3,
        }
    ],
}

export const gameInstanceMock = {
    "id": 3,
    "resultId": 0,
    "questionTimerSeconds": 30,
    "startTime": "2021-11-11T18:31:05.287",
    "endTime": null,
    "mapid": 1,
    "participantsId": 0,
    "gameCreatorId": 1,
    "gameState": 1,
    "invitationLink": "5160",
    "gameRoundNumber": 1,
    "map": null,
    "objectTerritory": [
        {
            "id": 52,
            "mapTerritoryId": 8,
            "gameInstanceId": 3,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": 3,
            "neutralRoundsAttacks": [
                {
                    "id": 31,
                    "attackOrderNumber": 1,
                    "attackedTerritoryId": 52,
                    "attackerWon": null,
                    "attackerId": 3,
                    "neutralRoundId": 11,
                    "attackerMChoiceQAnswerId": null,
                    "attackerNumberQAnswer": null,
                    "neutralRound": {
                        "id": 11,
                        "roundId": 12,
                        "attackOrderNumber": 3,
                        "round": {
                            "id": 12,
                            "roundStage": 0,
                            "attackStage": 0,
                            "gameInstanceId": 3,
                            "gameRoundNumber": 1,
                            "isTerritoryVotingOpen": true,
                            "isQuestionVotingOpen": false,
                            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
                            "question": null,
                            "pvpRound": null
                        },
                        "territoryAttackers": [
                            {
                                "id": 32,
                                "attackOrderNumber": 2,
                                "attackedTerritoryId": 44,
                                "attackerWon": null,
                                "attackerId": 1,
                                "neutralRoundId": 11,
                                "attackerMChoiceQAnswerId": null,
                                "attackerNumberQAnswer": null,
                                "attackedTerritory": {
                                    "id": 44,
                                    "mapTerritoryId": 17,
                                    "gameInstanceId": 3,
                                    "isCapital": false,
                                    "territoryScore": 0,
                                    "takenBy": null,
                                    "attackedBy": 1,
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
                                }
                            },
                            {
                                "id": 33,
                                "attackOrderNumber": 3,
                                "attackedTerritoryId": null,
                                "attackerWon": null,
                                "attackerId": 2,
                                "neutralRoundId": 11,
                                "attackerMChoiceQAnswerId": null,
                                "attackerNumberQAnswer": null,
                                "attackedTerritory": null
                            }
                        ]
                    }
                }
            ],
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
            "id": 44,
            "mapTerritoryId": 17,
            "gameInstanceId": 3,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": 1,
            "neutralRoundsAttacks": [
                {
                    "id": 32,
                    "attackOrderNumber": 2,
                    "attackedTerritoryId": 44,
                    "attackerWon": null,
                    "attackerId": 1,
                    "neutralRoundId": 11,
                    "attackerMChoiceQAnswerId": null,
                    "attackerNumberQAnswer": null,
                    "neutralRound": {
                        "id": 11,
                        "roundId": 12,
                        "attackOrderNumber": 3,
                        "round": {
                            "id": 12,
                            "roundStage": 0,
                            "attackStage": 0,
                            "gameInstanceId": 3,
                            "gameRoundNumber": 1,
                            "isTerritoryVotingOpen": true,
                            "isQuestionVotingOpen": false,
                            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
                            "question": null,
                            "pvpRound": null
                        },
                        "territoryAttackers": [
                            {
                                "id": 31,
                                "attackOrderNumber": 1,
                                "attackedTerritoryId": 52,
                                "attackerWon": null,
                                "attackerId": 3,
                                "neutralRoundId": 11,
                                "attackerMChoiceQAnswerId": null,
                                "attackerNumberQAnswer": null,
                                "attackedTerritory": {
                                    "id": 52,
                                    "mapTerritoryId": 8,
                                    "gameInstanceId": 3,
                                    "isCapital": false,
                                    "territoryScore": 0,
                                    "takenBy": null,
                                    "attackedBy": 3,
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
                                }
                            },
                            {
                                "id": 33,
                                "attackOrderNumber": 3,
                                "attackedTerritoryId": null,
                                "attackerWon": null,
                                "attackerId": 2,
                                "neutralRoundId": 11,
                                "attackerMChoiceQAnswerId": null,
                                "attackerNumberQAnswer": null,
                                "attackedTerritory": null
                            }
                        ]
                    }
                }
            ],
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
            "id": 41,
            "mapTerritoryId": 20,
            "gameInstanceId": 3,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
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
        },
        {
            "id": 42,
            "mapTerritoryId": 19,
            "gameInstanceId": 3,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
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
            "id": 43,
            "mapTerritoryId": 18,
            "gameInstanceId": 3,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
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
            "id": 45,
            "mapTerritoryId": 16,
            "gameInstanceId": 3,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
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
            "id": 46,
            "mapTerritoryId": 15,
            "gameInstanceId": 3,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
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
            "id": 47,
            "mapTerritoryId": 14,
            "gameInstanceId": 3,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
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
            "id": 48,
            "mapTerritoryId": 12,
            "gameInstanceId": 3,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
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
            "id": 49,
            "mapTerritoryId": 11,
            "gameInstanceId": 3,
            "isCapital": true,
            "territoryScore": 0,
            "takenBy": 2,
            "attackedBy": null,
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
            "id": 50,
            "mapTerritoryId": 13,
            "gameInstanceId": 3,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
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
            "id": 51,
            "mapTerritoryId": 9,
            "gameInstanceId": 3,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
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
            "id": 53,
            "mapTerritoryId": 7,
            "gameInstanceId": 3,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
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
            "id": 54,
            "mapTerritoryId": 6,
            "gameInstanceId": 3,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
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
            "id": 55,
            "mapTerritoryId": 5,
            "gameInstanceId": 3,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
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
            "id": 56,
            "mapTerritoryId": 4,
            "gameInstanceId": 3,
            "isCapital": true,
            "territoryScore": 0,
            "takenBy": 3,
            "attackedBy": null,
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
            "id": 57,
            "mapTerritoryId": 3,
            "gameInstanceId": 3,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
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
            "id": 58,
            "mapTerritoryId": 2,
            "gameInstanceId": 3,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
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
            "id": 59,
            "mapTerritoryId": 10,
            "gameInstanceId": 3,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": null,
            "attackedBy": null,
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
            "id": 60,
            "mapTerritoryId": 1,
            "gameInstanceId": 3,
            "isCapital": true,
            "territoryScore": 0,
            "takenBy": 1,
            "attackedBy": null,
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
        }
    ],
    "participants": [
        {
            "id": 7,
            "avatarName": "penguinAvatar3",
            "playerId": 1,
            "gameId": 3,
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
            "id": 8,
            "avatarName": "penguinAvatar2",
            "playerId": 3,
            "gameId": 3,
            "isBot": false,
            "score": 0,
            "player": {
                "id": 3,
                "username": "Alex Todorov",
                "isInGame": false,
                "externalId": 3,
                "participants": []
            }
        },
        {
            "id": 9,
            "avatarName": "penguinAvatar",
            "playerId": 2,
            "gameId": 3,
            "isBot": false,
            "score": 0,
            "player": {
                "id": 2,
                "username": "Aleksandar Todorov",
                "isInGame": false,
                "externalId": 2,
                "participants": []
            }
        }
    ],
    "rounds": [
        {
            "id": 12,
            "roundStage": 0,
            "attackStage": 0,
            "gameInstanceId": 3,
            "gameRoundNumber": 1,
            "isTerritoryVotingOpen": true,
            "isQuestionVotingOpen": false,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": {
                "id": 11,
                "roundId": 12,
                "attackOrderNumber": 3,
                "territoryAttackers": [
                    {
                        "id": 31,
                        "attackOrderNumber": 1,
                        "attackedTerritoryId": 52,
                        "attackerWon": null,
                        "attackerId": 3,
                        "neutralRoundId": 11,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": {
                            "id": 52,
                            "mapTerritoryId": 8,
                            "gameInstanceId": 3,
                            "isCapital": false,
                            "territoryScore": 0,
                            "takenBy": null,
                            "attackedBy": 3,
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
                        }
                    },
                    {
                        "id": 32,
                        "attackOrderNumber": 2,
                        "attackedTerritoryId": 44,
                        "attackerWon": null,
                        "attackerId": 1,
                        "neutralRoundId": 11,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": {
                            "id": 44,
                            "mapTerritoryId": 17,
                            "gameInstanceId": 3,
                            "isCapital": false,
                            "territoryScore": 0,
                            "takenBy": null,
                            "attackedBy": 1,
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
                        }
                    },
                    {
                        "id": 33,
                        "attackOrderNumber": 3,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 2,
                        "neutralRoundId": 11,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    }
                ]
            },
            "pvpRound": null
        },
        {
            "id": 11,
            "roundStage": 0,
            "attackStage": 0,
            "gameInstanceId": 3,
            "gameRoundNumber": 5,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": {
                "id": 15,
                "roundId": 11,
                "attackOrderNumber": 1,
                "territoryAttackers": [
                    {
                        "id": 43,
                        "attackOrderNumber": 1,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 3,
                        "neutralRoundId": 15,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 44,
                        "attackOrderNumber": 2,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 1,
                        "neutralRoundId": 15,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 45,
                        "attackOrderNumber": 3,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 2,
                        "neutralRoundId": 15,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    }
                ]
            },
            "pvpRound": null
        },
        {
            "id": 13,
            "roundStage": 0,
            "attackStage": 0,
            "gameInstanceId": 3,
            "gameRoundNumber": 2,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": {
                "id": 12,
                "roundId": 13,
                "attackOrderNumber": 1,
                "territoryAttackers": [
                    {
                        "id": 34,
                        "attackOrderNumber": 1,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 1,
                        "neutralRoundId": 12,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 35,
                        "attackOrderNumber": 2,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 2,
                        "neutralRoundId": 12,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 36,
                        "attackOrderNumber": 3,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 3,
                        "neutralRoundId": 12,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    }
                ]
            },
            "pvpRound": null
        },
        {
            "id": 14,
            "roundStage": 0,
            "attackStage": 0,
            "gameInstanceId": 3,
            "gameRoundNumber": 3,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": {
                "id": 13,
                "roundId": 14,
                "attackOrderNumber": 1,
                "territoryAttackers": [
                    {
                        "id": 37,
                        "attackOrderNumber": 1,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 1,
                        "neutralRoundId": 13,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 38,
                        "attackOrderNumber": 2,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 2,
                        "neutralRoundId": 13,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 39,
                        "attackOrderNumber": 3,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 3,
                        "neutralRoundId": 13,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    }
                ]
            },
            "pvpRound": null
        },
        {
            "id": 15,
            "roundStage": 0,
            "attackStage": 0,
            "gameInstanceId": 3,
            "gameRoundNumber": 4,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": {
                "id": 14,
                "roundId": 15,
                "attackOrderNumber": 1,
                "territoryAttackers": [
                    {
                        "id": 40,
                        "attackOrderNumber": 1,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 1,
                        "neutralRoundId": 14,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 41,
                        "attackOrderNumber": 2,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 2,
                        "neutralRoundId": 14,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 42,
                        "attackOrderNumber": 3,
                        "attackedTerritoryId": null,
                        "attackerWon": null,
                        "attackerId": 3,
                        "neutralRoundId": 14,
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