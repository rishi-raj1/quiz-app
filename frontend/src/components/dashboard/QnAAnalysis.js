import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


import styled from './QnAAnalysis.module.css';


import QuestionCardQnA from './QuestionCardQnA';


import { BACKEND_URL } from '../../utils/utils';



const QnAAnalysis = () => {
    const navigate = useNavigate();

    const config = {
        headers: {
            'Authorization': JSON.parse(localStorage.getItem('token'))
        }
    }
    const [quizDetails, setQuizDetails] = useState({});
    const { quizId } = useParams();

    const date = new Date(quizDetails?.createdAt);
    let month = date?.toLocaleString('en-US', { month: 'short' });
    let day = date?.toLocaleString('en-US', { day: '2-digit' });
    let year = date?.toLocaleString('en-US', { year: 'numeric' });


    useEffect(() => {
        const getQuiz = async () => {
            try {
                const { data } = await axios.get(`${BACKEND_URL}/api/quiz/getQuiz/${quizId}`, config);
                const { quiz } = data;

                setQuizDetails(quiz);
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

        }

        getQuiz();
    }, []);



    return (
        <div className={styled.container}>
            <div className={styled.firstDiv} >
                <p className={styled.heading}>{quizDetails?.quizName} Question Analysis</p>
                <div className={styled.details}>
                    <p>Created on : {`${day} ${month}, ${year}`}</p>
                    <p>Impression: {quizDetails?.impression}</p>
                </div>
            </div>
            <div className={styled.secondDiv}>
                {
                    quizDetails?.questionsArr?.map((item, ind) => (
                        <QuestionCardQnA key={ind} item={item} ind={ind} />
                    ))
                }
            </div>
        </div>
    )
}

export default QnAAnalysis