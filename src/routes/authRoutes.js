import express from 'express';
const arouter = express.Router();

// Add your route handlers here
arouter.get('/',(req,res) =>{
    res.send('HELLO Ali Hussaini')
    
})
export default arouter;
