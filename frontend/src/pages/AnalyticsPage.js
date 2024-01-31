import Analytics from '../components/dashboard/Analytics'
import Navbar from '../components/navbar/Navbar';

import styled from './AnalyticsPage.module.css';



const AnalyticsPage = () => {
    return (
        <div className={styled.container}>
            <Navbar />
            <Analytics />
        </div>
    )
}

export default AnalyticsPage