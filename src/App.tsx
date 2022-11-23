import React, { useState } from 'react';
import './App.css';
import Game from './components/Game';
import Register from './components/Register';
// step menu: HOME || MENU || GAME || REGISTER



function App() {
  const [step, setStep] = useState('REGISTER');
  const changeStep = (newStep: string) => {
    setStep(newStep)
  }
  return (
    <>
      {step == 'GAME' && <Game />}
      {step == 'REGISTER' && <Register submit={() => changeStep('GAME')} />}
    </>
  );
}

export default App;
