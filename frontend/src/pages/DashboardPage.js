import { useContext } from 'react'



import Analytics from '../components/dashboard/Analytics';
import CreateQuiz from '../components/dashboard/CreateQuiz';
import Dashboard from '../components/dashboard/Dashboard'
import Delete from '../components/dashboard/Delete';
import PollQuestion from '../components/dashboard/PollQuestion';
import PollTypeAnalysis from '../components/dashboard/PollTypeAnalysis';
import QnA from '../components/dashboard/QnA';
import QnAAnalysis from '../components/dashboard/QnAAnalysis';
import QuizLinkShare from '../components/dashboard/QuizLinkShare';
import Navbar from '../components/navbar/Navbar'


import styled from './DashboardPage.module.css';




const DashboardPage = () => {

    return (
        <div className={styled.container}>
            <Navbar />
            <Dashboard />
        </div>
    )
}

export default DashboardPage