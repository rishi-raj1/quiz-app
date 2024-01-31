import styled from './QuestionCardPoll.module.css';



const PollOption = ({ element, index }) => {
    return (
        <div className={styled.infoCard}>
            <span>{element}</span>
            <p>Option {index + 1}</p>
        </div>
    )
}


const QuestionCardPoll = ({ item, ind }) => {
    return (
        <div className={styled.container}>
            <p className={styled.questionPara}>
                Q.{ind + 1}) {item.questionName}
            </p>
            <div className={styled.info}>
                {
                    item.pollOptionCount.map((element, index) => (
                        <PollOption element={element} index={index} />
                    ))
                }
            </div>
            <hr />
        </div>
    )
}

export default QuestionCardPoll