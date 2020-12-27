import * as React from 'react';
import { useState, useEffect } from 'react';
import soundWaveImg from "../../img/Sound-Waves-PNG.png"
import Homepage from './homepage'
import Page1 from "./Page1";
import Page2 from "./Page2"
import "./tutorialsPages.css"

interface TutorialwrapperProps {

}

export function Tutorialwrapper(props: TutorialwrapperProps) {
    const Pages: JSX.Element[] = [<Homepage next={next} />, <Page1 next={next}/>, <Page2 next={next}/>]
    const CommonProps = { next: next }
    const [currentPage, setCurrentPage] = useState<JSX.Element>(Pages[0]);

    function next(toRight: boolean) {
        if (toRight === true) {
            const currentIndex = Pages.indexOf(currentPage);
            setCurrentPage({...Pages[currentIndex + 1],props:CommonProps})
            
        }
    }
    return (
        <div className="tutorialText">
            {currentPage}

        </div>
    )
}
