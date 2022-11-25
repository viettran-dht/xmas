import React, { useEffect, useState } from 'react';
import './App.css';
import Game from './components/Game';
import Register from './components/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { drawAPI, submitAPI } from './api';
import OhDear from './components/OhDear';
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
  "./images/lose/put.png",
  "./images/win/redeemed.png"

]
function App() {
  const [step, setStep] = useState('BEFORE_START');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
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
    setTimeout(() => {
      setStep('REGISTER')
    }, 3000);
  }, [])
  const onRegister = async (values: any) => {
    try {
      if (loading) return
      setLoading(true);
      console.log('values', values);
      const newUser = await submitAPI(values)
      const { played, player, status } = newUser
      if (played) {
        changeStep('OH_DEAR')
        return
      }
      const result = await drawAPI(player);
      setResult({ ...result, played })
      setLoading(false)
      changeStep('GAME')
    } catch (error) {
      setLoading(false)
    }

  }
  const closeIframe = () => {
    console.log('close popup');
    window.parent.postMessage("closePopup", "*")
  }
  return (
    <>
      <img onClick={closeIframe} className="close-icon" src="./images/close.svg" alt="" />
      {step == 'GAME' && <Game result={result} />}
      {step == 'REGISTER' && <Register onRegister={onRegister} />}
      {step == 'OH_DEAR' && <OhDear closeIframe={closeIframe} />}
      <ToastContainer />
      {step == 'BEFORE_START' && <div className="row-bg">
        <img src="./images/before-start.gif" />
      </div>}
    </>
  );
}

export default App;
