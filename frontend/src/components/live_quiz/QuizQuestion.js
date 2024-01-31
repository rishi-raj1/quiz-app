import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


import styled from './QuizQuestion.module.css';


import TextOptionCard from './TextOptionCard';
import ImageOptionCard from './ImageOptionCard';
import TextandImageOptionCard from './TextandImageOptionCard';


import { BACKEND_URL } from '../../utils/utils';



const QuizQuestion = ({ answersArr, setAnswersArr, setOriginalAnswersArr, setLiveQuizItem }) => {

    const { quizId } = useParams();
    const [quizDetails, setQuizDetails] = useState({});
    const [timer, setTimer] = useState('00');
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
    const [totalQuestion, setTotalQuestion] = useState(1);
    let currentQuestion = {};
    const [currentQuestionTimer, setCurrentQuestionTimer] = useState('00');


    // i am declaring below state because if i select option1 or 2 in a question then the question after it that number option automatically selected means active class is automatically added in that numbered option

    const [clickedOptionQuestionNumber, setClickedOptionQuestionNumber] = useState(-1);


    if (quizDetails?.questionsArr) {
        currentQuestion = quizDetails?.questionsArr[currentQuestionNumber - 1];
    }
    else {
        currentQuestion = {};
    }


    useEffect(() => {
        const getQuiz = async () => {
            const { data } = await axios.get(`${BACKEND_URL}/api/quiz/getLiveQuiz/${quizId}`);
            const { quiz } = data;

            const len = quiz.questionsArr.length;
            setQuizDetails(quiz);
            setTotalQuestion(len);
            setAnswersArr(Array(quiz.questionsArr.length).fill(-1));

            if (quiz.timer === '5sec') {
                setTimer('05');
                setCurrentQuestionTimer('05');
            }
            else if (quiz.timer === '10sec') {
                setTimer('10');
                setCurrentQuestionTimer('10');
            }
            else {
                setTimer('00');
                setCurrentQuestionTimer('00');
            }


            // setting the value of original answer array 
            const arr = [];
            for (let i = 0; i < len; i++) {
                arr[i] = quiz.questionsArr[i].rightOptionIndex;
            }

            setOriginalAnswersArr(arr);
        }

        getQuiz();

    }, []);


    useEffect(() => {
        const num = Number(timer);

        let intervalId = null, timeoutId = null;

        if (num > 0) {
            intervalId = setInterval(() => {
                setCurrentQuestionTimer((prev) => {
                    if (prev == 0) {
                        return 0;
                    }

                    prev = Number(prev, 10) - 1;
                    if (prev < 10) {
                        prev = '0' + prev;
                    }
                    return prev;
                });
            }, 1000);

            timeoutId = setTimeout(() => {
                clearInterval(intervalId);
                clearTimeout(timeoutId);

                if (currentQuestionNumber === totalQuestion) {
                    submitHandler();
                }
                else {
                    setCurrentQuestionNumber(currentQuestionNumber + 1);
                    setCurrentQuestionTimer(timer);
                }
            }, num * 1000);
        }

        return () => {
            clearInterval(intervalId)
            clearTimeout(timeoutId);
        }
    }, [timer, currentQuestionNumber]);



    const nextHandler = () => {
        setCurrentQuestionNumber(currentQuestionNumber + 1);
    }


    const submitHandler = async () => {
        try {
            await axios.post(`${BACKEND_URL}/api/quiz/submitLiveQuiz/${quizId}`, { answersArr });
            if (quizDetails.quizType === 'qna') {
                setLiveQuizItem('qnacomplete');
            }
            else {
                setLiveQuizItem('pollcomplete');
            }
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
        <div className={styled.container}>
            <div className={styled.centered}>
                <div className={styled.firstDiv}>
                    <span className={styled.questionNumber}>{`${currentQuestionNumber} / ${totalQuestion}`}</span>
                    {
                        quizDetails?.quizType === 'qna' && (
                            <span className={styled.timer}>00:{currentQuestionTimer}s</span>
                        )
                    }
                </div>
                <p className={styled.question}>
                    {
                        currentQuestion?.questionName
                    }
                </p>
                <div className={styled.options}>
                    {
                        currentQuestion?.textOptionsArr?.map((item, ind) => {
                            if (currentQuestion?.optionType === 'text') {
                                return <TextOptionCard key={ind} ind={ind} item={item} currentQuestionNumber={currentQuestionNumber} answersArr={answersArr} setAnswersArr={setAnswersArr} clickedOptionQuestionNumber={clickedOptionQuestionNumber} setClickedOptionQuestionNumber={setClickedOptionQuestionNumber} />
                            }
                            else if (currentQuestion?.optionType === 'imageURL') {
                                const imageOptionsArr = [...currentQuestion?.imageOptionsArr];
                                return <ImageOptionCard key={ind} ind={ind} item={imageOptionsArr[ind]} currentQuestionNumber={currentQuestionNumber} answersArr={answersArr} setAnswersArr={setAnswersArr} clickedOptionQuestionNumber={clickedOptionQuestionNumber} setClickedOptionQuestionNumber={setClickedOptionQuestionNumber} />
                            }
                            else {
                                const imageOptionsArr = [...currentQuestion?.imageOptionsArr];
                                return <TextandImageOptionCard key={ind} ind={ind} item1={item} item2={imageOptionsArr[ind]} currentQuestionNumber={currentQuestionNumber} answersArr={answersArr} setAnswersArr={setAnswersArr} clickedOptionQuestionNumber={clickedOptionQuestionNumber} setClickedOptionQuestionNumber={setClickedOptionQuestionNumber} />
                            }
                        })
                    }
                </div>
                {
                    currentQuestionNumber === totalQuestion ? (
                        <div className={styled.submit}>
                            <span onClick={submitHandler}>SUBMIT</span>
                        </div>
                    ) : (
                        <div className={styled.next}>
                            <span onClick={nextHandler}>NEXT</span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default QuizQuestion