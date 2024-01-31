import styled from './QuestionCardQnA.module.css';





const QuestionCardQnA = ({ item, ind }) => {
    return (
        <div className={styled.container}>
            <p className={styled.questionPara}>
                Q.{ind + 1}) {item.questionName}
            </p>
            <div className={styled.info}>
                <div className={styled.infoCard}>
                    <span>{item.correctAttempt + item.incorrectAttempt}</span>
                    <p>people Attempted the question</p>
                </div>
                <div className={styled.infoCard}>
                    <span>{item.correctAttempt}</span>
                    <p>people Answered Correctly</p>
                </div>
                <div className={styled.infoCard}>
                    <span>{item.incorrectAttempt}</span>
                    <p>people Answered Incorrectly</p>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default QuestionCardQnA