import { useEffect } from 'react';


import styled from './Timer.module.css';




const Timer = ({ timer, setTimer }) => {

    useEffect(() => {
        const elements = document.getElementsByClassName(styled.timerValue);

        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove(styled.active);

            if (elements[i].dataset.value === timer) {
                elements[i].classList.add(styled.active);
            }
        }
    });


    const timerHandler = (e) => {
        setTimer(e.target.dataset.value);
    }




    return (
        <div className={styled.container}>
            <span className={styled.heading}>Timer</span>
            <span data-value='off' className={styled.timerValue} onClick={timerHandler}>OFF</span>
            <span data-value='5sec' className={styled.timerValue} onClick={timerHandler}>5 sec</span>
            <span data-value='10sec' className={styled.timerValue} onClick={timerHandler}>10 sec</span>
        </div>
    )
}

export default Timer