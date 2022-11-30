import React, { useEffect } from 'react';
import { useState } from 'react';
import Draggable from 'react-draggable';
import { redeemAPI } from '../api';
import { ToastContainer, toast } from 'react-toastify';
function Game({ result, openMenu }: any) {
    // const [showAnimation, setShowAnimation] = useState(false);
    // Step: START || ANIMATION || WIN || LOSE
    const [step, setStep] = useState('START');
    const [showRedeemed, setShowRedeemed] = useState(false)
    const [coupon, setCoupon] = useState('')
    const [loading, setLoading] = useState(false);
    const [hideLossGif, setHideLossGif] = useState(false);
    const [boundTop, setBoundTop] = useState(-40);
    useEffect(() => {

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
        setBoundTop(dragElement.y)
        if (dragElement.y > 10) {

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
    const onClickBottle = () => {
        document.getElementById('cracker')?.classList.add('cracker-show-all');
        setTimeout(() => {
            setStep('ANIMATION');
            if (result?.status == 'win') {
                // setTimeout(() => {
                //     setWinLose()
                // }, 2000);
                if (result.type == 'sock') {
                    setTimeout(() => {
                        setWinLose()
                    }, 2500);
                } else {
                    setTimeout(() => {
                        setWinLose()
                    }, 2000);
                }
            } else {
                setWinLose()
            }
        }, 600);
    }
    return (
        <div className="row-bg row-win">
            <img className={`${step == 'WIN' ? 'opacity-0' : ''}`} src="./images/game/bg-unbox.jpg" />
            <div className={`content-before ${step == 'WIN' || step == 'LOSE' ? 'hidden' : ''}`} >
                {step == 'START' && <div className="game-cracked-group">
                    <img className="handle" onClick={onClickBottle} onTouchMove={onClickBottle} draggable="false" id="cracker" src="./images/game/bottle.png" />
                    {/* <img className="handle" draggable="false" id="cracker" src="./images/game/cracked-top.png" /> */}
                    <img id="mechanism" src="./images/game/mechanism.png" />
                    {/* <Draggable
                        axis="y"
                        handle=".handle"
                        defaultPosition={{ x: 0, y: -40 }}
                        grid={[5, 5]}
                        scale={1}
                        onDrag={onDrag}
                        bounds={
                            {
                                top: boundTop
                            }
                        }
                    >
                        <img className="handle" draggable="false" id="cracker" src="./images/game/cracked-bot.png" />
                    </Draggable> */}
                </div>}
                <div className={`animate ${step == 'ANIMATION' ? '' : 'fake-hidden'}`}>
                    {result.type == 'sock' ? <img src="./images/sock.gif" /> : <img src="./images/drink.gif" />}
                </div>
            </div>
            {step == 'WIN' && showRedeemed && <div className="redeemed-backdrop">
                <img id="redeemed" onClick={() => closePopup()} alt="redeemed" src="./images/win/redeemed.png" />
            </div>}
            { <div className={`animate content-win win-coctail ${step == 'WIN' ? '' : 'fake-hidden'}`}>
                <img className='bg-only-win' src="./images/background3.png" />
                {/* <img id="cocktail" className="img-gif" src="./images/game/boom.gif" /> */}
                {result.type == 'sock' ? <img id="text1" src="./images/win/text1socks.png" /> : <img id="text1" src="./images/win/text1.png" />}

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
            {step == 'LOSE' && <div className="content-lose">
                {!hideLossGif && <img src="./images/lose.gif" />}
                <img id="title" src="./images/lose/title.png" />
                <p className="follow">Follow us <a href='https://www.instagram.com/hendricksginsea' target="_blank">@hendricksginsea</a><br />for more festive goodness!</p>
                <a className="link-right">
                    <img id="right" onClick={() => openMenu()} src="./images/lose/right.png" />
                </a>
                <img id="put" src="./images/lose/put.png" />
            </div>
            }
        </div>
    );
}

export default Game;
