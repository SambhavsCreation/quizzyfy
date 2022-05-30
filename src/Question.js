import React from 'react'
import Options from "./Options";
import {nanoid} from 'nanoid'
import './question.css'

export default function Question(props)
{
    let optionElements = props.props.options.map(x => {
        return (
            <Options optionText={x.optionText} key={nanoid()} updateSelected={() => props.updateSelected(x.childID, props.props.id)} isGameOver={props.isGameOver} isCorrect={x.isCorrect} isSelected={x.isSelected}></Options>
        )
    })

    return (
        <div className="question-container">
            <h2 className="question-title">{props.props.question}
            </h2>
            {optionElements}
        </div>
    )
}
