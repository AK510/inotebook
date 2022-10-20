const jwt = require('jsonwebtoken');
const JWT_SECRET = "dhruvvagadiya";

const fetchuser = (req, res, next) => {
    //get user from the jwt token and add it to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error : "Please authenticate using a valid token"});
    }

    try {
        //verify token using signature key
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error : "Please authenticate using a valid token"});
    }
}

module.exports = fetchuser;