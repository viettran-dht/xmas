import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import InputMask from 'react-input-mask';
const initForm = {
    firstName: '',
    lastName: '',
    phone: '',
    dob: '',
    email: ''
}
function Register({ onRegister }: any) {
    const [form, setForm] = useState<any>(initForm)
    useEffect(() => {


    }, [])
    const setFormValue = (field: string) => (e: any) => {
        const newForm = { ...form, [field]: e.target.value }
        setForm(newForm)
    }
    const submit = () => {
        const values = {
            ...form,
            phone: form.phone.replace(/_/g, ''),
            dob: form.dob.replace(/_/g, '')
        }
        for (const key in values) {
            if (!values[key]) {
                toast.error("Please type all input");
                return
            }
        }
        onRegister(values)
    }
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
                        {/* <label htmlFor="first-name">First Name</label> */}
                        <input type="text" value={form.firstName} onChange={setFormValue('firstName')} id="first-name" placeholder="First Name" />
                    </div>
                    <div className="form-item position-relative">
                        {/* <label htmlFor="last-name">Last Name</label> */}
                        <input type="text" value={form.lastName} onChange={setFormValue('lastName')} id="last-name" placeholder="Last Name" />
                    </div>
                    <div className="form-item position-relative">
                        <InputMask mask="99999999999" type="tel" value={form.phone} onChange={setFormValue('phone')} placeholder="Mobile no." maskPlaceholder="." />
                    </div>
                    <div className="form-item position-relative">
                        {/* <label htmlFor="date-of-birth">Date of birth</label> */}
                        {/* <input type="text" value={form.dob} id="date-of-birth" placeholder="Date of birth" /> */}
                        <InputMask mask="99/99/9999" value={form.dob} onChange={setFormValue('dob')} placeholder="Date of birth" maskPlaceholder="-" />
                    </div>
                    <div className="form-item position-relative">
                        {/* <label htmlFor="email">Email</label> */}
                        <input type="email" value={form.email} onChange={setFormValue('email')} id="email" placeholder="Email" />
                    </div>
                    <p>
                        By registering, you declare that you are minimally<br />
                        18 years old and are of legal drinking age in Singapore.
                    </p>
                    <div className="checkbox d-flex justify-content-start align-items-start position-relative">
                        <input type="checkbox" id="checkbox" name="checkbox" value="checkbox" />
                        <label htmlFor="checkbox">
                            <div>
                                By providing your contact details, you consent to our<br />
                            <a href='https://www.since1887.sg/pages/terms-and-conditions'>Terms and Conditions </a>and <a href='https://www.since1887.sg/pages/privacy-policy'>Privacy Policy </a> and<br />
                            agree to receive marketing updates. You can <br />
                            unsubscribe at any time.
                            </div>
                            
                        </label>
                    </div>
                    <a className="submit" onClick={submit} ><img id="submit" alt="submit" src="./images/register/submit.png" /></a>
                </form>
            </div>
        </div>
    );
}

export default Register;
