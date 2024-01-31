import { useEffect, useState } from 'react';


import styled from './QnAComplete.module.css';


import trophy from '../../assets/trophy.png';



const QnAComplete = ({ answersArr, originalAnswersArr }) => {
    const [score, setScore] = useState(0);

    useEffect(() => {
        const len = answersArr.length;
        let num = 0;

        for (let i = 0; i < len; i++) {
            if (answersArr[i] === originalAnswersArr[i]) {
                num++;
            }
        }

        setScore(num);
    }, []);


    return (
        <div className={styled.container}>
            <p className={styled.heading}>Congrats Quiz is completed</p>
            <img className={styled.trophyImg} src={trophy} alt='trophy' />
            <p className={styled.score}>Your Score is <span>{`${score}/${answersArr.length}`}</span> </p>
        </div>
    )
}



export default QnAComplete