const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // check token
    try {
        const token = req.headers.authorization.split(" ")[1]; // "Bearer token_values"
        jwt.verify(token, 'Chewbacca');
        next();
    } catch (error) {
        res.status(401).json({ message: 'Auth incorrect'});
    }
};