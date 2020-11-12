import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import WaveGraph from './components/WaveGraph';
import "./components/component.css";



function App() {
  const [waveLength, setwaveLength] = useState<number>(1);
  const [amplitude, setamplitude] = useState<number>(30);

  (window as any).setwaveLength = setwaveLength;
  (window as any).setamplitude = setamplitude;

  return (
    <div className="App">
      <WaveGraph
        amplitude={amplitude}
        waveLength={waveLength}
      />
    </div>
  );
}

export default App;
