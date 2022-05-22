import React from 'react'

export default function EndGame(props)
{
    return (
        <center>
            <p>You scored {props.score}/5 correct answers</p>
            <button onClick={props.restart} className="submit-button"><p className="submit-button-text">Play Again</p></button>
        </center>
    )
}