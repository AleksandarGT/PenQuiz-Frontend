import { Platform } from 'react-native'

export function GetAvatarColor(avatarName) {
    return ReturnColor(avatarName)
}


export function GetParticipantColor(gameInstance, playerId) {
    let particip = gameInstance.participants.find(x => x.playerId == playerId)

    return ReturnColor(particip?.avatarName)
}

export function GetAttackTerritoryPossibilityColor(gameInstance, playerId) {
    let particip = gameInstance.participants.find(x => x.playerId == playerId)

    switch (particip?.avatarName) {
        case "penguinAvatar":
            return "#90A7FF"
        case "penguinAvatar2":
            return "#BCA0FF"
        case "penguinAvatar3":
            return "#FF98AD"
    }
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

export function GetPenguinAvatarImage(avatarName) {
    if(Platform.OS == "web") {
        return avatarName == "penguinAvatar"
        ? require('../../assets/penguinAvatar.svg')
        : avatarName == "penguinAvatar2"
            ? require('../../assets/penguinAvatar2.svg')
            : require('../../assets/penguinAvatar3.svg')
    }
    else {
        return avatarName == "penguinAvatar"
        ? require('../../assets/penguinAvatar.png')
        : avatarName == "penguinAvatar2"
            ? require('../../assets/penguinAvatar2.png')
            : require('../../assets/penguinAvatar3.png')
    }
}

export function RoundAttackStage(attackStage) {
    switch (attackStage) {
        case 0:
            return "MULTIPLE_NEUTRAL"
        case 1:
            return "NUMBER_NEUTRAL"
        case 2:
            return "MULTIPLE_PVP"
        case 3:
            return "NUMBER_PVP"
    }
}

export function GetGameState(gameState) {
    switch (gameState) {
        case 0:
            return "IN_LOBBY"
        case 1:
            return "IN_PROGRESS"
        case 2:
            return "FINISHED"
        case 3:
            return "CANCELED"
        default:
            return null
    }
}

export const gameSvgs = [
    {
        name: "penguinAvatar",
        img: require(`../../assets/penguinAvatar.svg`)
    },
    {
        name: "penguinAvatar2",
        img: require(`../../assets/penguinAvatar2.svg`)
    },
    {
        name: "penguinAvatar3",
        img: require(`../../assets/penguinAvatar3.svg`)
    },
    {
        name: "shield",
        img: require(`../../assets/shield.svg`)
    },
    {
        name: "sword",
        img: require(`../../assets/sword.svg`)
    },
]

export const playerQuestionAnswersMock = {
    "correctAnswerId": 1,
    "playerAnswers": [
        {
            "id": 1,
            "answerId": 3
        },
        {
            "id": 2,
            "answerId": 1
        },
        {
            "id": 3,
            "answerId": 2
        }
    ]
}



export const playerQuestionNumberAnswersMock = {
    "correctAnswer": 681,
    "playerAnswers": [
        {
            "playerId": 1,
            "answer": 312,
            "differenceWithCorrect": 369,
            "timeElapsed": "3.5s",
            "winner": true,
        },
        {
            "playerId": 2,
            "answer": 1211,
            "differenceWithCorrect": 530,
            "timeElapsed": "8.9s",
            "winner": false,
        },
        {
            "playerId": 3,
            "answer": 1532,
            "differenceWithCorrect": 851,
            "timeElapsed": "5.3s",
            "winner": false,
        },
    ]
}

export const numberChoicePvpQuestionMock = {
    "id": 1,
    "isNeutral": false,
    "question": "When was Bulgaria founded?",
    "type": "number",
    "attackerId": 1,
    "defenderId": 2,
    "participants": [
        {
            "avatarName": "penguinAvatar",
            "playerId": 1,
        },
        {
            "avatarName": "penguinAvatar2",
            "playerId": 2,
        }
    ],
}

export const numberChoiceQuestionMock = {
    "id": 1,
    "isNeutral": true,
    "question": "When was Bulgaria founded?",
    "type": "number",
    "participants": [
        {
            "avatarName": "penguinAvatar",
            "playerId": 1,
        },
        {
            "avatarName": "penguinAvatar2",
            "playerId": 2,
        },
        {
            "avatarName": "penguinAvatar3",
            "playerId": 3,
        }
    ],
}

export const multipleChoiceQuestionMock = {
    "id": 1,
    "isNeutral": true,
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
    "attackerId": 1,
    "defenderId": 2,
    "participants": [
        {
            "avatarName": "penguinAvatar",
            "playerId": 1,
        },
        {
            "avatarName": "penguinAvatar2",
            "playerId": 2,
        },
        {
            "avatarName": "penguinAvatar3",
            "playerId": 3,
        }
    ],
}

export const multipleChoicePvpQuestionMock = {
    "id": 1,
    "isNeutral": false,
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
    "attackerId": 1,
    "defenderId": 2,
    "participants": [
        {
            "avatarName": "penguinAvatar",
            "playerId": 1,
        },
        {
            "avatarName": "penguinAvatar2",
            "playerId": 2,
        }
    ],
}

export const playerAttackPossibilitiesMock = {
    "availableAttackTerritories": [
        "Lisu",
        "Renyt",
        "Dager"
    ],
    "attackerId": 2
}

export const gameInstanceMock = {
    "id": 22,
    "resultId": 0,
    "questionTimerSeconds": 30,
    "startTime": "2021-12-04T20:05:11.46",
    "endTime": null,
    "mapid": 1,
    "participantsId": 0,
    "gameCreatorId": 1,
    "gameState": 1,
    "invitationLink": "3400",
    "gameRoundNumber": 42,
    "map": null,
    "objectTerritory": [
        {
            "id": 421,
            "mapTerritoryId": 20,
            "gameInstanceId": 22,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": 1,
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
            "id": 425,
            "mapTerritoryId": 16,
            "gameInstanceId": 22,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": 1,
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
            "id": 426,
            "mapTerritoryId": 15,
            "gameInstanceId": 22,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": 1,
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
            "id": 428,
            "mapTerritoryId": 12,
            "gameInstanceId": 22,
            "isCapital": true,
            "territoryScore": 0,
            "takenBy": 1,
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
            "id": 431,
            "mapTerritoryId": 9,
            "gameInstanceId": 22,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": 1,
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
            "id": 432,
            "mapTerritoryId": 8,
            "gameInstanceId": 22,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": 1,
            "attackedBy": null,
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
            "id": 436,
            "mapTerritoryId": 4,
            "gameInstanceId": 22,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": 1,
            "attackedBy": null,
            "neutralRoundsAttacks": [],
            "pvpRounds": [
                {
                    "id": 379,
                    "attackerId": 2,
                    "defenderId": 1,
                    "winnerId": 1,
                    "attackedTerritoryId": 436,
                    "roundId": 506,
                    "numberQuestion": null,
                    "round": {
                        "id": 506,
                        "attackStage": 2,
                        "gameInstanceId": 22,
                        "gameRoundNumber": 41,
                        "isTerritoryVotingOpen": false,
                        "isQuestionVotingOpen": false,
                        "questionOpenedAt": null,
                        "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
                        "question": null,
                        "neutralRound": null
                    },
                    "pvpRoundAnswers": [
                        {
                            "id": 19,
                            "userId": 1,
                            "mChoiceQAnswerId": 2395,
                            "numberQAnswer": null,
                            "pvpRoundId": 379
                        }
                    ]
                }
            ],
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
            "id": 437,
            "mapTerritoryId": 3,
            "gameInstanceId": 22,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": 1,
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
            "id": 422,
            "mapTerritoryId": 19,
            "gameInstanceId": 22,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": 3,
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
            "id": 423,
            "mapTerritoryId": 18,
            "gameInstanceId": 22,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": 2,
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
            "id": 424,
            "mapTerritoryId": 17,
            "gameInstanceId": 22,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": 2,
            "attackedBy": null,
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
            "id": 427,
            "mapTerritoryId": 14,
            "gameInstanceId": 22,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": 3,
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
            "id": 429,
            "mapTerritoryId": 11,
            "gameInstanceId": 22,
            "isCapital": false,
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
            "id": 430,
            "mapTerritoryId": 13,
            "gameInstanceId": 22,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": 3,
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
            "id": 433,
            "mapTerritoryId": 7,
            "gameInstanceId": 22,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": 2,
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
            "id": 434,
            "mapTerritoryId": 6,
            "gameInstanceId": 22,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": 2,
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
            "id": 435,
            "mapTerritoryId": 5,
            "gameInstanceId": 22,
            "isCapital": true,
            "territoryScore": 0,
            "takenBy": 3,
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
            "id": 438,
            "mapTerritoryId": 2,
            "gameInstanceId": 22,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": 2,
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
            "id": 439,
            "mapTerritoryId": 10,
            "gameInstanceId": 22,
            "isCapital": false,
            "territoryScore": 0,
            "takenBy": 2,
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
            "id": 440,
            "mapTerritoryId": 1,
            "gameInstanceId": 22,
            "isCapital": true,
            "territoryScore": 0,
            "takenBy": 2,
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
            "id": 64,
            "avatarName": "penguinAvatar2",
            "playerId": 1,
            "gameId": 22,
            "isBot": false,
            "score": 1000,
            "player": {
                "id": 1,
                "username": "Boosted Penguin",
                "isInGame": false,
                "externalId": 1,
                "participants": []
            }
        },
        {
            "id": 65,
            "avatarName": "penguinAvatar3",
            "playerId": 3,
            "gameId": 22,
            "isBot": false,
            "score": 1500,
            "player": {
                "id": 3,
                "username": "Aleksandar Todorov",
                "isInGame": false,
                "externalId": 3,
                "participants": []
            }
        },
        {
            "id": 66,
            "avatarName": "penguinAvatar",
            "playerId": 2,
            "gameId": 22,
            "isBot": false,
            "score": 500,
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
            "id": 485,
            "attackStage": 0,
            "gameInstanceId": 22,
            "gameRoundNumber": 1,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "questionOpenedAt": null,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": {
                "id": 106,
                "roundId": 485,
                "attackOrderNumber": 1,
                "territoryAttackers": [
                    {
                        "id": 316,
                        "attackOrderNumber": 1,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 2,
                        "neutralRoundId": 106,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 317,
                        "attackOrderNumber": 2,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 1,
                        "neutralRoundId": 106,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 318,
                        "attackOrderNumber": 3,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 3,
                        "neutralRoundId": 106,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    }
                ]
            },
            "pvpRound": {
                "id": 379,
                "attackerId": 2,
                "defenderId": 1,
                "winnerId": 1,
                "attackedTerritoryId": 436,
                "roundId": 506,
                "numberQuestion": null,
                "attackedTerritory": {
                    "id": 436,
                    "mapTerritoryId": 4,
                    "gameInstanceId": 22,
                    "isCapital": false,
                    "territoryScore": 0,
                    "takenBy": 1,
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
                "pvpRoundAnswers": [
                    {
                        "id": 19,
                        "userId": 1,
                        "mChoiceQAnswerId": 2395,
                        "numberQAnswer": null,
                        "pvpRoundId": 379
                    }
                ]
            }
        },
        {
            "id": 486,
            "attackStage": 0,
            "gameInstanceId": 22,
            "gameRoundNumber": 2,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "questionOpenedAt": null,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": {
                "id": 107,
                "roundId": 486,
                "attackOrderNumber": 1,
                "territoryAttackers": [
                    {
                        "id": 319,
                        "attackOrderNumber": 1,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 3,
                        "neutralRoundId": 107,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 320,
                        "attackOrderNumber": 2,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 2,
                        "neutralRoundId": 107,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 321,
                        "attackOrderNumber": 3,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 1,
                        "neutralRoundId": 107,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    }
                ]
            },
            "pvpRound": null
        },
        {
            "id": 487,
            "attackStage": 0,
            "gameInstanceId": 22,
            "gameRoundNumber": 3,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "questionOpenedAt": null,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": {
                "id": 108,
                "roundId": 487,
                "attackOrderNumber": 1,
                "territoryAttackers": [
                    {
                        "id": 322,
                        "attackOrderNumber": 1,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 3,
                        "neutralRoundId": 108,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 323,
                        "attackOrderNumber": 2,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 2,
                        "neutralRoundId": 108,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 324,
                        "attackOrderNumber": 3,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 1,
                        "neutralRoundId": 108,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    }
                ]
            },
            "pvpRound": null
        },
        {
            "id": 488,
            "attackStage": 0,
            "gameInstanceId": 22,
            "gameRoundNumber": 4,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "questionOpenedAt": null,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": {
                "id": 109,
                "roundId": 488,
                "attackOrderNumber": 1,
                "territoryAttackers": [
                    {
                        "id": 325,
                        "attackOrderNumber": 1,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 3,
                        "neutralRoundId": 109,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 326,
                        "attackOrderNumber": 2,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 2,
                        "neutralRoundId": 109,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 327,
                        "attackOrderNumber": 3,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 1,
                        "neutralRoundId": 109,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    }
                ]
            },
            "pvpRound": null
        },
        {
            "id": 484,
            "attackStage": 0,
            "gameInstanceId": 22,
            "gameRoundNumber": 5,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "questionOpenedAt": null,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": {
                "id": 110,
                "roundId": 484,
                "attackOrderNumber": 1,
                "territoryAttackers": [
                    {
                        "id": 328,
                        "attackOrderNumber": 1,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 1,
                        "neutralRoundId": 110,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 329,
                        "attackOrderNumber": 2,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 3,
                        "neutralRoundId": 110,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 330,
                        "attackOrderNumber": 3,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 2,
                        "neutralRoundId": 110,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    }
                ]
            },
            "pvpRound": null
        },
        {
            "id": 506,
            "attackStage": 2,
            "gameInstanceId": 22,
            "gameRoundNumber": 41,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "questionOpenedAt": null,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": null,
            "pvpRound": {
                "id": 379,
                "attackerId": 2,
                "defenderId": 1,
                "winnerId": 1,
                "attackedTerritoryId": 436,
                "roundId": 506,
                "numberQuestion": null,
                "attackedTerritory": {
                    "id": 436,
                    "mapTerritoryId": 4,
                    "gameInstanceId": 22,
                    "isCapital": false,
                    "territoryScore": 0,
                    "takenBy": 1,
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
                "pvpRoundAnswers": [
                    {
                        "id": 19,
                        "userId": 1,
                        "mChoiceQAnswerId": 2395,
                        "numberQAnswer": null,
                        "pvpRoundId": 379
                    }
                ]
            }
        },
        {
            "id": 491,
            "attackStage": 2,
            "gameInstanceId": 22,
            "gameRoundNumber": 42,
            "isTerritoryVotingOpen": true,
            "isQuestionVotingOpen": false,
            "questionOpenedAt": null,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": null,
            "pvpRound": {
                "id": 394,
                "attackerId": 1,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 491,
                "numberQuestion": null,
                "attackedTerritory": null,
                "pvpRoundAnswers": []
            }
        },
        {
            "id": 492,
            "attackStage": 2,
            "gameInstanceId": 22,
            "gameRoundNumber": 43,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "questionOpenedAt": null,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": null,
            "pvpRound": {
                "id": 393,
                "attackerId": 3,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 492,
                "numberQuestion": null,
                "attackedTerritory": null,
                "pvpRoundAnswers": []
            }
        },
        {
            "id": 493,
            "attackStage": 2,
            "gameInstanceId": 22,
            "gameRoundNumber": 44,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "questionOpenedAt": null,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": null,
            "pvpRound": {
                "id": 392,
                "attackerId": 3,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 493,
                "numberQuestion": null,
                "attackedTerritory": null,
                "pvpRoundAnswers": []
            }
        },
        {
            "id": 494,
            "attackStage": 2,
            "gameInstanceId": 22,
            "gameRoundNumber": 45,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "questionOpenedAt": null,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": null,
            "pvpRound": {
                "id": 391,
                "attackerId": 1,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 494,
                "numberQuestion": null,
                "attackedTerritory": null,
                "pvpRoundAnswers": []
            }
        },
        {
            "id": 495,
            "attackStage": 2,
            "gameInstanceId": 22,
            "gameRoundNumber": 46,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "questionOpenedAt": null,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": null,
            "pvpRound": {
                "id": 390,
                "attackerId": 2,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 495,
                "numberQuestion": null,
                "attackedTerritory": null,
                "pvpRoundAnswers": []
            }
        },
        {
            "id": 496,
            "attackStage": 2,
            "gameInstanceId": 22,
            "gameRoundNumber": 47,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "questionOpenedAt": null,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": null,
            "pvpRound": {
                "id": 389,
                "attackerId": 1,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 496,
                "numberQuestion": null,
                "attackedTerritory": null,
                "pvpRoundAnswers": []
            }
        },
        {
            "id": 498,
            "attackStage": 2,
            "gameInstanceId": 22,
            "gameRoundNumber": 48,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "questionOpenedAt": null,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": null,
            "pvpRound": {
                "id": 388,
                "attackerId": 3,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 498,
                "numberQuestion": null,
                "attackedTerritory": null,
                "pvpRoundAnswers": []
            }
        },
        {
            "id": 505,
            "attackStage": 2,
            "gameInstanceId": 22,
            "gameRoundNumber": 49,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "questionOpenedAt": null,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": null,
            "pvpRound": {
                "id": 387,
                "attackerId": 2,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 505,
                "numberQuestion": null,
                "attackedTerritory": null,
                "pvpRoundAnswers": []
            }
        },
        {
            "id": 499,
            "attackStage": 2,
            "gameInstanceId": 22,
            "gameRoundNumber": 50,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "questionOpenedAt": null,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": null,
            "pvpRound": {
                "id": 386,
                "attackerId": 1,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 499,
                "numberQuestion": null,
                "attackedTerritory": null,
                "pvpRoundAnswers": []
            }
        },
        {
            "id": 500,
            "attackStage": 2,
            "gameInstanceId": 22,
            "gameRoundNumber": 51,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "questionOpenedAt": null,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": null,
            "pvpRound": {
                "id": 385,
                "attackerId": 3,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 500,
                "numberQuestion": null,
                "attackedTerritory": null,
                "pvpRoundAnswers": []
            }
        },
        {
            "id": 501,
            "attackStage": 2,
            "gameInstanceId": 22,
            "gameRoundNumber": 52,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "questionOpenedAt": null,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": null,
            "pvpRound": {
                "id": 384,
                "attackerId": 2,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 501,
                "numberQuestion": null,
                "attackedTerritory": null,
                "pvpRoundAnswers": []
            }
        },
        {
            "id": 502,
            "attackStage": 2,
            "gameInstanceId": 22,
            "gameRoundNumber": 53,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "questionOpenedAt": null,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": null,
            "pvpRound": {
                "id": 383,
                "attackerId": 3,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 502,
                "numberQuestion": null,
                "attackedTerritory": null,
                "pvpRoundAnswers": []
            }
        },
        {
            "id": 503,
            "attackStage": 2,
            "gameInstanceId": 22,
            "gameRoundNumber": 54,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "questionOpenedAt": null,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": null,
            "pvpRound": {
                "id": 382,
                "attackerId": 1,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 503,
                "numberQuestion": null,
                "attackedTerritory": null,
                "pvpRoundAnswers": []
            }
        },
        {
            "id": 504,
            "attackStage": 2,
            "gameInstanceId": 22,
            "gameRoundNumber": 55,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "questionOpenedAt": null,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": null,
            "pvpRound": {
                "id": 381,
                "attackerId": 2,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 504,
                "numberQuestion": null,
                "attackedTerritory": null,
                "pvpRoundAnswers": []
            }
        },
        {
            "id": 490,
            "attackStage": 2,
            "gameInstanceId": 22,
            "gameRoundNumber": 56,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "questionOpenedAt": null,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": null,
            "pvpRound": {
                "id": 380,
                "attackerId": 2,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 490,
                "numberQuestion": null,
                "attackedTerritory": null,
                "pvpRoundAnswers": []
            }
        },
        {
            "id": 497,
            "attackStage": 2,
            "gameInstanceId": 22,
            "gameRoundNumber": 57,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "questionOpenedAt": null,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": null,
            "pvpRound": {
                "id": 395,
                "attackerId": 1,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 497,
                "numberQuestion": null,
                "attackedTerritory": null,
                "pvpRoundAnswers": []
            }
        },
        {
            "id": 489,
            "attackStage": 2,
            "gameInstanceId": 22,
            "gameRoundNumber": 58,
            "isTerritoryVotingOpen": false,
            "isQuestionVotingOpen": false,
            "questionOpenedAt": null,
            "description": "MultipleChoice question. Attacker vs NEUTRAL territory",
            "question": null,
            "neutralRound": null,
            "pvpRound": {
                "id": 396,
                "attackerId": 3,
                "defenderId": null,
                "winnerId": null,
                "attackedTerritoryId": null,
                "roundId": 489,
                "numberQuestion": null,
                "attackedTerritory": null,
                "pvpRoundAnswers": []
            }
        }
    ]
}