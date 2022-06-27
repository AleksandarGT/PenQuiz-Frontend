import { Platform } from 'react-native'
import { ScientistUseNumberHintResponse, WizardUseMultipleChoiceHintResponse } from '../../types/gameCharacterTypes';
import { AttackStage, GameInstanceResponse, GameState } from '../../types/gameInstanceTypes'
import { IPlayerAttackPossibilities, NumberPlayerQuestionAnswers, QuestionClientResponse } from '../../types/gameResponseTypes';

export function GetAvatarColor(inGameParticipantNumber: number) {
    return ReturnColor(inGameParticipantNumber)
}

function ReturnColor(inGameParticipantNumber: number) {
    switch (inGameParticipantNumber) {
        case 1:
            // Blue
            return "#5074FF"
        case 2:
            // Purple
            return "#8350FF"
        case 3:
            // Red
            return "#FF5074"
    }
}


export function GetParticipantColor(gameInstance: GameInstanceResponse, playerId: number) {
    const particip = gameInstance.participants.find(x => x.playerId == playerId)

    if (!particip) return undefined;

    return ReturnColor(particip!.inGameParticipantNumber)
}


export function GetPvpTerritoryNonHighlightColor(inGameParticipantNumber: number) {
    // Blue
    if (inGameParticipantNumber == 1)
        return "#1A3A89"

    // Purple
    if (inGameParticipantNumber == 2)
        return "#292F89"

    // Red
    if (inGameParticipantNumber == 3)
        return "#513060"


    console.log(`Unhandled color combination - Defender participant number: ${inGameParticipantNumber}`)
}

export function GetNeutralTerritoryPossibilityColor(gameInstance: GameInstanceResponse, playerId: number) {
    const particip = gameInstance.participants.find(x => x.playerId == playerId)

    switch (particip?.inGameParticipantNumber) {
        // Blue
        case 1:
            return "#90A7FF"
        // Purple
        case 2:
            return "#BCA0FF"

        // Red
        case 3:
            return "#FF98AD"
    }
}

export function GetPenguinAvatarImage(avatarName: string) {
    if (Platform.OS == "web") {


        switch (avatarName) {
            case "penguinAvatarWizard":
                return require("../../assets/penguinAvatarWizard.svg")

            case "penguinAvatarKing":
                return require('../../assets/penguinAvatarKing.svg')

            case "penguinAvatarViking":
                return require('../../assets/penguinAvatarViking.svg')

            case "penguinAvatarScientist":
                return require("../../assets/penguinAvatarScientist.svg")

            default:
                return require("../../assets/penguinAvatarWizard.svg")
        }
    }



    switch (avatarName) {
        case "penguinAvatarWizard":
            return require("../../assets/penguinAvatarWizard.png")

        case "penguinAvatarKing":
            return require('../../assets/penguinAvatarKing.png')

        case "penguinAvatarViking":
            return require('../../assets/penguinAvatarViking.png')

        case "penguinAvatarScientist":
            return require("../../assets/penguinAvatarScientist.png")

        default:
            return require("../../assets/penguinAvatarWizard.png")
    }
}

