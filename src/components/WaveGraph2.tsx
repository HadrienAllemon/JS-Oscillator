import * as React from 'react';
import { useState, useEffect } from 'react';

export interface WaveGraphProps {
    wavelength: number;
    amplitude: number;
}

const WaveGraph2: React.FunctionComponent<WaveGraphProps> = (props: WaveGraphProps) => {

    const [CtxWave, setCtxWave] = useState<CanvasRenderingContext2D>();
    const [CtxGraph, setCtxGraph] = useState<CanvasRenderingContext2D>();
    const [Waves,setWaves] = useState<SinWave[]>([]);

    let YOffset = 0;

    const animationFrame = (w:any) => {
        if (!CtxWave) throw new Error("Error in WaveGraph : this Ctx was not properly extracted from the canvas")
        const drawCircleAt = (x: any, y: any, color = "black") => { CtxWave.beginPath(); CtxWave.arc(x, y, 2 * Math.PI, 0, 359); CtxWave.strokeStyle = color; CtxWave.stroke(); CtxWave.strokeStyle = "black"; CtxWave.closePath() }

        CtxWave.clearRect(0, 0, CtxWave.canvas.width, CtxWave.canvas.height);
        w.forEach((wave:any)=>wave.draw());
        requestAnimationFrame(()=>animationFrame(w) );

        // ----- TEST ----
        //  Uncomment these line to visualise beziers points
        // drawCircleAt(0.3642 * props.wavelength,
        //     CtxWave.canvas.height / 2,
        //     "black")

        // drawCircleAt(0.6358 * props.wavelength,
        //     CtxWave.canvas.height / 2 - props.amplitude,
        //     "red")


        // drawCircleAt(props.wavelength,
        //     CtxWave.canvas.height / 2 - props.amplitude,
        //     "green")


        // drawCircleAt((2 - .6358)  * props.wavelength,
        //     CtxWave.canvas.height/2 - props.amplitude ,
        //     "green");

        // drawCircleAt((2 - .3642) * props.wavelength,
        // CtxWave.canvas.height /2,
        //     "red")

        // drawCircleAt(2 * props.wavelength,
        //     CtxWave.canvas.height /2,
        //     "black")
        // ---- Test END ----- 

    }

    useEffect(() => {
        if (CtxWave) {
            YOffset = (CtxWave.canvas.height + props.amplitude )/ 2;
            CtxWave.moveTo(0,YOffset);

            let waves = [];
            for (let i = 0; i < Math.ceil(CtxWave.canvas.width / props.wavelength) +1; i++) {
                let wave = new SinWave(i * props.wavelength, YOffset, props.wavelength, props.amplitude, CtxWave);
                waves.push(wave);
            }
            setWaves(waves);
            animationFrame(waves)
            

        }
    }, [props,CtxWave]);

    useEffect(() => {
        if (CtxGraph) {
            YOffset = (CtxGraph.canvas.height )/ 2;
            CtxGraph.beginPath();
            CtxGraph.moveTo(50, 0);
            CtxGraph.lineTo(50,CtxGraph.canvas.height);
            CtxGraph.moveTo(0, YOffset);
            CtxGraph.lineTo(CtxGraph.canvas.width,YOffset);
            CtxGraph.stroke();
        }
    }, [CtxGraph]);

    return (
        <div className={"canvasWrapper"}>
            <canvas
                height="300"
                width="500"
                ref={(ref) => {
                    const ctx = ref?.getContext("2d");
                    if (!ctx) return null;
                    setCtxWave(ctx);

                }}
            />
            <canvas
                height="300"
                width="500"
                ref={(ref) => {
                    const ctx = ref?.getContext("2d");
                    if (!ctx) return null;
                    setCtxGraph(ctx);

                }}
            />
        </div>
    );
}

class SinWave {
    x0: number; y0: number; wavelength: number; amplitude: number;ctx:CanvasRenderingContext2D;
    constructor(x: number, y: number, wavelength: number, amplitude: number, context:CanvasRenderingContext2D) {
        this.x0 = x;
        this.y0 = y;
        this.wavelength = wavelength;
        this.amplitude = amplitude;
        this.ctx = context;
    }
    draw() {
        // 1. Bezier Points
        // To create a sin curve from a bezier we do as following: 
        // We have to create two curve in order to make a wave.
        // For the ascending half of the curve of wavelength 2 and amplitude 1 : 
        // - The start point of the curve is in [0,0]
        // - The last point of the curve is in [ wavelength / 2 ,amplitude]
        // - The first bezier point in in [0,0.3642]
        // - The second bezier point is in [0.6358, -amplitude]
        this.ctx.beginPath()

        // we start to draw the line where it was instructed. X0 and Y0 will be our starting point. Effectively, our [0,0]
        this.ctx.moveTo(this.x0, this.y0);
        this.ctx.bezierCurveTo(
            this.x0 + 0.3642 * this.wavelength / 2,
            this.y0,

            this.x0 + 0.6358 * this.wavelength / 2,
            this.y0 - this.amplitude,

            this.x0 + this.wavelength / 2,
            this.y0 - this.amplitude
        );

        // For the ascending half of the curve of wavelength 2 and amplitude 1 : 
        // - The start point of the curve is in [wavelength/2 ,amplitude]
        // - The last point of the curve is in [ wavelength ,0]
        // - The first bezier point in in [0,0.3642]
        // - The second bezier point is in [0.6358, -amplitude]


        // Descendin curbe
        this.ctx.bezierCurveTo(
            this.x0 + (2 - .6358) * this.wavelength / 2,
            this.y0 - this.amplitude,

            this.x0 + (2 - .3642) * this.wavelength / 2,
            this.y0,

            this.x0 + this.wavelength,
            this.y0);

        this.ctx.stroke();
        this.ctx.closePath();
        this.x0 = this.x0 - 1;

        // We then check to see if the whole curve is out of view. 
        // If this is the case the wave is moved to be the last wave if the graph
        if (this.x0 < - this.wavelength ) this.moveToEndOfLine();
    }
    moveToEndOfLine(){
        this.x0 = Math.ceil(this.ctx.canvas.width / this.wavelength) * this.wavelength 
    }
}
export default WaveGraph2







