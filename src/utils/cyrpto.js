import crypto from 'crypto';


export const generateDecryptKey = (userID) => {
    const secret = process.env.SECRET_DECRYPT ;
    let key = crypto.createHmac('sha256', secret)
                    .update(userID.toString())
                    .digest();
    if (key.length > 32) {
        key = key.slice(0, 32); // Truncate to 32 bytes
    } else if (key.length < 32) {
        key = Buffer.concat([key, Buffer.alloc(32 - key.length)]); // Pad to 32 bytes
    }
    return key;
};


export const encryptData = (data, secretKey) => {
    const iv = crypto.randomBytes(16); // Initialization vector
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

export const decryptData = (encryptedData, secretKey) => {
    let [iv, encrypted] = encryptedData.split(':');
    iv = Buffer.from(iv, 'hex');
    encrypted = Buffer.from(encrypted, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};


// const testID = "1234";
// const generatedKey = generateDecryptKey(testID);
// console.log('Generated Key : ',typeof(generatedKey),generatedKey);
// const Data = "I am sending you 100 USD";
// const generateToken = encryptData(Data,generatedKey)
// console.log('Generated Token: ',generateToken)
// console.log('Decrypted Token: ',decryptData(generateToken,generatedKey))