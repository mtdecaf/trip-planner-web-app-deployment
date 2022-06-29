const jwt = require('jsonwebtoken');

// verify the token middleware
module.exports = (req, res, next) => {
    // Must have headers: Authorization: `Bearer ${token}`
    if (!req.headers.authorization) {
        return res.sendStatus(400);
    }

    // get token from header
    const token = req.headers.authorization.split(" ")[1];
    // use jwt.verify with our secret key to validate the token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        // if invalid token, send 403
        if (err) {
            return res.status(403).json({
                message: "Invalid token provided"
            })
        };
        req.decoded = decoded;
        next();
    })
}