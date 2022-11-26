import React, { useEffect } from 'react';
function OhDear({ closeIframe }: any) {
    return <div className="row-bg">
        {/* <img className='is-desktop' src="./images/oh-dear/dear-bg.png" />
        <img className='is-mobile' src="./images/oh-dear/bg-mob.png" /> */}
        <img className='is-desktop' src="./images/oh-dear/oh-dear-bg.jpg" />
        <div className="content-dear" >
            {/* <img id="logo" src="./images/home/logo.png" />
            <img id="oh-dear" src="./images/oh-dear/oh-dear.png" />
            <p className="you-must">Unfortunately, you only have one crack<br />at the Hendrick's Festive Cracker. 'Til next year!</p> */}
            <div className="two-btn">
                {/* <a onClick={() => closeIframe()}><img id="left" src="./images/oh-dear/left.png" /></a>
                <a onClick={() => closeIframe()}><img id="left" src="./images/oh-dear/right.png" /></a> */}
                <a onClick={() => closeIframe()}></a>
                <a onClick={() => closeIframe()}></a>
            </div>
            {/* <img id="bot-flower" src="./images/oh-dear/bot-flower.png" /> */}
        </div>
    </div>
}
export default OhDear;