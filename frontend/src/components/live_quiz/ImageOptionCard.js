import { useEffect } from 'react';


import styled from './ImageOptionCard.module.css';




const ImageOptionCard = ({ item, ind, currentQuestionNumber, answersArr, setAnswersArr, clickedOptionQuestionNumber, setClickedOptionQuestionNumber }) => {

    // i have write useeffect to remove active class from selected option of previous question because before this code if i select option 1 or 2 or any other then that numbered option in next question was automatically selected means active class was already added in that numbered option

    useEffect(() => {
        const elements = document.getElementsByClassName(styled.container);

        if (clickedOptionQuestionNumber !== -1 && clickedOptionQuestionNumber !== currentQuestionNumber) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.remove(styled.active);
            }
        }
    })


    const clickHandler = (e) => {
        const elements = document.getElementsByClassName(styled.container);
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove(styled.active);
        }

        e.target.classList.add(styled.active);

        const newAnswersArr = [...answersArr];
        newAnswersArr[currentQuestionNumber - 1] = ind;

        setAnswersArr(newAnswersArr);
        setClickedOptionQuestionNumber(currentQuestionNumber);
    }


    return (
        <div className={styled.container} onClick={clickHandler}>
            <img src={item} alt='bird' className={styled.image} />
        </div>
    )
}

export default ImageOptionCard