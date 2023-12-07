import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { generateDecryptKey } from '../utils/cyrpto.js';
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    decryptKey: {
        type: Buffer,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save',async function(next){
    if (this.isModified('password')){
        this.password= await bcrypt.hash(this.password,12);
    }
    if (!this.decryptKey) {
        this.decryptKey = generateDecryptKey(this._id.toString());
    }
    next();
});
export default mongoose.model('User', userSchema);