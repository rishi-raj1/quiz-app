import User from "../models/userModel.js";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();



export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email.trim().length === 0 || password.trim().length === 0) {
            return res.status(400).json({ message: 'all fields are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'no user found of this email' });
        }
        else {
            const hashedPassword = user.password;
            const match = await bcrypt.compare(password, hashedPassword);

            if (match) {
                const token = jwt.sign({ userId: user._id }, process.env.ACCESS_SECRET_KEY, { expiresIn: '2h' });
                return res.status(200).json({ message: 'login successfull', token });
            }
            else {
                return res.status(401).json({ message: 'wrong email or password' });
            }
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
            return res.status(400).json({ message: 'all fields are required' });
        }

        const users = await User.findOne({ email });
        if (users) {
            return res.status(409).json({ message: 'please change email' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = {
            name, email, password: hashedPassword, allQuiz: []
        }
        const newUser = new User(user);
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.ACCESS_SECRET_KEY, { expiresIn: '2h' });
        return res.status(200).json({ message: 'signup successfull', token });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }

}