import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


import styled from './QnA.module.css';


import TextOption from './TextOption';
import ImageOption from './ImageOption';
import TextandImageOption from './TextandImageOption';


import QuestionNumber from "./QuestionNumber"
import Timer from './Timer';


import { DataContext } from '../../context/DataProvider';

import { BACKEND_URL } from '../../utils/utils';


const QnA = () => {

    const config = {
        headers: {
            'Authorization': JSON.parse(localStorage.getItem('token'))
        }
    }

    const { questionsArr, setQuestionsArr, clickedNumber, setClickedNumber, quizName, quizType, setQuizName, setQuizType, setCreateQuizItem, setEditQuizItem, setCreatedQuizId } = useContext(DataContext);

    const navigate = useNavigate();
    const location = useLocation();
    const { quizId } = useParams();
    const pathname = location.pathname;
    const create = pathname.includes('/createQuiz');

    const [timer, setTimer] = useState('off');

    const demoObj = {
        questionName: '',
        optionType: 'text',
        textOptionsArr: ['', ''],
        imageOptionsArr: ['', ''],
        rightOptionIndex: -1
    }
    const currentObj = questionsArr[clickedNumber - 1];
    const obj = {
        quizName, quizType, questionsArr, timer
    }

    useEffect(() => {
        const getQuiz = async () => {
            try {
                const { data } = await axios.get(`${BACKEND_URL}/api/quiz/getQuiz/${quizId}`, config);
                const { quiz } = data;

                setQuestionsArr(quiz.questionsArr);
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

        !create && getQuiz();
        // we will call getquiz when we edit the quiz
    }, []);



    const plusHandler = () => {
        setQuestionsArr([...questionsArr, demoObj]);
    }


    const inputHandler = (e) => {
        const arr = [...questionsArr];

        arr[clickedNumber - 1] = {
            ...currentObj,
            [e.target.name]: e.target.value
        }

        setQuestionsArr(arr);
    }


    const optionTypeHandler = (e) => {
        if (!create) {
            // if the value of create is false it means we are editing the quiz and in edit we cannot change the type of options . we can change the value of answer
            return;
        }

        const arr = [...questionsArr];

        arr[clickedNumber - 1] = {
            ...currentObj,
            optionType: e.target.value
        }
        setQuestionsArr(arr);
    }


    const addOptionHandler = () => {
        const arr = [...questionsArr];

        arr[clickedNumber - 1] = {
            ...currentObj,
            textOptionsArr: [...currentObj.textOptionsArr, ''],
            imageOptionsArr: [...currentObj.imageOptionsArr, '']
        }
        setQuestionsArr(arr);
    }


    const cancelHandler = () => {
        // reset the global state variable when click cancel button because it is a global state variable

        setQuizName('');
        setQuizType('');
        setClickedNumber(1);
        setQuestionsArr([demoObj]);
        setCreateQuizItem('createquiz');

        if (create) {
            navigate('/dashboard');
        }
        else {
            navigate('/analytics');
        }
    }


    const createHandler = async () => {
        const newQuestionsArr = [...questionsArr];
        const len = newQuestionsArr.length;

        for (let i = 0; i < len; i++) {
            const { questionName, optionType, rightOptionIndex, textOptionsArr, imageOptionsArr } = newQuestionsArr[i];

            if (questionName.trim().length === 0) {
                alert(`please fill the question name field of question ${i + 1}`);
                return;
            }
            else if (rightOptionIndex === -1) {
                alert(`please choose the correct option of question ${i + 1}`);
                return;
            }
            else {
                if (optionType === 'text') {
                    const len1 = textOptionsArr.length;

                    for (let j = 0; j < len1; j++) {
                        if (textOptionsArr[j].trim().length === 0) {
                            alert(`please fill the text options of question ${i + 1}`);
                            return;
                        }
                    }
                }
                else if (optionType === 'imageURL') {
                    const len1 = imageOptionsArr.length;

                    for (let j = 0; j < len1; j++) {
                        if (imageOptionsArr[j].trim().length === 0) {
                            alert(`please fill the imageURL options of question ${i + 1}`);
                            return;
                        }
                    }
                }
                else {
                    const len1 = textOptionsArr.length;

                    for (let j = 0; j < len1; j++) {
                        if (textOptionsArr[j].trim().length === 0) {
                            alert(`please fill the options of question ${i + 1}`);
                            return;
                        }
                    }

                    const len2 = imageOptionsArr.length;

                    for (let j = 0; j < len2; j++) {
                        if (imageOptionsArr[j].trim().length === 0) {
                            alert(`please fill the options of question ${i + 1}`);
                            return;
                        }
                    }
                }
            }
        }

        try {
            if (create) {
                const { data } = await axios.post(`${BACKEND_URL}/api/quiz/create`, obj, config);
                const { quizId } = data;
                setCreatedQuizId(quizId);
                setCreateQuizItem('quizlinkshare');
            }
            else {
                await axios.put(`${BACKEND_URL}/api/quiz/update/${quizId}`, {
                    questionsArr
                }, config);
                setEditQuizItem('quizlinkshare');
            }

            // reset the global state variable when click create button because it is a global state variable

            setQuizName('');
            setQuizType('');
            setClickedNumber(1);
            setQuestionsArr([demoObj]);
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


    return (
        <div className={styled.container}>
            <div className={styled.centeredDiv}>
                <div className={styled.firstDiv}>
                    <div className={styled.questionNumber}>
                        {
                            questionsArr.map((item, ind) => (
                                <QuestionNumber key={ind} ind={ind} />
                            ))
                        }
                    </div>
                    {
                        (create && questionsArr.length < 5) && (<span className={styled.plusIcon} onClick={plusHandler}>+</span>)
                    }
                    <p>Max 5 questions</p>
                </div>
                <div className={styled.secondDiv}>
                    <input name='questionName' placeholder='QnA Question' onChange={inputHandler} value={currentObj.questionName} />
                </div>
                <div className={styled.thirdDiv}>
                    <span>Option Type </span>
                    <label>
                        <input
                            type="radio"
                            name="optionType"
                            value="text"
                            checked={currentObj.optionType === 'text'}
                            onChange={optionTypeHandler}
                        />
                        Text
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="optionType"
                            value="imageURL"
                            checked={currentObj.optionType === 'imageURL'}
                            onChange={optionTypeHandler}
                        />
                        Image URL
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="optionType"
                            value="textandImageURL"
                            checked={currentObj.optionType === 'textandImageURL'}
                            onChange={optionTypeHandler}
                        />
                        Text & Image URL
                    </label>
                </div>
                <div className={styled.fourthDiv}>
                    <div className={styled.optionsDiv}>
                        {
                            currentObj.textOptionsArr.map((item, ind) => {
                                return currentObj.optionType === 'text' ? (
                                    <TextOption key={ind} ind={ind} />
                                ) : currentObj.optionType === 'imageURL' ? (
                                    <ImageOption key={ind} ind={ind} />
                                ) : (
                                    <TextandImageOption key={ind} ind={ind} />
                                )
                            })
                        }
                    </div>
                    {
                        create && (
                            <div className={styled.timerDiv}>
                                <Timer timer={timer} setTimer={setTimer} />
                            </div>
                        )
                    }
                </div>
                {
                    (create && currentObj.textOptionsArr.length < 4) ? (
                        <div className={styled.fifthDiv} onClick={addOptionHandler}>
                            Add Option
                        </div>
                    ) : (
                        <div style={{
                            height: '40px',
                            marginBottom: '35px'
                        }}></div>
                    )
                }
                <div className={styled.sixthDiv}>
                    <span onClick={cancelHandler} >Cancel</span>
                    <span onClick={createHandler}>{create ? 'Create' : 'Edit'} Quiz</span>
                </div>
            </div>
        </div>
    )
}

export default QnA