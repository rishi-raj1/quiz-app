import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


import styled from './Navbar.module.css';




const Navbar = () => {

    const navigate = useNavigate();
    const location = useLocation();


    const clickHandler = (e) => {
        if (e.target.id === 'dashboard') {
            navigate('/dashboard');
        }
        if (e.target.id === 'analytics') {
            navigate('/analytics');
        }
        if (e.target.id === 'createQuiz') {
            navigate('/createQuiz');
        }
    }


    const logoutHandler = (e) => {
        localStorage.removeItem('token');
        navigate('/');
    }


    useEffect(() => {
        const pathname = location.pathname;


        if (pathname.includes('/analytics')) {
            document.getElementById('analytics').classList.add(styled.active);
        }
        if (pathname.includes('/dashboard')) {
            document.getElementById('dashboard').classList.add(styled.active);
        }
        if (pathname.includes('/createQuiz')) {
            document.getElementById('createQuiz').classList.add(styled.active);
        }
    })




    return (
        <div className={styled.container}>
            <p className={styled.heading}>QUIZZIE</p>
            <p id='dashboard' className={styled.dashboard} onClick={clickHandler}>Dashboard</p>
            <p id='analytics' className={styled.analytics} onClick={clickHandler}>Analytics</p>
            <p id='createQuiz' className={styled.createQuiz} onClick={clickHandler}>Create Quiz</p>
            <hr />
            <div className={styled.logout} onClick={logoutHandler}>LOGOUT</div>
        </div>
    )
}

export default Navbar