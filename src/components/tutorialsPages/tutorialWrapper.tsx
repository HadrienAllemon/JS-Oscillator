import React from 'react'
import soundWaveImg from "../../img/Sound-Waves-PNG.png"
import { Homepage } from './homepage'
import "./tutorialsPages.css"

interface TutorialwrapperProps {

}

export function Tutorialwrapper(props: TutorialwrapperProps) {


    return (
        <div className="tutorialText">
            <Homepage/>
            
        </div>
    )
}
