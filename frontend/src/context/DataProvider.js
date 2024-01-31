import { createContext, useState } from "react";

export const DataContext = createContext(null);


const DataProvider = ({ children }) => {

    const [showToast, setShowToast] = useState(false);

    const [quizName, setQuizName] = useState('');
    const [quizType, setQuizType] = useState('');

    const [questionsArr, setQuestionsArr] = useState([{
        questionName: '',
        optionType: 'text',
        textOptionsArr: ['', ''],
        imageOptionsArr: ['', ''],
        rightOptionIndex: -1
    }]);

    const [clickedNumber, setClickedNumber] = useState(1);

    const [quizAnalysisType, setQuizAnalysisType] = useState('');
    const [createQuizItem, setCreateQuizItem] = useState('createquiz');
    const [editQuizItem, setEditQuizItem] = useState('');
    const [createdQuizId, setCreatedQuizId] = useState('');

    return (
        <DataContext.Provider value={{
            showToast, setShowToast, quizName, setQuizName, quizType, setQuizType, questionsArr, setQuestionsArr, clickedNumber, setClickedNumber, quizAnalysisType, setQuizAnalysisType, createQuizItem, setCreateQuizItem, editQuizItem, setEditQuizItem, createdQuizId, setCreatedQuizId
        }}>
            {children}
        </DataContext.Provider>
    )
}


export default DataProvider;
