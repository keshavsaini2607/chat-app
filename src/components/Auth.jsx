import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import SigninImage from '../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarUrl: ''
}


const Auth = () => {
    const [isSignup, setIsSignup] = useState(true);
    const [form, setForm] = useState(initialState);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { userName, password, phoneNumber, avatarUrl } = form;

        const URL = 'https://chatty-wp.herokuapp.com/auth';
        const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            userName, password, fullName: form.fullName, phoneNumber, avatarUrl
        })

        cookies.set('token', token)
        cookies.set('userName', userName)
        cookies.set('fullName', fullName)
        cookies.set('userId', userId)

        if (isSignup) {
            cookies.set('phoneNumber', phoneNumber)
            cookies.set('avatarUrl', avatarUrl)
            cookies.set('hashedPassword', hashedPassword)
        }

        window.location.reload();
    }

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? 'Signup' : 'Signin'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="userName">Username</label>
                            <input
                                type="text"
                                name="userName"
                                placeholder="Username"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Avatar Url</label>
                                <input
                                    type="text"
                                    name="avatarUrl"
                                    placeholder="Avatar Url"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="phoneNumber">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_button">
                            <button type="submit">
                                {isSignup ? 'Sign up' : 'Sign in'}
                            </button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                                ? 'Already have an account?'
                                : 'Dont have an account?'
                            }
                        </p>
                        <span onClick={switchMode}>
                            {isSignup ? 'Signin' : 'Signup'}
                        </span>
                    </div>
                </div>
            </div>
            <div className="auth__form-container_image">
                <img src={SigninImage} alt="Signin" />
            </div>
        </div>
    )
}

export default Auth
