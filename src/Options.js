import React from 'react'

export default function Options(props)
{
    const styles = {backgroundColor: props.isSelected ? '#D6DBF5' : 'transparent' }
    return (
        <button className="question-option" onClick={props.clicked} style={styles}><p className="question-option-data">{props.optionText}</p></button>
    )
}