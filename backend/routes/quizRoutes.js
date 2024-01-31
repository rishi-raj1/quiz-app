import express from 'express';
import { createQuiz, deleteQuiz, getAllQuiz, getQuiz, updateQuiz, getLiveQuiz, submitLiveQuiz } from '../controllers/quizControllers.js';
import { authenticateToken } from '../middleware/authMiddleware.js';


const router = express.Router();



router.get('/getQuiz/:quizId', authenticateToken, getQuiz);
router.get('/allQuiz', authenticateToken, getAllQuiz);
router.post('/create', authenticateToken, createQuiz);
router.delete('/delete/:quizId', authenticateToken, deleteQuiz);
router.put('/update/:quizId', authenticateToken, updateQuiz);
router.get('/getLiveQuiz/:quizId', getLiveQuiz);
router.post('/submitLiveQuiz/:quizId', submitLiveQuiz);


export default router;