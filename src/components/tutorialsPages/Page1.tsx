// -- WHAT ARE OSCILLATORS --
import React from 'react';
import OscillatorGif from "../../img/Oscillator.gif"

export interface Page1Props {
    next: (toRight: boolean) => void
}

const Page1: React.FC<Page1Props> = () => {
    return (
        <div className="pageWrapper pageTransition page1">
            <div className="AbsoluteWaveImg" />

            <div className="pageTitle">What Are Oscillators</div>
            <div className="textBox">
                <p>An oscillator, in electronic, is a circuit that produces a continuous oscillating signal. It can be used to measure time, to generate signal or , in the case that interests us today, emit sound
                An oscillator is what you hear when you press the button on a phone, when you open a wish card or when you plug in your old atari and enjoy the sweet chiptune soundtrack of your favorite game
                </p>
                <img src={OscillatorGif} height="320"></img>
                <p>Oscillators come in many forms, but they all operate similarly: an oscillator a capacitor and a coil whose current makes a loop. 
                Thus, the signal regenerates and sustains itself. This is known as positive feedback. This process allows the circuit to oscillate quickly between two states, which
                generates a waveform. Just like a string vibrating on a guitar, and oscillator waveform can be amplified via an amplifier and used to create a soundwave <p />
                </p>
            </div>
        </div>
    );
}

export default Page1;
