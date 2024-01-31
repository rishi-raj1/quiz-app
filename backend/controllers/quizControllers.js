import Quiz from "../models/quizModel.js";
import User from "../models/userModel.js";



export const createQuiz = async (req, res) => {
    try {
        const { quizName, quizType, questionsArr, timer } = req.body;
        const { userId } = req.user;

        if (quizName.trim().length === 0 || quizType.trim().length === 0 || questionsArr.length === 0) {
            return res.status(400).json({ message: 'all fields are required' });
        }


        // Append correctAttempt and incorrectAttempt and pollOptionCount field into each question of questionsArr
        const len = questionsArr.length;

        for (let i = 0; i < len; i++) {
            questionsArr[i].correctAttempt = 0;
            questionsArr[i].incorrectAttempt = 0;

            const len2 = questionsArr[i].textOptionsArr.length;
            const pollOptionCount = Array(len2).fill(0);

            questionsArr[i].pollOptionCount = pollOptionCount;
        }

        const quizObj = {
            quizName, quizType, questionsArr, impression: 0, timer
        }
        const newQuiz = new Quiz(quizObj);
        await newQuiz.save();


        //  push the newly created quiz id in allQuiz array of User model

        const user = await User.findById(userId);
        const { allQuiz } = user;
        allQuiz.push(newQuiz._id);

        await User.findByIdAndUpdate(userId, { allQuiz });

        return res.status(200).json({ message: 'quiz created successfully', quizId: newQuiz._id });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export const updateQuiz = async (req, res) => {
    try {
        const { questionsArr } = req.body;
        const { quizId } = req.params;
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({ message: 'quiz not found' });
        }

        await Quiz.findByIdAndUpdate(quizId, { questionsArr });

        return res.status(200).json({ message: 'quiz updated successfully' });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export const deleteQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({ message: 'quiz not found' });
        }

        await Quiz.findByIdAndDelete(quizId);

        const { userId } = req.user;
        const user = await User.findById(userId);
        const { allQuiz } = user;

        let newAllQuiz = allQuiz.filter((item) => item !== quizId);

        await User.findByIdAndUpdate(userId, { allQuiz: newAllQuiz });

        return res.status(200).json({ message: 'quiz deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export const getQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({ message: 'quiz cannot find' });
        }

        return res.status(200).json({ quiz });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export const getAllQuiz = async (req, res) => {
    try {
        const { userId } = req.user;
        const user = await User.findById(userId).populate('allQuiz');
        const allQuiz = user.allQuiz;

        return res.status(200).json({ allQuiz });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export const getLiveQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const quiz = await Quiz.findById(quizId);
        const { impression } = quiz;
        await Quiz.findByIdAndUpdate(quizId, { impression: impression + 1 });

        return res.status(200).json({ quiz });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export const submitLiveQuiz = async (req, res) => {
    try {
        const { answersArr } = req.body;
        const { quizId } = req.params;

        const quiz = await Quiz.findById(quizId);
        const { questionsArr } = quiz;

        const len = questionsArr.length;

        if (quiz.quizType === 'qna') {
            for (let i = 0; i < len; i++) {
                const rightAnswer = questionsArr[i].rightOptionIndex;
                if (rightAnswer === Number(answersArr[i])) {
                    questionsArr[i].correctAttempt++;
                }
                else {
                    questionsArr[i].incorrectAttempt++;
                }
            }
        }
        else {
            for (let i = 0; i < len; i++) {
                const choosedOption = Number(answersArr[i]);

                if (choosedOption !== -1) {
                    questionsArr[i].pollOptionCount[choosedOption]++;
                }
            }
        }

        await Quiz.findByIdAndUpdate(quizId, { questionsArr });

        return res.status(200).json({ message: 'quiz submitted successfully' });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}