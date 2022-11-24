import React, { useEffect, useState } from 'react';
import './App.css';
import Game from './components/Game';
import Register from './components/Register';
const imgs = [
  './images/game/cracked-bot.png',
  './images/game/mechanism.png',
  "./images/game/cracked-top.png",
  "./images/game/mechanism.png",
  "./images/game/cracked-click.png",
  "./images/game/explosion2.png",
  "./images/game/ray.png",
  "./images/game/explosion.png",
  "./images/game/mechanism.png",
  "./images/win/text1.png",
  "./images/win/unique.png",
  "./images/win/text2.png",
  "./images/win/hendrick.png",
  "./images/win/ic1.png",
  "./images/win/ic2.png",
  "./images/win/ic3.png",
  "./images/win/ic4.png",
  "./images/win/ic5.png",
  "./images/lose/title.png",
  "./images/lose/right.png",
  "./images/lose/put.png"

]
function App() {
  const [step, setStep] = useState('REGISTER');
  const changeStep = (newStep: string) => {
    setStep(newStep)
  }
  const cacheImages = () => {
    imgs.map(x => {
      const image = new Image();
      image.src = x;
    })

  }
  useEffect(() => {
    cacheImages()
  }, [])
  return (
    <>
      {step == 'GAME' && <Game />}
      {step == 'REGISTER' && <Register submit={() => changeStep('GAME')} />}
    </>
  );
}

export default App;
