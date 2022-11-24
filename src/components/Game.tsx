import React from 'react';
import { useState } from 'react';
import Draggable from 'react-draggable';
function Game({ gotoMenu, gotoGame }: any) {
    // const [showAnimation, setShowAnimation] = useState(false);
    // Step: START || ANIMATION || WIN || LOSE
    const [step, setStep] = useState('START');
    const setWinLose = () => {
        let currentCount = Number(localStorage.getItem('count')) || 0;
        if (currentCount % 2 == 0) {
            setStep('WIN');
        } else {
            setStep('LOSE');
        }
        currentCount += 1;
        localStorage.setItem('count', currentCount.toString());
    }
    const onDrag = (e: any, dragElement: any) => {
        const y = dragElement.y
        if (dragElement.y > 120) {
            setStep('ANIMATION');
            setTimeout(() => {
                setWinLose()
            }, 2000);
        }
    }
    return (
        <div className="row-bg">

            <img alt="background" src="./images/background.png" />

            <div className="content-before" >
                {step == 'START' && <div className="game-cracked-group">
                    <img className="handle" draggable="false" id="cracker" alt="cracked-top" src="./images/game/cracked-top.png" />
                    <Draggable
                        axis="y"
                        handle=".handle"
                        defaultPosition={{ x: 0, y: -40 }}
                        grid={[5, 5]}
                        scale={1}
                        onDrag={onDrag}
                    >
                        <img className="handle" draggable="false" id="cracker" alt="cracked-bot" src="./images/game/cracked-bot.png" />

                    </Draggable>
                    <img id="mechanism" alt="mechanism" src="./images/game/mechanism.png" />
                </div>}
                <div className={step == 'ANIMATION' ? '' : 'hidden'}>
                    <img id="cracked-click" alt="cracked-click" src="./images/game/cracked-click.png" />
                    <img id="explosion2" alt="explosion2" src="./images/game/explosion2.png" />
                    <img id="sun" alt="ray" src="./images/game/ray.png" />
                    <img id="explosion" alt="explosion" src="./images/game/explosion.png" />
                    <img id="mechanism" alt="mechanism" src="./images/game/mechanism.png" />
                </div>
            </div>

            {step == 'WIN' && <div className="content-win win-coctail">
                <img id="text1" alt="text1" src="./images/win/text1.png" />
                <div className="enter-code">
                    <img id="unique" alt="unique" src="./images/win/unique.png" />
                    <input placeholder="Unique code here" />
                </div>
                <img id="text2" alt="text2" src="./images/win/text2.png" />
                <img id="hendrick" alt="hendrick" src="./images/win/hendrick.png" />
                <div className="icon-win">
                    <img className="ic1" alt="ic1" src="./images/win/ic1.png" />
                    <img className="ic2" alt="ic2" src="./images/win/ic2.png" />
                    <img className="ic3" alt="ic3" src="./images/win/ic3.png" />
                    <img className="ic4" alt="ic4" src="./images/win/ic4.png" />
                    <img className="ic5" alt="ic5" src="./images/win/ic5.png" />
                </div>
            </div>}

            {step == 'LOSE' && <div className="content-lose">
                <img id="title" alt="title" src="./images/lose/title.png" />
                <p className="follow">Follow us at @handricksginsea<br />for more fetive goodness!</p>
                <a className="link-right">
                    <img id="right" alt="right" src="./images/lose/right.png" />
                </a>

                <img id="put" alt="put" src="./images/lose/put.png" />
            </div>
            }
        </div>
    );
}

export default Game;
