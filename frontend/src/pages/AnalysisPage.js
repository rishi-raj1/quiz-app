import React, { useContext } from 'react'



import Navbar from '../components/navbar/Navbar'
import QnAAnalysis from '../components/dashboard/QnAAnalysis'
import PollTypeAnalysis from '../components/dashboard/PollTypeAnalysis';


import styled from './AnalysisPage.module.css';


import { DataContext } from '../context/DataProvider';




const AnalysisPage = () => {
    const { quizAnalysisType } = useContext(DataContext);


    return (
        <div className={styled.container}>
            <Navbar />
            {
                quizAnalysisType === 'qna' ? <QnAAnalysis /> : <PollTypeAnalysis />
            }
        </div>
    )
}

export default AnalysisPage