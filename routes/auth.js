
const admin = require('firebase-admin');
const serviceAccount = require('../key/contactlists-3133d-firebase-adminsdk-trtix-27d2f37fc5.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
    
  
async function verifyToken(req, res, next) {
    console.log(req)
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: 'Missing Authorization header'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({
            error: 'Invalid token'
        });
    }
}

module.exports = {
    verifyToken,
  };