import express from 'express';
const arouter = express.Router();

arouter.get('/',(req,res) =>{
    res.send('HELLO Ali Hussaini')
    
})
export default arouter;
