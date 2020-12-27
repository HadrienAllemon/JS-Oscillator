import React from 'react'

interface HomepageProps {
    next:(toRight:boolean)=>void
}

const Homepage = (props: HomepageProps) => {


    return (
        <div className="homepage">
            <div className="homepageWrapper">
                <div className="titleWrapper">
                    <div className="title">
                        Javascript Oscillators
                </div>
                    <p className="introduction">A crash course for an in depth comprehesion of what are JavaScript Oscillators and how to use them properly</p>
                    <div className="AbsoluteWaveImg" />
                </div>
                <div className="OscillatorImg" />

                <div className="startButton" onClick={()=>props.next(true)}> Get Started </div>
            </div>
        </div>
    )
}

export default Homepage
