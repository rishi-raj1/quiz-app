import mongoose from 'mongoose';


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    allQuiz: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    }]
}, {
    timestamps: true
});



const User = mongoose.model('User', userSchema);

export default User; 