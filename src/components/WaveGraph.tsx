import * as React from 'react';
import { useState, useEffect } from 'react';

export interface WaveGraphProps {
    waveLength: number;
    amplitude: number;
}

const WaveGraph: React.FunctionComponent<WaveGraphProps> = (props: WaveGraphProps) => {
    const [CtxWave, setCtxWave] = useState<CanvasRenderingContext2D>()

    // Offsets
    let YOffset = 0;
    let XOffset = 0;
    let nexFrameTO: number = 0; // Timeout Variable
    const { waveLength, amplitude } = props
    const bezier1Offset = 36.42;
    const bezier2Offset = 65.35;

    const animationFrame = () => {
        if (!CtxWave) return
        const drawCircleAt = (x: any, y: any) => { CtxWave.beginPath(); CtxWave.arc(x, y, 2 * Math.PI, 0, 359); CtxWave.stroke() }


        CtxWave.clearRect(0, 0, CtxWave.canvas.width, CtxWave.canvas.height);
        CtxWave.beginPath();
        CtxWave.moveTo(0, YOffset);

        // CtxWave.bezierCurveTo(36 * waveLength, YOffset, 66 * waveLength, YOffset - amplitude, 100 * waveLength, YOffset - amplitude);
        CtxWave.stroke();
        // CtxWave.bezierCurveTo(134 * waveLength, YOffset - amplitude, 166 * waveLength, YOffset, 200 * waveLength, YOffset);
        CtxWave.stroke();

        CtxWave.closePath();

        drawCircleAt(0, YOffset)
        drawCircleAt(36 * waveLength, YOffset)
        drawCircleAt(64 * waveLength, YOffset - amplitude)
        drawCircleAt(100 * waveLength, YOffset - amplitude)
        console.log(Math.ceil(CtxWave.canvas.width / 200));

        for (let i = 0; i < Math.ceil(CtxWave.canvas.width / 200 * waveLength); i++) {
            let offset = (i * 200) * waveLength
            CtxWave.beginPath();
            CtxWave.moveTo(200 * i * waveLength, YOffset);
            CtxWave.bezierCurveTo(36 * waveLength + offset, YOffset, 66 * waveLength + offset, YOffset - amplitude, 100 * waveLength + offset, YOffset - amplitude);
            CtxWave.stroke();
            CtxWave.bezierCurveTo(134 * waveLength + offset, YOffset - amplitude, 166 * waveLength + offset, YOffset, 200 * waveLength + offset, YOffset);
            CtxWave.stroke();
            CtxWave.closePath();
        }



        CtxWave.closePath();
        clearTimeout(nexFrameTO);
        nexFrameTO = requestAnimationFrame(() => animationFrame());
        // nexFrameTO = window.setTimeout(() => amplitude)
        XOffset += 2;

    }

    useEffect(() => {
        if (CtxWave) {
            clearTimeout(nexFrameTO);
            cancelAnimationFrame(nexFrameTO);
            YOffset = CtxWave.canvas.height / 2;
            // CtxWave.lineWidth = 10;
            // CtxWave.lineCap = "round";
            CtxWave.moveTo(10, YOffset);
            animationFrame();
        }
    }, [CtxWave, props]);


    return (
        <div className={"canvasWrapper"}>
            <canvas
                height="360"
                width="5000"
                ref={(ref) => {
                    const ctx = ref?.getContext("2d");
                    if (!ctx) return null;
                    ctx.canvas.width = 360;
                    ctx.canvas.height = 500
                    setCtxWave(ctx);
                    (window as any).ctx = ctx;
                }}
            />
            {/* <canvas
                height="500"
                width="1000"
            /> */}
        </div>
    );
}

export default WaveGraph;