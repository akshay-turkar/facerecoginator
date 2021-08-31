import React from 'react'
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import brain from './brain.png'

function Logo() {
    return (
        <div className = "ma4 mt0">
            <Tilt className = "tilt shadow-2">
                <div className = "tilt-inner">
                    <img src={brain} alt="logo" height = "100px" width = "100px" />
                </div>
            </Tilt>
        </div>
    )
}

export default Logo
