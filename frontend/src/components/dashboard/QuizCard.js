import styled from './QuizCard.module.css';


import eyes from '../../assets/eyes.png';




const QuizCard = ({ item, ind }) => {

    const date = new Date(item.createdAt);
    let month = date.toLocaleString('en-US', { month: 'short' });
    let day = date.toLocaleString('en-US', { day: '2-digit' });
    let year = date.toLocaleString('en-US', { year: 'numeric' });


    return (
        <div className={styled.container}>
            <div className={styled.topDiv}>
                <span className={styled.quizName}>{item.quizName}</span>
                <div className={styled.rightDiv}>
                    <span className={styled.impression}>{item.impression}</span>
                    <img src={eyes} alt='eyes' className={styled.eyeImage} />
                </div>
            </div>
            <p className={styled.date}>Created on: {`${day} ${month}, ${year}`}</p>
        </div>
    )
}

export default QuizCard