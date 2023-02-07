import React from "react"
import logo from "./images/RunesIcon.png"

function Navbar() {
    return (
        <nav className="navbar">
            <h2 className="navbar__header">LolFinder</h2>
            <img src={logo} alt="rune"/>
        </nav>
    )
}

export default Navbar