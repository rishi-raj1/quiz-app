import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';


import userRoutes from './routes/userRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';



const app = express();

dotenv.config();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use('/api/user', userRoutes);
app.use('/api/quiz', quizRoutes);

app.use(notFound);
app.use(errorHandler);



const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;




app.listen(PORT, async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`server is running at PORT: ${PORT} and database is connected successfully`);
    }
    catch (err) {
        console.log('database not connected ');
    }
});