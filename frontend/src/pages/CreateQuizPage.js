import { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';


import styled from './CreateQuizPage.module.css';


import CreateQuiz from '../components/dashboard/CreateQuiz';
import QnA from '../components/dashboard/QnA';
import PollQuestion from '../components/dashboard/PollQuestion';
import QuizLinkShare from '../components/dashboard/QuizLinkShare';


import { DataContext } from '../context/DataProvider';




const CreateQuizPage = () => {
    const BACKEND_URL = 'http://localhost:4000';
    const config = {
        headers: {
            'Authorization': JSON.parse(localStorage.getItem('token'))
        }
    }


    const location = useLocation();
    const { quizId } = useParams();
    const pathname = location.pathname;
    const create = pathname.includes('/createQuiz');
    const edit = pathname.includes('/editQuiz');


    const { createQuizItem, editQuizItem, setEditQuizItem } = useContext(DataContext);


    // we are writting useEffect here because after refreshing the editQuiz page the global state variable reset to its initial value then how can we know which type of quiz we are editing so in getquiz funciton we are getting quiz by help of quizId and setting the editQuizItem variable value to quizType.

    useEffect(() => {
        const getQuiz = async () => {
            const { data } = await axios.get(`${BACKEND_URL}/api/quiz/getQuiz/${quizId}`, config);
            const { quiz } = data;

            setEditQuizItem(quiz.quizType);
        }

        !create && getQuiz();
        // we will call getquiz when we edit the quiz
    }, []);


    return (
        <div className={styled.container}>
            {
                (create && createQuizItem === 'createquiz') && <CreateQuiz />
            }
            {
                (create && createQuizItem === 'qna') && <QnA />
            }
            {
                (create && createQuizItem === 'poll') && <PollQuestion />
            }
            {
                (create && createQuizItem === 'quizlinkshare') && <QuizLinkShare />
            }
            {
                (edit && editQuizItem === 'qna') && <QnA />
            }
            {
                (edit && editQuizItem === 'poll') && <PollQuestion />
            }
            {
                (edit && editQuizItem === 'quizlinkshare') && <QuizLinkShare />
            }
        </div>
    )
}

export default CreateQuizPage