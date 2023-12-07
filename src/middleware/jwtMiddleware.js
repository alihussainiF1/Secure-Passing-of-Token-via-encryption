import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
const secretKey = process.env.JWT_SECRET ;

export const generateToken = (payload) => {
    return jwt.sign(payload,secretKey,{expiresIn:'1h'});

};

export const verifyToken = (req,res,next) => {

    const token = req.headers['authorization'];

    if(!token){
        return res.status(403).send('A token is required for authentication');
    }

    try {
        const decoded = jwt.verify(token,secretKey);
        req.user = decoded;


    }catch (err){
        return res.status(401).send('Invalid token');
    }
    return next();
};


// // Testing the code 
// // Mock Express.js req and res objects
// const mockReq = {
//     headers: {
//       authorization: '' // Token will be assigned here after generation
//     }
//   };
  
//   const mockRes = {
//     status: function(statusCode) {
//       this.statusCode = statusCode;
//       return this;
//     },
//     send: function(message) {
//       this.message = message;
//       return this;
//     }
//   };
  
//   // Next function to simulate Express.js behavior
//   const next = (error) => {
//     if (error) {
//       console.error('Error during verifyToken:', error.message);
//     } else {
//       console.log('Token verification passed.');
//     }
//   };
  
//   // Test payload
//   const payload = {
//     id: 1,
//     username: 'testuser'
//   };
  
//   // Generate a token
//   const token = generateToken(payload);
//   mockReq.headers['authorization'] = token; // Assign generated token to mock request headers
//   console.log('Generated Token:', token);
  
//   // Attempt to verify the token
//   verifyToken(mockReq, mockRes, next);
  
   