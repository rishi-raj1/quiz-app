import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


import styled from './Dashboard.module.css'
import QuizCard from './QuizCard'


import { BACKEND_URL } from '../../utils/utils'



const Dashboard = () => {
    const navigate = useNavigate();

    const token = JSON.parse(localStorage.getItem('token'));

    const config = {
        headers: {
            'Authorization': token
        }
    }

    const [quizArr, setQuizArr] = useState([]);
    const [sortedQuizArr, setSortedQuizArr] = useState([]);

    const len = quizArr.length;
    let totalQuestions = 0;
    let totalImpressions = 0;

    for (let i = 0; i < len; i++) {
        totalQuestions += quizArr[i].questionsArr.length;
        totalImpressions += quizArr[i].impression;
    }


    const fetchQuizzes = async () => {
        try {
            const { data } = await axios.get(`${BACKEND_URL}/api/quiz/allQuiz`, config);
            setQuizArr(data.allQuiz);

            // sort array of quizes by impression and show only that quiz whose impression is greater than 10
            let arr = [...data.allQuiz];
            arr = arr.filter((obj) => obj.impression > 10);
            arr = arr.sort((a, b) => b.impression - a.impression);

            setSortedQuizArr(arr);
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


    useEffect(() => {
        fetchQuizzes();
    }, []);



    return (
        <div className={styled.container}>
            <div className={styled.quizInformation}>
                <div className={`${styled.infoCard} ${styled.quizInfo}`}>
                    <span style={{
                        fontSize: '40px'
                    }}>{len}</span>
                    <span style={{
                        fontSize: '20px',
                        marginLeft: '10px'
                    }}>Quiz</span>
                    <br />
                    <span style={{
                        fontSize: '21px',
                    }}>Created</span>
                </div>
                <div className={`${styled.infoCard} ${styled.questionInfo}`}>
                    <span style={{
                        fontSize: '40px'
                    }}>{totalQuestions}</span>
                    <span style={{
                        fontSize: '20px',
                        marginLeft: '10px'
                    }}>questions</span>
                    <br />
                    <span style={{
                        fontSize: '21px',
                    }}>Created</span>
                </div>
                <div className={`${styled.infoCard} ${styled.impressionInfo}`}>
                    <span style={{
                        fontSize: '40px'
                    }}>{totalImpressions}</span>
                    <span style={{
                        fontSize: '20px',
                        marginLeft: '10px'
                    }}>Total</span>
                    <br />
                    <span style={{
                        fontSize: '21px',
                    }}>Impressions</span>
                </div>
            </div>
            <p className={styled.para}>
                Trending Quizs
            </p>
            <div className={styled.allQuiz}>
                {
                    sortedQuizArr.map((item, ind) => (
                        <QuizCard key={ind} item={item} />
                    ))
                }
            </div>
        </div>
    )
}

export default Dashboard