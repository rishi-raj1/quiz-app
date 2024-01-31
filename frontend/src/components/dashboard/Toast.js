import { useContext, useEffect } from 'react';


import styled from './Toast.module.css';


import tickCircle from '../../assets/tick-circle.png';
import cross from '../../assets/cross.png';


import { DataContext } from '../../context/DataProvider';




const Toast = () => {

    const { setShowToast } = useContext(DataContext);


    const crossHandler = () => {
        setShowToast(false);
    }



    useEffect(() => {
        const elem = document.getElementsByClassName(styled.lowerDiv)[0];

        const width = elem.offsetWidth;
        const decreaseByWidth = width / 100;


        const intervalId = setInterval(() => {
            const currentWidth = elem.offsetWidth;
            const newWidth = currentWidth - decreaseByWidth;

            elem.style.width = `${newWidth}px`;
        }, 50);


        const timeoutId = setTimeout(() => {
            clearInterval(intervalId);
            setShowToast(false);
        }, 5000);


        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        };

    }, [setShowToast]);

    return (
        <div className={styled.container}>
            <div className={styled.upperDiv}>
                <img className={styled.tickCircle} src={tickCircle} alt='tick-circle' />
                <p>Link copied to clipboard</p>
                <img className={styled.cross} src={cross} alt='cross' width='10px' height='10px' onClick={crossHandler} />
            </div>
            <div className={styled.lowerDiv}>

            </div>

        </div>
    )
}

export default Toast