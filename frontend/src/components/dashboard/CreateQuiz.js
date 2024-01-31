import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';


import styled from './CreateQuiz.module.css';


import { DataContext } from '../../context/DataProvider';




const CreateQuiz = () => {

    const { setCreateQuizItem, quizName, setQuizName, quizType, setQuizType } = useContext(DataContext);

    const navigate = useNavigate();



    const inputHandler = (e) => {
        setQuizName(e.target.value);
    }

    const typeHandler = (e) => {
        setQuizType(e.target.dataset.value);

        const qnaElement = document.getElementsByClassName(styled.qna)[0];
        const pollElement = document.getElementsByClassName(styled.poll)[0];

        qnaElement.classList.remove(styled.active);
        pollElement.classList.remove(styled.active);

        e.target.classList.add(styled.active);
    }


    const cancelHandler = () => {

        // reset the global state variable when click cancel button because it is a global state variable
        setQuizName('');
        setQuizType('');

        navigate('/dashboard');
    }


    const continueHandler = () => {
        if (quizName.trim().length === 0 || quizType.length === 0) {
            alert('please fill all the fields');
            return;
        }

        setCreateQuizItem(quizType);
    }



    return (
        <div className={styled.container}>
            <div className={styled.centeredDiv}>
                <div className={styled.inputDiv}>
                    <input placeholder='Quiz name' onChange={inputHandler} value={quizName} />
                </div>
                <div className={styled.optionsDiv}>
                    <span className={styled.type}>Quiz Type</span>
                    <span data-value='qna' className={styled.qna} onClick={typeHandler}>Q & A</span>
                    <span data-value='poll' className={styled.poll} onClick={typeHandler}>Poll Type</span>
                </div>
                <div className={styled.buttonsDiv}>
                    <span className={styled.cancel} onClick={cancelHandler}>Cancel</span>
                    <span className={styled.continue} onClick={continueHandler}>Continue</span>
                </div>
            </div>
        </div>
    )
}


export default CreateQuiz