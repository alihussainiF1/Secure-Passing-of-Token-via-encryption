import Transaction from '../models/Transaction.js';
import User from '../models/User.js';
import { encryptData,decryptData } from '../utils/cyrpto.js';


// splitting trandactions 
// keep track of addresses 
// coins created 
// coins 
export const createTransaction = async (req, res) => {
    // Logic to create a transaction
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
    // Assuming you get the user's email or ID from the request or JWT token
    const userId = req.user.userId;
    console.log('User ID: ',userId,typeof(userId));
    try {
        // Find user by email or ID
        console.log('hellopw')
        const user = await User.findById(userId); // or User.findById(userId);
        console.log('yolo',user)
        if (!user) {
            return res.status(404).send('User not found');
        }
        const transactions = await Transaction.find({ receiverId: userId });

        if(!transactions){
            return res.status(404).send('Transaction Id not found');
        }
        // Decrypt each transaction's encryptedToken
        const decryptedTransactions = transactions.map(transaction => {
            const decryptedString = decryptData(transaction.encryptedToken, user.decryptKey);
        
            // Assuming the decrypted string format is "email has sent amount"
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
        if (!user) {
            return res.status(404).send('User not found');
        }

        const transactions = await Transaction.find({ senderId: senderId });

        if (!transactions.length) {
            return res.status(404).send('No transactions found from this sender');
        }

        const decryptedTransactions = transactions.map(transaction => {
            const decryptedString = decryptData(transaction.encryptedToken, user.decryptKey);
            
            // Assuming the decrypted string format is "email has sent amount"
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

// Additional controller functions as needed
