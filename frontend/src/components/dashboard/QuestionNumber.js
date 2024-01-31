import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


import styled from './QuestionNumber.module.css';


import charmCross from '../../assets/charm_cross.png';


import { DataContext } from '../../context/DataProvider';




const QuestionNumber = ({ ind }) => {

    const { questionsArr, setQuestionsArr, setClickedNumber } = useContext(DataContext);
    const location = useLocation();
    const pathname = location.pathname;
    const create = pathname.includes('/createQuiz');

    let num = ind;


    useEffect(() => {
        if (ind === 0) {
            document.getElementsByClassName(styled.container)[0].classList.add(styled.active);
        }
    }, []);


    const clickHandler = () => {
        const elemArr = document.getElementsByClassName(styled.container);

        for (let i = 0; i < elemArr.length; i++) {
            elemArr[i].classList.remove(styled.active);
        }


        document.getElementById(`questionNumber${num}`).classList.add(styled.active);
        setClickedNumber(num + 1);
    }


    const crossHandler = () => {
        if (questionsArr.length === 1) {
            return;
        }

        const newArr = questionsArr.filter((element, index) => index !== ind)
        setQuestionsArr(newArr);

        if (ind === questionsArr.length - 1) {
            num = ind - 1;
        }
    }



    return (
        <div id={`questionNumber${ind}`} className={styled.container} onClick={clickHandler}>
            <span>{ind + 1}</span>
            {
                (create && questionsArr.length > 1) && (<img src={charmCross} alt='cross' onClick={crossHandler} />)
            }
        </div>
    )
}


export default QuestionNumber