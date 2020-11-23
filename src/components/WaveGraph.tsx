import { off } from 'process';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { start } from 'repl';

export interface WaveGraphProps {
    waveLength: number;
    amplitude: number;
}

const WaveGraph: React.FunctionComponent<WaveGraphProps> = (props: WaveGraphProps) => {
    const [CtxWave, setCtxWave] = useState<CanvasRenderingContext2D>();

    // Offsets
    let YOffset = 0;
    let XOffset = 0;
    let nexFrameTO: number = 0; // Timeout Variable
    const { waveLength, amplitude } = props;


    const animationFrame = () => {
        if (!CtxWave) return
        const drawCircleAt = (x: any, y: any, color="black") => {CtxWave.beginPath(); CtxWave.arc(x, y, 2 * Math.PI, 0, 359); CtxWave.strokeStyle=color;CtxWave.stroke(); CtxWave.strokeStyle="black";CtxWave.closePath()}


        CtxWave.clearRect(0, 0, CtxWave.canvas.width, CtxWave.canvas.height);
        CtxWave.beginPath();
        CtxWave.moveTo(0, YOffset);

        const nbrOfWaves = Math.ceil(CtxWave.canvas.width / (waveLength * 200)) * 2;

        for (let i = 0; i < nbrOfWaves; i++) {
            let offset = (i * 200) * waveLength + XOffset;
            // if (offset < 0) offset = CtxWave.canvas.width - offset;
            CtxWave.beginPath();
            let startpoint = 200 * i * waveLength + XOffset
            let finishPoint = 200 * waveLength + offset

            

            if (finishPoint < 0) {
                startpoint = nbrOfWaves * waveLength * 200 + startpoint ;
                offset = CtxWave.canvas.width + offset + waveLength * 100 * nbrOfWaves +100;
                finishPoint = CtxWave.canvas.width + finishPoint + waveLength * 100 * nbrOfWaves;
            }

            drawCircleAt(startpoint,YOffset, "red");
            drawCircleAt(offset,YOffset, "violet");
            drawCircleAt(finishPoint,YOffset, "skyblue");

            // if (startpoint < 0) startpoint = CtxWave.canvas.width - startpoint;
            CtxWave.moveTo(startpoint, YOffset);

            // Ascending curve
            CtxWave.bezierCurveTo(
                36 * waveLength + offset,
                YOffset,

                66 * waveLength + offset,
                YOffset - amplitude,

                100 * waveLength + offset,
                YOffset - amplitude
            );
            CtxWave.stroke();

            // Descendin curbe
            CtxWave.bezierCurveTo(
                134 * waveLength + offset,
                YOffset - amplitude,

                166 * waveLength + offset,
                YOffset,

                200 * waveLength + offset,
                YOffset);
            CtxWave.stroke();
            CtxWave.closePath();
        }



        CtxWave.closePath();
        clearTimeout(nexFrameTO);
        nexFrameTO = requestAnimationFrame(() => animationFrame());
        XOffset = (XOffset - 1.5) % (200 * waveLength * nbrOfWaves);

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
                width="500"
                ref={(ref) => {
                    const ctx = ref?.getContext("2d");
                    if (!ctx) return null;
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