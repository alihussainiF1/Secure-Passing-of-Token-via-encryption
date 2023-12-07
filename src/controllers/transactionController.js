import Transaction from '../models/Transaction.js';
import User from '../models/User.js';
import { encryptData,decryptData } from '../utils/cyrpto.js';

export const createTransaction = async (req, res) => {
    const {sender_email,receiver_email,amount} = req.body;
    try {
        const sender_user = await User.findOne({email:sender_email});
        const receiver_user = await User.findOne({email:receiver_email});
        if (!sender_user){
            return res.status(400).send('User not found')
        }

        if(!receiver_user){
            return res.status(400).send('Receiver does not exist');
        }

        const senderId = sender_user._id;
        const receiverId = receiver_user._id;
        const data = `${sender_email} has sent ${amount}`;
        const encryptedToken = encryptData(data,receiver_user.decryptKey);
        console.log('Encrypted Data: ',encryptedToken);

        const new_transaction = new Transaction({senderId,receiverId,encryptedToken});
        await new_transaction.save();

    }catch(error){
        console.log("Error: ",error);
        res.status(500).send('Error creating transaction');
    }
    res.status(200).send("Transaction Created")
};

export const getTransactions = async (req, res) => {
    const userId = req.user.userId;
    console.log('User ID: ',userId,typeof(userId));
    try {

        const user = await User.findById(userId); 
        console.log('yolo',user)
        if (!user) {
            return res.status(404).send('User not found');
        }
        const transactions = await Transaction.find({ receiverId: userId });

        if(!transactions){
            return res.status(404).send('Transaction Id not found');
        }
        const decryptedTransactions = transactions.map(transaction => {
            const decryptedString = decryptData(transaction.encryptedToken, user.decryptKey);
        
            const [senderEmail, , , amount] = decryptedString.split(' ');
            
            const decryptedData = {
                senderEmail,
                amount
            };
        
            return {
                ...transaction.toObject(),
                decryptedData
            };
        });

        res.status(200).json(decryptedTransactions);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).send('Error retrieving transactions');
    }
};


export const getTransactionsBySender = async (req, res) => {
    const userId = req.user.userId;
    const senderId = req.params.senderId;
    console.log("helllo ali yolo")
    try {
        const user = await User.findById(userId);
        console.log("User: ",user);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const transactions = await Transaction.find({ senderId: senderId });
        console.log('Trx:',transactions)
        if (!transactions.length || !transactions) {
            return res.status(404).send('No transactions found from this sender');
        }

        const decryptedTransactions = transactions.map(transaction => {
            console.log('hi')
            const decryptedString = decryptData(transaction.encryptedToken, user.decryptKey);
            console.log("YOUOYOYO: ",decryptedString)
            const [receiverEmail, , , amount] = decryptedString.split(' ');
            
            const decryptedData = {
                receiverEmail,
                amount
            };
        
            return {
                ...transaction.toObject(),
                decryptedData
            };
        });

        res.status(200).json(decryptedTransactions);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).send('Error retrieving transactions');
    }
};

