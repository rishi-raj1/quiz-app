import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


import styled from './Delete.module.css';

import { BACKEND_URL } from '../../utils/utils';


const Delete = () => {

    const navigate = useNavigate();
    const { quizId } = useParams();

    const config = {
        headers: {
            'Authorization': JSON.parse(localStorage.getItem('token'))
        }
    }


    const confirmHandler = async () => {
        try {
            const result = await axios.delete(`${BACKEND_URL}/api/quiz/delete/${quizId}`, config);
        }
        catch (err) {
            if (err.response) {
                if (err.response.status == 403) {
                    localStorage.removeItem('token');
                    navigate('/');
                }
                alert(err.response.data.message);
            }
            else if (err.request) {
                alert(err.request);
            }
            else {
                alert(err.message);
            }
        }

        navigate('/analytics');
    }


    const cancelHandler = () => {
        navigate('/analytics');
    }



    return (
        <div className={styled.container}>
            <div className={styled.centeredDiv}>
                <p>Are you confirm you want to delete ?</p>
                <div className={styled.buttonsDiv}>
                    <span onClick={confirmHandler}>Confirm Delete</span>
                    <span onClick={cancelHandler}>Cancel</span>
                </div>
            </div>
        </div>
    )
}

export default Delete