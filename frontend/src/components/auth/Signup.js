import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import styled from './Signup.module.css';


import { BACKEND_URL } from '../../utils/utils';



const Signup = () => {
    const navigate = useNavigate();

    const [obj, setObj] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(false);



    const inputHandler = (e) => {
        setObj({
            ...obj,
            [e.target.name]: e.target.value
        })
    }



    const signupHandler = async () => {
        try {
            if (obj.name.trim().length === 0) {
                alert('please fill the name field');
                return;
            }
            if (obj.email.trim().length === 0) {
                alert('please fill the email field');
                return;
            }
            if (obj.password.trim().length === 0) {
                alert('please fill the password field');
                return;
            }
            if (obj.confirmPassword.trim().length === 0) {
                alert('please fill the confirm password field');
                return;
            }

            if (obj.password !== obj.confirmPassword) {
                alert('password and confirm password does not match');
                return;
            }

            setLoading(true);

            const { data } = await axios.post(`${BACKEND_URL}/api/user/register`, {
                name: obj.name.trim(),
                email: obj.email.trim(),
                password: obj.password.trim()
            });

            setObj({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            })

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
        finally {
            setLoading(false);
        }
    }




    return (
        <div className={styled.inputGroup}>
            <div className={styled.input}>
                <label className={styled.nameLabel} htmlFor='name'>Name</label>
                <input type='text' id='name' placeholder='Enter your Name' name='name' value={obj.name} onChange={inputHandler} />
            </div>
            <div className={styled.input}>
                <label className={styled.emailLabel} htmlFor='email'>Email</label>
                <input type='email' id='email' placeholder='Enter your Email' name='email' value={obj.email} onChange={inputHandler} />
            </div>
            <div className={styled.input}>
                <label className={styled.passwordLabel} htmlFor='password'>Password</label>
                <input type='password' id='password' placeholder='Enter your Password' name='password' value={obj.password} onChange={inputHandler} />
            </div>
            <div className={styled.input}>
                <label className={styled.confirmPasswordLabel} htmlFor='confirm_password'>Confirm Password</label>
                <input type='password' id='confirm_password' placeholder='Enter your Password' name='confirmPassword' value={obj.confirmPassword} onChange={inputHandler} />
            </div>
            <button className={styled.signupButton} onClick={signupHandler} disabled={loading}>
                {
                    loading ? 'Signing up...' : 'Sign Up'
                }
            </button>
        </div>
    )
}


export default Signup;