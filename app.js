import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import arouter from './src/routes/authRoutes.js' 
import userRouter from './src/routes/userRoutes.js';
import transactionRouter from './src/routes/transactionRoutes.js'
dotenv.config();

const app = express();
app.use(express.json()); 
const port = process.env.PORT || 3000;

app.get('/',(req,res) =>{
  res.status(200).send('Application is live');
});

// connect to mongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log('Listening on port: ', port);
    });
  })
  .catch(err => {
    console.error('Could not connect to MongoDB:', err);
  });


app.use("/",arouter);
app.use("/",userRouter);
app.use("/",transactionRouter);
export default app;
