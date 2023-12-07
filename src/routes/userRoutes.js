import express from 'express';
import {register,login,forgotPassword} from "../controllers/userControllers.js"

const userRouter = express.Router();

userRouter.post('/signup',register);
userRouter.post('/login',login);
userRouter.post('/forgot-password',forgotPassword);

export default userRouter; 