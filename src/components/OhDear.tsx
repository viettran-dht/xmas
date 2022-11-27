import React, { useEffect } from 'react';
function OhDear({ closeIframe }: any) {
    return <div className="row-bg">
        {/* <img className='is-desktop' src="./images/oh-dear/oh-dear-bg.jpg" /> */}
        <img src="./images/oh-dear/oh-dear-bg-mob.jpg" />
        <div className="content-dear" >
            
            <div className="two-btn">
                {/* <a onClick={() => closeIframe()}><img id="left" src="./images/oh-dear/left.png" /></a>
                <a onClick={() => closeIframe()}><img id="left" src="./images/oh-dear/right.png" /></a> */}
                <a onClick={() => closeIframe()}><img id="left" src="./images/oh-dear/left.png" /></a>
                <a onClick={() => closeIframe()}><img id="left" src="./images/oh-dear/right.png" /></a>
            </div>
            <p><a className='link-ig' href='https://www.instagram.com/hendricksginsea' target="_blank"></a></p>
        </div>
    </div>
}
export default OhDear;