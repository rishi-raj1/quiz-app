import { useContext } from 'react';
import { useLocation } from 'react-router-dom';


import styled from './TextandImageOption.module.css';


import deleteImg from '../../assets/delete.png';


import { DataContext } from '../../context/DataProvider';



const TextandImageOption = ({ ind }) => {

    const { quizType, clickedNumber, questionsArr, setQuestionsArr } = useContext(DataContext);
    const location = useLocation();
    const pathname = location.pathname;
    const create = pathname.includes('/createQuiz');
    // if create is true it means we are creating quiz and if it is false it means we are editing the quiz and in edit we cannot add options and delete options

    const currentObj = questionsArr[clickedNumber - 1];

    const questionsNewArr = [...questionsArr];

    // console.log(currentObj.textOptionsArr)
    // console.log(currentObj.imageOptionsArr)


    const radioHandler = () => {
        questionsNewArr[clickedNumber - 1] = {
            ...currentObj,
            rightOptionIndex: ind
        }

        setQuestionsArr(questionsNewArr);
    }

    const inputHandler = (e) => {
        if (!create) {
            // if the value of create is false it means we are editing the quiz and in edit we cannot change the value of options . we can change the value of answer
            return;
        }

        const newTextOptionsArr = [...currentObj.textOptionsArr];
        const newImageOptionsArr = [...currentObj.imageOptionsArr];

        if (e.target.name === 'textInput') {
            newTextOptionsArr[ind] = e.target.value;
        }

        if (e.target.name === 'imageInput') {
            newImageOptionsArr[ind] = e.target.value;
        }

        questionsNewArr[clickedNumber - 1] = {
            ...currentObj,
            textOptionsArr: newTextOptionsArr,
            imageOptionsArr: newImageOptionsArr
        }

        setQuestionsArr(questionsNewArr);
    }


    const deleteHandler = () => {
        const newTextOptionsArr = currentObj.textOptionsArr.filter((element, index) => index !== ind);
        const newImageOptionsArr = currentObj.imageOptionsArr.filter((element, index) => index !== ind);


        if (ind === currentObj.rightOptionIndex) {
            questionsNewArr[clickedNumber - 1] = {
                ...currentObj,
                textOptionsArr: newTextOptionsArr,
                imageOptionsArr: newImageOptionsArr,
                rightOptionIndex: -1
            }
        }
        else {
            questionsNewArr[clickedNumber - 1] = {
                ...currentObj,
                textOptionsArr: newTextOptionsArr,
                imageOptionsArr: newImageOptionsArr
            }
        }

        setQuestionsArr(questionsNewArr);
    }



    return (
        <div id={`textandImage${ind}`} className={styled.container}>
            <label className={styled.label}>
                {
                    quizType === 'qna' && (
                        <input type='radio' name='options' className={styled.radioInput} checked={ind === currentObj.rightOptionIndex} onChange={radioHandler} />
                    )
                }
                <input name='textInput' type='text' placeholder='Text' className={styled.textInput} value={currentObj.textOptionsArr[ind]} onChange={inputHandler} />
                <input name='imageInput' type='text' placeholder='ImageURL' className={styled.textInput} value={currentObj.imageOptionsArr[ind]} onChange={inputHandler} />
            </label>
            {
                (create && currentObj.textOptionsArr.length > 2) && (<img className={styled.deleteImg} src={deleteImg} alt='delete' onClick={deleteHandler} />)
            }
        </div>
    )
}

export default TextandImageOption