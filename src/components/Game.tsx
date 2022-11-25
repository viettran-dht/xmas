import React, { useEffect } from 'react';
import { useState } from 'react';
import Draggable from 'react-draggable';
import { redeemAPI } from '../api';
import { ToastContainer, toast } from 'react-toastify';
function Game({ result }: any) {
    // const [showAnimation, setShowAnimation] = useState(false);
    // Step: START || ANIMATION || WIN || LOSE
    const [step, setStep] = useState('START');
    const [showRedeemed, setShowRedeemed] = useState(false)
    const [coupon, setCoupon] = useState('')
    const [loading, setLoading] = useState(false);
    console.log(result.couponType);

    const setWinLose = () => {
        if (result?.status == 'win') {
            setStep('WIN');
        } else {
            setStep('LOSE');
        }
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
    const closePopup = () => {
        console.log('close popup');
        window.parent.postMessage("closePopup", "*")
    }

    const checkCoupon = async () => {
        try {
            if (loading) return
            setLoading(true);
            await redeemAPI(result.player, coupon)
            setShowRedeemed(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("Coupon is invalid");
        }

    }
    return (
        <div className="row-bg">

            <img src="./images/background.png" />

            <div className="content-before" >
                {step == 'START' && <div className="game-cracked-group">
                    <img className="handle" draggable="false" id="cracker" src="./images/game/cracked-top.png" />
                    <img id="mechanism" src="./images/game/mechanism.png" />
                    <Draggable
                        axis="y"
                        handle=".handle"
                        defaultPosition={{ x: 0, y: -40 }}
                        grid={[5, 5]}
                        scale={1}
                        onDrag={onDrag}
                    >
                        <img className="handle" draggable="false" id="cracker" src="./images/game/cracked-bot.png" />
                    </Draggable>
                </div>}
                <div className={step == 'ANIMATION' ? '' : 'hidden'}>
                    <img id="cracked-click" src="./images/game/cracked-click.png" />
                    <img id="explosion2" src="./images/game/explosion2.png" />
                    <img id="sun" src="./images/game/ray.png" />
                    <img id="explosion" src="./images/game/explosion.png" />
                    <img id="mechanism" src="./images/game/mechanism.png" />
                </div>
            </div>

            {step == 'WIN' && <div className="content-win win-coctail">
                <img id="cocktail" className="img-gif" src="./images/game/boom.gif" />
                {result.couponType == 'sock' ? <img id="text1" src="./images/win/text1socks.png" /> : <img id="text1" src="./images/win/text1.png" />}

                <div className="enter-code">
                    <img id="unique" src="./images/win/unique.png" />
                    <input
                        type="number"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.keyCode == 13) {
                                checkCoupon()
                            }
                        }}
                        placeholder="Unique code here" />
                </div>
                <img id="text2" src="./images/win/text2.png" />
                <img id="hendrick" src="./images/win/hendrick.png" />
                <div className="icon-win">
                    <img className="ic1" src="./images/win/ic1.png" />
                    <img className="ic2" src="./images/win/ic2.png" />
                    <img className="ic3" src="./images/win/ic3.png" />
                    <img className="ic4" src="./images/win/ic4.png" />
                    <img className="ic5" src="./images/win/ic5.png" />
                </div>
                {showRedeemed && <div className="redeemed-backdrop">
                    <img id="redeemed" onClick={() => closePopup()} alt="redeemed" src="./images/win/redeemed.png" />
                </div>}

            </div>}
            <div className="content-win win-socks" hidden>
                <img id="cocktail" className="img-gif" src="./images/game/boom.gif" />
                <img id="text1" src="./images/win/text1socks.png" />
                <div className="enter-code">
                    <img id="unique" src="./images/win/unique.png" />
                    <input placeholder="Unique code here" />
                </div>
                <img id="text2" src="./images/win/text2.png" />
                <img id="hendrick" src="./images/win/hendrick.png" />
                <div className="icon-win">
                    <img className="ic1" src="./images/win/ic1.png" />
                    <img className="ic2" src="./images/win/ic2.png" />
                    <img className="ic3" src="./images/win/ic3.png" />
                    <img className="ic4" src="./images/win/ic4.png" />
                    <img className="ic5" src="./images/win/ic5.png" />
                </div>
            </div>

            {step == 'LOSE' && <div className="content-lose">
                <img id="title" src="./images/lose/title.png" />
                <p className="follow">Follow us @hendricksginsea<br />for more festive goodness!</p>
                <a className="link-right">
                    <img id="right" onClick={() => closePopup()} src="./images/lose/right.png" />
                </a>
                <img id="put" src="./images/lose/put.png" />
            </div>
            }
        </div>
    );
}

export default Game;
