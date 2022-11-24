import React from 'react';

function Register({ submit }: any) {
    return (
        <div className="row-bg">
            <img alt="bg" src="./images/register/bg.png" />
            <div className="content-register">
                <img id="logo" alt="logo" src="./images/home/logo.png" />
                <img id="hohoho" alt="hohoho" src="./images/register/hohoho.png" />
                <p className="you-must">You must be of legal drinking age to play.<br />
                    Kindly fill in this form.
                </p>
                <form>
                    <div className="form-item position-relative">
                        <label htmlFor="first-name">First Name</label>
                        <input type="text" id="first-name" placeholder="First Name" />
                    </div>
                    <div className="form-item position-relative">
                        <label htmlFor="last-name">Last Name</label>
                        <input type="text" id="last-name" placeholder="Last Name" />
                    </div>
                    <div className="form-item position-relative">
                        <label htmlFor="mobile">Mobile no.</label>
                        <input type="text" id="mobile" placeholder="Mobile no." />
                    </div>
                    <div className="form-item position-relative">
                        <label htmlFor="date-of-birth">Date of birth</label>
                        <input type="text" id="date-of-birth" placeholder="Date of birth" />
                    </div>
                    <div className="form-item position-relative">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Email" />
                    </div>
                    <p>
                        By registering, you declare that you are minimally<br />
                        18 years old and are of legal drinking age in Singapore.
                    </p>
                    <div className="checkbox d-flex justify-content-start align-items-start position-relative">
                        <input type="checkbox" id="checkbox" name="checkbox" value="checkbox" />
                        <label htmlFor="checkbox">
                            By providing your contact details, you consent to our<br />
                            Terms and Conditions and Privacy Policy and agree<br />
                            to receive marketing updates. You can unsubscribe at<br />
                            any time.
                        </label>
                    </div>
                    <a className="submit" onClick={submit} ><img id="submit" alt="submit" src="./images/register/submit.png" /></a>
                </form>
            </div>
        </div>
    );
}

export default Register;
