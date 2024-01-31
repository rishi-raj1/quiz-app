import { useContext } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';


import styled from './QuizLinkShare.module.css';


import cross from '../../assets/cross.png';
import Toast from './Toast';


import { DataContext } from '../../context/DataProvider';

import { FRONTEND_URL } from '../../utils/utils';


const QuizLinkShare = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { quizId } = useParams();
    const pathname = location.pathname;
    const create = pathname.includes('/createQuiz');

    const { showToast, setShowToast, createdQuizId, setCreateQuizItem } = useContext(DataContext);



    const crossHandler = () => {
        setCreateQuizItem('createquiz');
        if (create) {
            navigate('/dashboard');
        }
        else {
            navigate('/analytics');
        }
    }

    const shareHandler = async () => {
        const elem = document.getElementsByClassName(styled.quizLink)[0];
        const textToBeCopied = elem.textContent;

        try {
            await navigator.clipboard.writeText(textToBeCopied);
            setShowToast(true);
        }
        catch (err) {
            alert('text is not copied to clipboard . please try again. ');
        }
    }

    return (
        <div className={styled.container}>
            <div className={styled.centeredDiv}>
                <img className={styled.crossImg} src={cross} alt='cross' onClick={crossHandler} />
                {
                    showToast ? (
                        <div className={styled.toastDiv}>
                            <Toast />
                        </div>
                    ) : <></>
                }
                <p className={styled.heading}>
                    Congrats your Quiz is Published!
                </p>
                <div className={styled.quizLink}>
                    {`${FRONTEND_URL}/livequiz/${create ? createdQuizId : quizId}`}
                </div>
                <span className={styled.share} onClick={shareHandler}>
                    Share
                </span>
            </div>
        </div>
    )
}

export default QuizLinkShare