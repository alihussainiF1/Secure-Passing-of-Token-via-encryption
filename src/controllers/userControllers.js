import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middleware/jwtMiddleware.js';

export const register = async (req, res) => {
    console.log('body',req.body);
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }
        console.log('Hello the code is here')
        const user = new User({ username, email, password });
        console.log('User : ',user);
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.log('Error',error)
        res.status(500).send('Error registering user');
    }
};

export const login = async(req,res) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if (!user || !await bcrypt.compare(password,user.password)){
            return res.status(401).send('Invalid credentials');
        }
    

    const token = generateToken({"userId":user._id,"email":user.email});
    res.status(200).json(({'message':"Login Successful","token":token}));
    }catch (error){
        console.log('Error',error)
        res.status(500).send('Error Login');
    }
};

export const forgotPassword = async(req,res) => {
    res.status(200).send('need to implement');
};