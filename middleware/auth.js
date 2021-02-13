 const jwt = require('jsonwebtoken');
 const config = require('config');

 module.exports = function(req, res, next) {
    // Get token from the header as token is sent via it
    const token = req.header('x-auth-token');

    // Check if no token in header
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorisation denied' }); // 401 = Not authorised
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret')); // decode information from token

        req.user = decoded.user; // Unpack the user variable that came from token into the user
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
 }