export function RoundAttackStage(attackStage: AttackStage) {
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

export const gameSvgs = [
    {
        name: "penguinAvatarScientist",
        img: require(`../../assets/penguinAvatarScientist.svg`),
        imgPng: require(`../../assets/penguinAvatarScientist.png`)
    },
    {
        name: "penguinAvatarWizard",
        img: require(`../../assets/penguinAvatarWizard.svg`),
        imgPng: require(`../../assets/penguinAvatarWizard.png`)
    },
    {
        name: "penguinAvatarKing",
        img: require(`../../assets/penguinAvatarKing.svg`),
        imgPng: require(`../../assets/penguinAvatarKing.png`)
    },
    {
        name: "penguinAvatarViking",
        img: require(`../../assets/penguinAvatarViking.svg`),
        imgPng: require(`../../assets/penguinAvatarViking.png`)
    },
    {
        name: "shield",
        img: require(`../../assets/shield.svg`),
        imgPng: require(`../../assets/shield.png`),
    },
    {
        name: "sword",
        img: require(`../../assets/sword.svg`),
        imgPng: require(`../../assets/sword.png`)
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


export const playerQuestionNumberAnswersMock: NumberPlayerQuestionAnswers = {
    "correctAnswer": "681",
    "playerAnswers": [
        {
            "playerId": 1,
            "answer": "312",
            "differenceWithCorrect": "369",
            "timeElapsed": "3.5s",
            "winner": true,
        },
        {
            "playerId": 2,
            "answer": "1211",
            "differenceWithCorrect": "530",
            "timeElapsed": "8.9s",
            "winner": false,
        },
        {
            "playerId": 3,
            "answer": "1532",
            "differenceWithCorrect": "851",
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
    "isLastQuestion": true,
    "capitalRoundsRemaining": 2,
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

export const numberChoiceQuestionMock: QuestionClientResponse = {
    "isLastQuestion": false,
    "isNeutral": false,
    "capitalRoundsRemaining": 3,
    "id": 1563,
    "question": "When was covid discovered?",
    "type": "number",
    "answers": [
        {
            "id": 4400,
            "answer": "2019"
        }
    ],
    "participants": [
        {
            "id": 364,
            "inGameParticipantNumber": 3,
            "playerId": 2,
            "gameId": 169,
            "isAfk": false,
            "score": 3500,
            "finalQuestionScore": 0,
            "gameCharacter": {
                "id": 357,
                "userId": 2,
                "gameInstanceId": 169,
                "characterAbilities": {
                    "characterType": 2,
                    "gameCharacterId": 357,
                    "vikingCharacterAbilitiesResponse": {
                        "fortifyCapitalUseCount": 1,
                        "fortifyCapitalMaxUseCount": 2,
                        "abilityUsedInRounds": [1],
                    },
                    "scientistCharacterAbilitiesResponse": null,
                    "kingCharacterAbilitiesResponse": null,
                    "wizardCharacterAbilitiesResponse": null,
                },
                "character": {
                    "id": 3,
                    "characterGlobalIdentifier": "d591a05f-5a1a-4a81-8f9e-7fdb2558da3d",
                    "name": "Viking",
                    "avatarName": "penguinAvatarViking",
                    "description": "Some description",
                    "abilityDescription": "Can fortify his capital against attacks, increasing the amount of required consecutive wins for the enemy. Amount of times he can fortify his capital",
                    "pricingType": 0,
                    "characterType": 2,
                    "price": null
                }
            },
            "player": {
                "id": 2,
                "username": "Alex Todorov",
                "userGlobalIdentifier": "285ad7ff-8cf8-4426-b0ae-2cdd276ab98d",
                "isBot": false
            }
        },
        {
            "id": 365,
            "inGameParticipantNumber": 2,
            "playerId": 1,
            "gameId": 169,
            "isAfk": false,
            "score": 3500,
            "finalQuestionScore": 0,
            "gameCharacter": {
                "id": 358,
                "userId": 1,
                "gameInstanceId": 169,
                "characterAbilities": {
                    "characterType": 3,
                    "gameCharacterId": 358,
                    "wizardCharacterAbilitiesResponse": null,
                    "scientistCharacterAbilitiesResponse": {
                        "abilityUsedInRounds": [],
                        "numberQuestionHintMaxUseCount": 2,
                        "numberQuestionHintUseCount": 0,
                    },
                    "kingCharacterAbilitiesResponse": null,
                    "vikingCharacterAbilitiesResponse": null,
                },
                "character": {
                    "id": 1,
                    "characterGlobalIdentifier": "2afae81c-806f-4c67-b977-fb124b4c13db",
                    "name": "Wizard",
                    "avatarName": "penguinAvatarWizard",
                    "description": "Some description",
                    "abilityDescription": "Can remove half the options to select from in a multiple choice question. Ability can be used: 3",
                    "pricingType": 0,
                    "characterType": 0,
                    "price": null
                }
            },
            "player": {
                "id": 1,
                "username": "Boosted Penguin",
                "userGlobalIdentifier": "c0d2a2dc-a040-402b-8d5e-89553745c37d",
                "isBot": false
            }
        }
    ],
    "attackerId": 1,
    "defenderId": 2
}

export const scientistResponseMock: ScientistUseNumberHintResponse = {
    maxRange: "1500",
    minRange: "1000",
    playerId: 1,
    questionResponse: numberChoiceQuestionMock,
}

export const multipleChoiceQuestionMock = {
    "id": 1,
    "isNeutral": true,
    "question": "When was Bulgaria founded?",
    "type": "multiple",
    "capitalRoundsRemaining": 4,
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

export const multipleChoicePvpQuestionMock: QuestionClientResponse = {
    "isLastQuestion": false,
    "isNeutral": false,
    "capitalRoundsRemaining": null,
    "id": 158,
    "question": "When was bulgaria created?",
    "type": "multiple",
    "answers": [
        {
            "id": 428,
            "answer": "681"
        },
        {
            "id": 429,
            "answer": "15"
        },
        {
            "id": 430,
            "answer": "22"
        },
        {
            "id": 431,
            "answer": "512"
        }
    ],
    "participants": [
        {
            "id": 83,
            "inGameParticipantNumber": 3,
            "playerId": 1,
            "gameId": 62,
            "isAfk": false,
            "score": 1000,
            "finalQuestionScore": 0,
            "gameCharacter": {
                "id": 76,
                "userId": 1,
                "gameInstanceId": 62,
                "characterAbilities": {
                    "characterType": 0,
                    "gameCharacterId": 76,
                    kingCharacterAbilitiesResponse: null,
                    vikingCharacterAbilitiesResponse: null,
                    "scientistCharacterAbilitiesResponse": null,
                    "wizardCharacterAbilitiesResponse": {
                        mcQuestionHintMaxUseCount: 2,
                        mcQuestionHintUseCount: 0,
                        "abilityUsedInRounds": [],
                    }
                },
                "character": {
                    "id": 1,
                    "characterGlobalIdentifier": "2afae81c-806f-4c67-b977-fb124b4c13db",
                    "name": "Wizard",
                    "avatarName": "penguinAvatarWizard",
                    "description": "Some description",
                    "abilityDescription": "Can remove half the options to select from in a multiple choice question. Ability can be used: 3",
                    "pricingType": 0,
                    "characterType": 0,
                    "price": null
                }
            },
            "player": {
                "id": 1,
                "username": "Boosted Penguin",
                "userGlobalIdentifier": "c0d2a2dc-a040-402b-8d5e-89553745c37d",
                "isBot": false
            }
        },
        {
            "id": 84,
            "inGameParticipantNumber": 2,
            "playerId": 5,
            "gameId": 62,
            "isAfk": false,
            "score": 1000,
            "finalQuestionScore": 0,
            "gameCharacter": {
                "id": 77,
                "userId": 5,
                "gameInstanceId": 62,
                "characterAbilities": {
                    vikingCharacterAbilitiesResponse: null,
                    wizardCharacterAbilitiesResponse: null,
                    "scientistCharacterAbilitiesResponse": null,
                    "characterType": 1,
                    "gameCharacterId": 77,
                    "kingCharacterAbilitiesResponse": {
                        "currentBonusPoints": 0,
                        "pointsMultiplier": 0.1
                    }
                },
                "character": {
                    "id": 2,
                    "characterGlobalIdentifier": "c0cfb149-10ed-477f-8009-ff22a16a3b5e",
                    "name": "King",
                    "avatarName": "penguinAvatarKing",
                    "description": "Some description",
                    "abilityDescription": "Has a permanent score bonus multiplier when you capture a territory. Multiplier: 10%",
                    "pricingType": 0,
                    "characterType": 1,
                    "price": null
                }
            },
            "player": {
                "id": 5,
                "username": "[BOT]Penguin-5267",
                "userGlobalIdentifier": null,
                "isBot": true
            }
        }
    ],
    "attackerId": 1,
    "defenderId": 5
}

export const wizardUseMultipleChoiceHintMock: WizardUseMultipleChoiceHintResponse = {
    playerId: 1,
    answers: [
        {
            "id": 428,
            "answer": "681"
        },
        {
            "id": 431,
            "answer": "512"
        }
    ],
    questionResponse: multipleChoicePvpQuestionMock
}
export const playerAttackPossibilitiesMock: IPlayerAttackPossibilities = {
    "attackerId": 1,
    "availableAttackTerritories": [
        "Dager",
        "Napana",
        "Sopore",
        "Rilanor",
        "Renyt",
        "Kide",
        "Laly"
    ]
}

export const gameInstanceMock: GameInstanceResponse = {
    "id": 123,
    "gameGlobalIdentifier": "f8c0e39d-8b68-4f5f-8b07-7bebbd1449f7",
    "gameType": 1,
    "mapid": 1,
    "participantsId": 0,
    "gameCreatorId": 1,
    "gameState": 1,
    "invitationLink": "1863",
    "gameRoundNumber": 1,
    "objectTerritory": [
        {
            "id": 961,
            "mapTerritoryId": 1,
            "gameInstanceId": 123,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 1,
                "territoryName": "Vibri"
            }
        },
        {
            "id": 962,
            "mapTerritoryId": 2,
            "gameInstanceId": 123,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 2,
                "territoryName": "Ranku"
            }
        },
        {
            "id": 963,
            "mapTerritoryId": 3,
            "gameInstanceId": 123,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 3,
                "territoryName": "Dager"
            }
        },
        {
            "id": 964,
            "mapTerritoryId": 4,
            "gameInstanceId": 123,
            "isCapital": true,
            "territoryScore": 1000,
            "takenBy": 1,
            "attackedBy": null,
            "mapTerritory": {
                "id": 4,
                "territoryName": "Ramac"
            }
        },
        {
            "id": 965,
            "mapTerritoryId": 5,
            "gameInstanceId": 123,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 5,
                "territoryName": "Napana"
            }
        },
        {
            "id": 966,
            "mapTerritoryId": 6,
            "gameInstanceId": 123,
            "isCapital": true,
            "territoryScore": 1000,
            "takenBy": 6,
            "attackedBy": null,
            "mapTerritory": {
                "id": 6,
                "territoryName": "Tustra"
            }
        },
        {
            "id": 967,
            "mapTerritoryId": 7,
            "gameInstanceId": 123,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 7,
                "territoryName": "Sopore"
            }
        },
        {
            "id": 968,
            "mapTerritoryId": 8,
            "gameInstanceId": 123,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 8,
                "territoryName": "Caydo"
            }
        },
        {
            "id": 969,
            "mapTerritoryId": 9,
            "gameInstanceId": 123,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 9,
                "territoryName": "Rilanor"
            }
        },
        {
            "id": 970,
            "mapTerritoryId": 10,
            "gameInstanceId": 123,
            "isCapital": true,
            "territoryScore": 1000,
            "takenBy": 5,
            "attackedBy": null,
            "mapTerritory": {
                "id": 10,
                "territoryName": "Lisu"
            }
        },
        {
            "id": 971,
            "mapTerritoryId": 11,
            "gameInstanceId": 123,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 11,
                "territoryName": "Renyt"
            }
        },
        {
            "id": 972,
            "mapTerritoryId": 12,
            "gameInstanceId": 123,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 12,
                "territoryName": "Kide"
            }
        },
        {
            "id": 973,
            "mapTerritoryId": 13,
            "gameInstanceId": 123,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 13,
                "territoryName": "Laly"
            }
        },
        {
            "id": 974,
            "mapTerritoryId": 14,
            "gameInstanceId": 123,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 14,
                "territoryName": "Caba"
            }
        },
        {
            "id": 975,
            "mapTerritoryId": 15,
            "gameInstanceId": 123,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 15,
                "territoryName": "Sona"
            }
        },
        {
            "id": 976,
            "mapTerritoryId": 16,
            "gameInstanceId": 123,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 16,
                "territoryName": "Ronetia"
            }
        },
        {
            "id": 977,
            "mapTerritoryId": 17,
            "gameInstanceId": 123,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 17,
                "territoryName": "Prusnia"
            }
        },
        {
            "id": 978,
            "mapTerritoryId": 18,
            "gameInstanceId": 123,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 18,
                "territoryName": "Wistan"
            }
        },
        {
            "id": 979,
            "mapTerritoryId": 19,
            "gameInstanceId": 123,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 19,
                "territoryName": "Rospa"
            }
        },
        {
            "id": 980,
            "mapTerritoryId": 20,
            "gameInstanceId": 123,
            "isCapital": false,
            "territoryScore": 500,
            "takenBy": null,
            "attackedBy": null,
            "mapTerritory": {
                "id": 20,
                "territoryName": "Bavi"
            }
        }
    ],
    "participants": [
        {
            "id": 236,
            "inGameParticipantNumber": 2,
            "avatarName": "penguinAvatarKing",
            "playerId": 1,
            "gameId": 123,
            "isAfk": false,
            "score": 1000,
            "finalQuestionScore": 0,
            "gameCharacter": {
                "id": 229,
                "userId": 1,
                "gameInstanceId": 123,

                // @ts-ignore
                "characterAbilities": {
                    "characterType": 1,
                    "gameCharacterId": 229,
                    "kingCharacterAbilitiesResponse": {
                        "currentBonusPoints": 0,
                        "pointsMultiplier": 0.1
                    },
                },
                "character": {
                    "id": 2,
                    "characterGlobalIdentifier": "c0cfb149-10ed-477f-8009-ff22a16a3b5e",
                    "name": "King",
                    "avatarName": "penguinAvatarKing",
                    "description": "Some description",
                    "abilityDescription": "Has a permanent score bonus multiplier when you capture a territory. Multiplier: 10%",
                    "pricingType": 0,
                    "characterType": 1,
                    "price": null
                }
            },
            "player": {
                "id": 1,
                "username": "Boosted Penguin",
                "userGlobalIdentifier": "c0d2a2dc-a040-402b-8d5e-89553745c37d",
                "isBot": false
            }
        },
        {
            "id": 237,
            "inGameParticipantNumber": 1,
            "avatarName": "penguinAvatarWizard",
            "playerId": 5,
            "gameId": 123,
            "isAfk": false,
            "score": 1000,
            "finalQuestionScore": 0,
            "gameCharacter": {
                "id": 230,
                "userId": 5,
                "gameInstanceId": 123,
                // @ts-ignore
                "characterAbilities": {
                    "characterType": 0,
                    "gameCharacterId": 230,
                    "wizardCharacterAbilitiesResponse": {
                        "abilityUsedInRounds": [],
                        "mcQuestionHintUseCount": 0,
                        "mcQuestionHintMaxUseCount": 3
                    }
                },
                "character": {
                    "id": 1,
                    "characterGlobalIdentifier": "2afae81c-806f-4c67-b977-fb124b4c13db",
                    "name": "Wizard",
                    "avatarName": "penguinAvatarWizard",
                    "description": "Some description",
                    "abilityDescription": "Can remove half the options to select from in a multiple choice question. Ability can be used: 3",
                    "pricingType": 0,
                    "characterType": 0,
                    "price": null
                }
            },
            "player": {
                "id": 5,
                "username": "[BOT]Penguin-5267",
                "userGlobalIdentifier": null,
                "isBot": true
            }
        },
        {
            "id": 238,
            "inGameParticipantNumber": 3,
            "avatarName": "penguinAvatarViking",
            "playerId": 6,
            "gameId": 123,
            "isAfk": false,
            "score": 1000,
            "finalQuestionScore": 0,
            "gameCharacter": {
                "id": 231,
                "userId": 6,
                "gameInstanceId": 123,
                // @ts-ignore
                "characterAbilities": {
                    "characterType": 2,
                    "gameCharacterId": 231,
                    "vikingCharacterAbilitiesResponse": {
                        "fortifyCapitalUseCount": 0,
                        "abilityUsedInRounds": [],
                        "fortifyCapitalMaxUseCount": 2
                    }
                },
                "character": {
                    "id": 3,
                    "characterGlobalIdentifier": "d591a05f-5a1a-4a81-8f9e-7fdb2558da3d",
                    "name": "Viking",
                    "avatarName": "penguinAvatarViking",
                    "description": "Some description",
                    "abilityDescription": "Can fortify his capital against attacks, increasing the amount of required consecutive wins for the enemy. Amount of times he can fortify his capital",
                    "pricingType": 0,
                    "characterType": 2,
                    "price": null
                }
            },
            "player": {
                "id": 6,
                "username": "[BOT]Penguin-802",
                "userGlobalIdentifier": null,
                "isBot": true
            }
        }
    ],
    "rounds": [
        {
            "id": 329,
            "attackStage": 0,
            "gameInstanceId": 123,
            "gameRoundNumber": 1,
            "neutralRound": {
                "id": 257,
                "roundId": 329,
                "attackOrderNumber": 1,
                "territoryAttackers": [
                    {
                        "id": 769,
                        "attackOrderNumber": 1,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 5,
                        "neutralRoundId": 257,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 770,
                        "attackOrderNumber": 2,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 1,
                        "neutralRoundId": 257,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 771,
                        "attackOrderNumber": 3,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 6,
                        "neutralRoundId": 257,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    }
                ]
            },
            "pvpRound": null
        },
        {
            "id": 330,
            "attackStage": 0,
            "gameInstanceId": 123,
            "gameRoundNumber": 2,
            "neutralRound": {
                "id": 258,
                "roundId": 330,
                "attackOrderNumber": 1,
                "territoryAttackers": [
                    {
                        "id": 772,
                        "attackOrderNumber": 1,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 1,
                        "neutralRoundId": 258,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 773,
                        "attackOrderNumber": 2,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 6,
                        "neutralRoundId": 258,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 774,
                        "attackOrderNumber": 3,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 5,
                        "neutralRoundId": 258,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    }
                ]
            },
            "pvpRound": null
        },
        {
            "id": 331,
            "attackStage": 0,
            "gameInstanceId": 123,
            "gameRoundNumber": 3,
            "neutralRound": {
                "id": 259,
                "roundId": 331,
                "attackOrderNumber": 1,
                "territoryAttackers": [
                    {
                        "id": 775,
                        "attackOrderNumber": 1,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 5,
                        "neutralRoundId": 259,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 776,
                        "attackOrderNumber": 2,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 6,
                        "neutralRoundId": 259,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 777,
                        "attackOrderNumber": 3,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 1,
                        "neutralRoundId": 259,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    }
                ]
            },
            "pvpRound": null
        },
        {
            "id": 332,
            "attackStage": 0,
            "gameInstanceId": 123,
            "gameRoundNumber": 4,
            "neutralRound": {
                "id": 260,
                "roundId": 332,
                "attackOrderNumber": 1,
                "territoryAttackers": [
                    {
                        "id": 778,
                        "attackOrderNumber": 1,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 6,
                        "neutralRoundId": 260,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 779,
                        "attackOrderNumber": 2,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 5,
                        "neutralRoundId": 260,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 780,
                        "attackOrderNumber": 3,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 1,
                        "neutralRoundId": 260,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    }
                ]
            },
            "pvpRound": null
        },
        {
            "id": 333,
            "attackStage": 0,
            "gameInstanceId": 123,
            "gameRoundNumber": 5,
            "neutralRound": {
                "id": 261,
                "roundId": 333,
                "attackOrderNumber": 1,
                "territoryAttackers": [
                    {
                        "id": 781,
                        "attackOrderNumber": 1,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 6,
                        "neutralRoundId": 261,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 782,
                        "attackOrderNumber": 2,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 5,
                        "neutralRoundId": 261,
                        "attackerMChoiceQAnswerId": null,
                        "attackerNumberQAnswer": null,
                        "attackedTerritory": null
                    },
                    {
                        "id": 783,
                        "attackOrderNumber": 3,
                        "attackedTerritoryId": null,
                        "answeredAt": null,
                        "attackerWon": null,
                        "attackerId": 1,
                        "neutralRoundId": 261,
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