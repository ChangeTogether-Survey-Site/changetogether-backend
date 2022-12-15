const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // check token
    try {
        const token = req.headers.authorization.split(" ")[1]; // "Bearer token_values"
        const decodedToken = jwt.verify(token, 'Chewbacca');
        req.userData = { email: decodedToken.email, userId: decodedToken.userId };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Auth incorrect'});
    }
};