import React, { useEffect } from 'react';
import { useState } from 'react';
import Draggable from 'react-draggable';
import { redeemAPI } from '../api';
import { ToastContainer, toast } from 'react-toastify';
function Game({ result }: any) {
    // const [showAnimation, setShowAnimation] = useState(false);
    // Step: START || ANIMATION || WIN || LOSE
    const [step, setStep] = useState('WIN');
    const [showRedeemed, setShowRedeemed] = useState(false)
    const [coupon, setCoupon] = useState('')
    const [loading, setLoading] = useState(false);
    const [hideLossGif, setHideLossGif] = useState(false);
    useEffect(() => {

        // const body = document.getElementsByTagName('body');
        // body[0].style.overflow = 'hidden'
    }, [])
    const setWinLose = () => {
        const body = document.getElementsByTagName('body');
        body[0].style.overflow = 'unset'
        if (result?.status == 'win') {
            setStep('WIN');
        } else {
            setStep('LOSE');
            setTimeout(() => {
                setHideLossGif(true)
            }, 4000);
        }
    }
    const onDrag = (e: any, dragElement: any) => {
        const y = dragElement.y
        if (dragElement.y > 20) {
            setStep('ANIMATION');
            if (result?.status == 'win') {
                setTimeout(() => {
                    setWinLose()
                }, 2000);
            } else {
                setWinLose()
            }

        }
    }
    const closePopup = () => {
        window.parent.postMessage("closePopup", "*")
    }

    const checkCoupon = async (value: string) => {
        try {
            if (loading) return
            setLoading(true);
            await redeemAPI(result.player, value)
            setShowRedeemed(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("Coupon is invalid");
        }

    }
    return (
        <div className="row-bg row-win">
            <img className={`${step == 'WIN' ? 'opacity-0' : ''}`} src="./images/game/bg-unbox.jpg" />
            <div className={`content-before ${step == 'WIN' || step == 'LOSE' ? 'hidden' : ''}`} >
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
                        bounds={
                            {
                                top: -40
                            }
                        }
                    >
                        <img className="handle" draggable="false" id="cracker" src="./images/game/cracked-bot.png" />
                    </Draggable>
                </div>}
                <div className={step == 'ANIMATION' ? '' : 'hidden'}>
                    {result.couponType == 'sock' ? <img src="./images/sock.gif" /> : <img src="./images/drink.gif" />}
                    {/* <img id="cracked-click" src="./images/game/cracked-click.png" />
                    <img id="explosion2" src="./images/game/explosion2.png" />
                    <img id="sun" src="./images/game/ray.png" />
                    <img id="explosion" src="./images/game/explosion.png" />
                    <img id="mechanism" src="./images/game/mechanism.png" /> */}
                </div>
            </div>
            {step == 'WIN' && showRedeemed && <div className="redeemed-backdrop">
                <img id="redeemed" onClick={() => closePopup()} alt="redeemed" src="./images/win/redeemed.png" />
            </div>}
            {step == 'WIN' && <div className="content-win win-coctail">
                <img className='bg-only-win' src="./images/background3.png" />
                {/* <img id="cocktail" className="img-gif" src="./images/game/boom.gif" /> */}
                {result.couponType == 'sock' ? <img id="text1" src="./images/win/text1socks.png" /> : <img id="text1" src="./images/win/text1.png" />}

                <div className="enter-code">
                    <img id="unique" src="./images/win/unique.png" />
                    <input
                        type="tel"
                        value={coupon}
                        onChange={(e) => {
                            console.log(e);
                            const nativeEvent: any = e.nativeEvent;
                            if (coupon.length >= 5 && nativeEvent.data) return
                            setCoupon(e.target.value)
                            if (e.target.value.length == 5) {
                                checkCoupon(e.target.value)
                            }
                        }}

                        placeholder="Unique code here" />
                </div>
                <img id="text2" src="./images/win/text2.png" />
                <div className="icon-win">
                    <img className="ic1" src="./images/win/ic1.png" />
                    <img className="ic2" src="./images/win/ic2.png" />
                    <img className="ic3" src="./images/win/ic3.png" />
                    <img className="ic4" src="./images/win/ic4.png" />
                    <img className="ic5" src="./images/win/ic5.png" />
                </div>
                <img className='win-bot is-mobile' src="./images/win/win-bot.jpg" />


            </div>}
            {/* <div className="content-win win-socks" hidden>
                <img className='bg-only-win is-desktop' src="./images/background3.png" />
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
                <div className='win-bot is-mobile'>
                    <img className='win-bot-img' src="./images/win/win-top.jpg" />
                    <img className='win-bot-img' src="./images/win/win-bot.jpg" />
                </div>
            </div> */}

            {step == 'LOSE' && <div className="content-lose">
                {!hideLossGif && <img src="./images/lose.gif" />}
                <img id="title" src="./images/lose/title.png" />
                <p className="follow">Follow us <a href='https://www.instagram.com/hendricksginsea' target="_blank">@hendricksginsea</a><br />for more festive goodness!</p>
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
