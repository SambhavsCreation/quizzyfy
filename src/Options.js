import React from 'react'

export default function Options(props)
{
    let style = {backgroundColor: 'transparent'}
    if (props.isGameOver)
    {
        if (props.isSelected && props.isCorrect)
        {
            style = {backgroundColor: '#94D7A2'}
        }
        else if (props.isSelected && !props.isCorrect)
        {
            style = {backgroundColor: '#F8BCBC'}
        }
    }
    else
    {
        if (props.isSelected)
        {
            style = {backgroundColor: '#D6DBF5'}
        }
    }
    return (
        <button className="question-option" onClick={props.updateSelected} style={style}><p className="question-option-data">{props.optionText}</p></button>
    )
}