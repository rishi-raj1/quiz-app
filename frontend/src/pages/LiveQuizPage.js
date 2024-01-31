import { useState } from 'react';


import styled from './LiveQuizPage.module.css';


import PollComplete from '../components/live_quiz/PollComplete';
import QnAComplete from '../components/live_quiz/QnAComplete';
import QuizQuestion from '../components/live_quiz/QuizQuestion';





const LiveQuizPage = () => {

    const [liveQuizItem, setLiveQuizItem] = useState('quizquestion');
    const [answersArr, setAnswersArr] = useState([]);
    const [originalAnswersArr, setOriginalAnswersArr] = useState([]);




    return (
        <div className={styled.container}>
            {
                liveQuizItem === 'quizquestion' && (<QuizQuestion answersArr={answersArr} setAnswersArr={setAnswersArr} setOriginalAnswersArr={setOriginalAnswersArr} setLiveQuizItem={setLiveQuizItem} />)
            }
            {
                liveQuizItem === 'qnacomplete' && (<QnAComplete answersArr={answersArr} originalAnswersArr={originalAnswersArr} />)
            }
            {
                liveQuizItem === 'pollcomplete' && (<PollComplete />)
            }
        </div>
    )
}

export default LiveQuizPage