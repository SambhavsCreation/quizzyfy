// React imports
import React from 'react'

//Project imports
import Menu from './Menu'
import Quiz from './Quiz'

// CSS imports (loading through webpacks)
import './style.css'
import './menu.css'

export default function App()
{
    function switchMenuState()
    {
        setMenu(x => {return !x})
    }

    const [menu, setMenu] = React.useState(true)
    return (
        <div>
            <img src={require("./assets/blob 5.png")} alt="null" className="blob-1"/>
            <img src={require("./assets/blob 6.png")} alt="null" className="blob-2"/>
            {menu ? (<Menu menuChangeFunction={switchMenuState}></Menu>) : (<Quiz></Quiz>)}
        </div>
    )
}