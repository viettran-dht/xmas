import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import InputMask from 'react-input-mask';
import DatePicker from "react-datepicker";
const initForm = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    checked: false
}
function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
}

function Register({ onRegister }: any) {
    const [form, setForm] = useState<any>(initForm)
    const [showValidate, setShowValidate] = useState<any>(false)

    const setFormValue = (field: string) => (e: any) => {
        const newForm = { ...form, [field]: e.target.value }
        newForm.phone = newForm.phone.replace(/\D/g, '')
        setForm(newForm)
    }
    const submit = () => {
        const values = {
            ...form,
            phone: form.phone.replace(/_/g, ''),
        }
        setShowValidate(true)
        if (!values.checked) {
            return
        }
        for (const key in values) {
            if (!values[key]) {
                return
            }
        }
        if (!isValidEmail(values.email)) {
            return
        }

        onRegister(values)
    }
    return (
        <div className="row-bg">
            <img alt="bg" src="./images/register/bg.png" />
            <div className="content-register">
                <img id="logo" alt="logo" src="./images/home/logo.png" />
                {/* <img id="hohoho" alt="hohoho" src="./images/register/hohoho.png" /> */}
                <p className="meet-you">
                    CURIOUS TO MEET YOU!
                </p>
                <p className="you-must">
                    Kindly fill in your details to play.
                </p>
                <form>
                    <div className="form-item position-relative">
                        <input type="text" value={form.firstName} onChange={setFormValue('firstName')} id="first-name" placeholder="First Name" />
                        {showValidate && !form.firstName && <div className="error-message">Please input first name</div>}
                    </div>
                    <div className="form-item position-relative">
                        <input type="text" value={form.lastName} onChange={setFormValue('lastName')} id="last-name" placeholder="Last Name" />
                        {showValidate && !form.lastName && <div className="error-message">Please input last name</div>}
                    </div>
                    <div className="form-item position-relative">
                        <input type="tel" value={form.phone} onChange={setFormValue('phone')} placeholder="Mobile number" />
                        {showValidate && !form.phone && <div className="error-message">Please input mobile number</div>}
                    </div>
                    <div className="form-item position-relative">
                        <input type="email" value={form.email} onChange={setFormValue('email')} id="email" placeholder="Email" />
                        {showValidate && !isValidEmail(form.email) && <div className="error-message">Please input email</div>}
                    </div>
                    <p>
                        By registering, you declare that you are minimally<br />
                        18 years old and are of legal drinking age in Singapore.
                    </p>
                    <div className="checkbox position-relative">
                        <input type="checkbox" id="checkbox" name="checkbox" checked={form.checked} onChange={(e) => {
                            const newForm = { ...form, checked: e.target.checked }
                            setForm(newForm)
                        }} />
                        <label htmlFor="checkbox" className='checkbox-rg'>
                            <div className='checkbox-ct'>
                                I acknowledge that by filling out the information<br /> 
                                below I consent to William Grant & Sons' <a href='https://www.since1887.sg/pages/terms-and-conditions' target="_blank">Terms<br />
                                and Conditions</a>, <a href='https://www.since1887.sg/pages/privacy-policy' target="_blank">Privacy Policy </a> and agree to<br /> 
                                receiving marketing updates. I also acknowledge<br />
                                that photography or videos of me may be taken<br />
                                during the event for advertising, promotional and<br />
                                marketing purposes.
                            </div>

                        </label>

                    </div>
                    {showValidate && !form.checked && <div className="error-message checkbox d-flex justify-content-center align-items-start position-relative">
                        * You must agree with the Terms and Conditions and<br /> Privacy Policy to continue
                    </div>}
                    <a className={`submit`} onClick={submit} ><img id="submit" alt="submit" src="./images/register/submit.png" /></a>
                </form>
            </div>
        </div>
    );
}

export default Register;
