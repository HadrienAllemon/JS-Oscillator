import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import WaveGraph2 from './components/WaveGraph2';
import "./components/component.css";



function App() {
  const [waveLength, setwaveLength] = useState<number>(100);
  const [amplitude, setamplitude] = useState<number>(30);

  (window as any).setwaveLength = setwaveLength;
  (window as any).setamplitude = setamplitude;

  return (
    <div className="App">
      <WaveGraph2
        amplitude={amplitude}
        wavelength={waveLength}
      />
    </div>
  );
}

export default App;
