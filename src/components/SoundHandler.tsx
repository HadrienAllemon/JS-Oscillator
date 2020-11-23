import * as React from 'react';
import { useState, useEffect } from 'react';

export interface SoundHandlerProps {
    wavelength: number;
    amplitude: number;
    hertz: number;
}

const SoundHandler = (props: SoundHandlerProps) => {
    //ctx
    var audioCtx = new (window.AudioContext)();

    // create Oscillator node
    var oscillator = audioCtx.createOscillator();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(5, 440); // values in hertz
    oscillator.connect(audioCtx.destination);
    oscillator.start();
}

