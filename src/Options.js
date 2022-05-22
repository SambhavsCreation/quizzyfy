import React from 'react'

export default function Options(props)
{

    return (
        <button className="question-option" onClick={props.clicked} style={props.optionProps.style}><p className="question-option-data">{props.optionText}</p></button>
    )
}