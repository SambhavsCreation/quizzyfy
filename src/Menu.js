import React from 'react'

export default function Menu(props)
{
    return (
        <div className="main-menu">
            <h2 className="main-menu-heading">
                Quizzical
            </h2>
            <p className="main-menu-info">
                Test your knowledge on general subjects! Get started below
            </p>
            <button className="main-menu-button" onClick={props.menuChangeFunction}>
                <p className="main-menu-button-text">Start</p>
            </button>
        </div>
    )
}