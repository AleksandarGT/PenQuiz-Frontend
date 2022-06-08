import { QuestionsTemplateMode, TableQuestionsTemplate } from "./BaseComponents/TableQuestionsTemplate";
import React from 'react'

export default function VerifyQuestionComponent() {
    return (
        <TableQuestionsTemplate mode={QuestionsTemplateMode.VERIFY} />
    )
}