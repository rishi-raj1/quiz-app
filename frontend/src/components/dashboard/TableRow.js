import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';


import editIcon from '../../assets/edit.png';
import deleteIcon from '../../assets/delete.png';
import shareIcon from '../../assets/share.png';


import { DataContext } from '../../context/DataProvider';


import { FRONTEND_URL } from '../../utils/utils';



const TableRow = ({ item, ind }) => {

    const { setEditQuizItem, setQuizAnalysisType, setShowToast } = useContext(DataContext);
    const navigate = useNavigate();

    const date = new Date(item.createdAt);
    let month = date.toLocaleString('en-US', { month: 'short' });
    let day = date.toLocaleString('en-US', { day: '2-digit' });
    let year = date.toLocaleString('en-US', { year: 'numeric' });


    const editHandler = () => {
        if (item.quizType === 'qna') {
            setEditQuizItem('qna');
        }
        if (item.quizType === 'poll') {
            setEditQuizItem('poll');
        }

        navigate(`/editQuiz/${item._id}`);
    }

    const deleteHandler = () => {
        navigate(`/delete/${item._id}`);
    }

    const shareHandler = async () => {
        try {
            await navigator.clipboard.writeText(`${FRONTEND_URL}/livequiz/${item._id}`);
            setShowToast(true);
        }
        catch (err) {
            alert('text is not copied to clipboard . please try again. ');
        }
    }

    const analysisHandler = () => {
        if (item.quizType === 'qna') {
            setQuizAnalysisType('qna');
        }
        if (item.quizType === 'poll') {
            setQuizAnalysisType('poll');
        }

        navigate(`/analysis/${item._id}`);
    }



    return (
        <tr>
            <td style={{
                borderTopLeftRadius: '7px',
                borderBottomLeftRadius: '7px'
            }}>{ind + 1}</td>
            <td style={{
                maxWidth: '150px',
                overflowX: 'auto'
            }}>{item.quizName}</td>
            <td>{`${day} ${month}, ${year}`}</td>
            <td>{item.impression}</td>
            <td>
                <img src={editIcon} alt='edit' onClick={editHandler} />
            </td>
            <td>
                <img src={deleteIcon} alt='delete' onClick={deleteHandler} />
            </td>
            <td>
                <img src={shareIcon} alt='share' onClick={shareHandler} />
            </td>
            <td style={{
                cursor: 'pointer',
                textDecoration: 'underline',
                width: '200px',
                borderTopRightRadius: '7px',
                borderBottomRightRadius: '7px'
            }} onClick={analysisHandler}>
                Question with Analysis
            </td>
        </tr>
    )
}

export default TableRow