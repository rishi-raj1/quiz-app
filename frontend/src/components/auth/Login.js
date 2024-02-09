import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import axios from 'axios';


import styled from './Login.module.css';

import { BACKEND_URL } from '../../utils/utils';


const Login = () => {

    const navigate = useNavigate();

    const [obj, setObj] = useState({
        email: '',
        password: ''
    });


    const inputHandler = (e) => {
        setObj({
            ...obj,
            [e.target.name]: e.target.value
        })
    }


    const loginHandler = async () => {
        try {
            if (obj.email.trim().length === 0) {
                alert('please fill the email field');
                return;
            }
            else if (obj.password.trim().length === 0) {
                alert('please fill the password field');
                return;
            }

            const { data } = await axios.post(`${BACKEND_URL}/api/user/login`, {
                email: obj.email,
                password: obj.password
            });

            const { token } = data;

            localStorage.setItem('token', JSON.stringify(`Bearer ${token}`));
            navigate('/dashboard');
        }
        catch (err) {
            if (err.response) {
                alert(err.response.data.message);
            }
            else if (err.request) {
                alert(err.request);
            }
            else {
                alert(err.message);
            }
        }
    }



    return (
        <div className={styled.inputGroup}>
            <div className={styled.input}>
                <label className={styled.emailLabel} htmlFor='email'>Email</label>
                <input type='email' id='email' placeholder='Enter your Email' name='email' value={obj.email} onChange={inputHandler} />
            </div>
            <div className={styled.input}>
                <label className={styled.passwordLabel} htmlFor='password'>Password</label>
                <input type='password' id='password' placeholder='Enter your Password' name='password' value={obj.password} onChange={inputHandler} />
            </div>
            <div className={styled.loginButton} onClick={loginHandler}>
                Log In
            </div>
        </div>
    )
}


export default Login