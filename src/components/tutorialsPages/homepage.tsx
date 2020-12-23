import React from 'react'

interface HomepageProps {
}

export function Homepage(props: HomepageProps) {


    return (
        <div className="homepageWrapper">
            <div className="titleWrapper">
                <div className="title">
                    Javascript Oscillators
                </div>
                <p>A crash course for an in depth comprehesion of what are JavaScript Oscillators and how to use them properly</p>
            </div>
            <div className="OscillatorImg">

            </div>
            <div className="startButton"> Get Started </div>

        </div>
    )
}
