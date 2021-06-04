const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.headers['token'];
    
    if (!token) {
      return res.status(401).json({ auth: false, message: 'No token provided.' });
    };

    jwt.verify(token, 'stubJWT', function(err, decoded) {
      if (err) 
      return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      next();
    });
}