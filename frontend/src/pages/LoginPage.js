import { useState } from 'react';


import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import styled from './LoginPage.module.css';



const LoginPage = () => {

    const [showSignup, setShowSignup] = useState(true);

    const toggleHandler = (e) => {
        const signup = document.getElementsByClassName(styled.signup)[0];
        const login = document.getElementsByClassName(styled.login)[0];


        if (e.target.classList.contains(styled.signup)) {
            signup.classList.add(styled.active);
            login.classList.remove(styled.active);
            setShowSignup(true);
        }
        else {
            login.classList.add(styled.active);
            signup.classList.remove(styled.active);
            setShowSignup(false);
        }

    }


    return (
        <div className={styled.container} >
            <div className={styled.centered}>
                <p className={styled.heading}>
                    QUIZZIE
                </p>
                <div className={styled.toggleButtons}>
                    <div className={`${styled.signup} ${styled.active}`} onClick={toggleHandler}>
                        Sign Up
                    </div>
                    <div className={styled.login} onClick={toggleHandler}>
                        Log In
                    </div>
                </div>
                {
                    showSignup ? <Signup /> : <Login />
                }
            </div>
        </div>
    )
}

export default LoginPage