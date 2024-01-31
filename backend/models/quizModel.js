import mongoose from 'mongoose';



const quizSchema = mongoose.Schema({
    quizName: {
        type: String,
        required: true,
    },
    quizType: {
        type: String,
        enum: ['qna', 'poll'],
        required: true
    },
    questionsArr: [{
        questionName: {
            type: String,
            required: true
        },
        optionType: {
            type: String,
            enum: ['text', 'imageURL', 'textandImageURL'],
            required: true
        },
        textOptionsArr: [{ type: String }],
        imageOptionsArr: [{ type: String }],
        rightOptionIndex: {
            type: Number,
            enum: [-1, 0, 1, 2, 3],
            required: true
        },
        correctAttempt: {
            type: Number,
            required: true,
            default: 0
        },
        incorrectAttempt: {
            type: Number,
            required: true,
            default: 0
        },
        pollOptionCount: [{ type: Number }]
    }],
    impression: {
        type: Number,
        required: true
    },
    timer: {
        type: String,
        enum: ['off', '5sec', '10sec'],
        required: true
    }
}, {
    timestamps: true
});


const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;