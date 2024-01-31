import { useContext, useEffect, useState } from 'react';
import axios from 'axios';


import styled from './Analytics.module.css';


import TableRow from './TableRow';
import Toast from './Toast';


import { DataContext } from '../../context/DataProvider';


import { BACKEND_URL } from '../../utils/utils';


const Analytics = () => {

    const { showToast } = useContext(DataContext);

    const config = {
        headers: {
            'Authorization': JSON.parse(localStorage.getItem('token'))
        }
    }

    const [quizArr, setQuizArr] = useState([]);


    const fetchQuizzes = async () => {
        try {
            const { data } = await axios.get(`${BACKEND_URL}/api/quiz/allQuiz`, config);
            setQuizArr(data.allQuiz);
        }
        catch (err) {
            if (err.response) {
                alert(err.response.data.message);
            }
            else if (err.request) {
                alert(err.request);
            }
            else {
                alert(err.message);
            }
        }

    }

    useEffect(() => {
        fetchQuizzes();
    }, []);




    return (
        <div className={styled.container}>
            {
                showToast ? (
                    <div className={styled.toastDiv}>
                        <Toast />
                    </div>
                ) : <></>
            }

            <p className={styled.heading}>Quiz Analysis</p>
            <div className={styled.tableDiv}>
                <table>
                    <thead>
                        <tr className={styled.tableHeading}>
                            <td style={{
                                borderTopLeftRadius: '7px',
                                borderBottomLeftRadius: '7px'
                            }} >S. No</td>
                            <td >Quiz Name</td>
                            <td >Created on</td>
                            <td >Impression</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td style={{
                                borderTopRightRadius: '7px',
                                borderBottomRightRadius: '7px'
                            }}></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            quizArr.map((item, ind) => (
                                <TableRow key={ind} item={item} ind={ind} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Analytics