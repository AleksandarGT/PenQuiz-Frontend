import { QuestionsTemplateMode, TableQuestionsTemplate } from "./BaseComponents/TableQuestionsTemplate";
import React from 'react'

export default function ViewQuestionComponent() {
    return (
        <TableQuestionsTemplate mode={QuestionsTemplateMode.VIEW} />
    )
}