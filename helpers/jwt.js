const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const ERR_MESSAGE = 'Expired or invalid token';

const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
};

const createToken = ({ id, displayName, email }) => {
    const token = jwt.sign({ id, displayName, email }, secret, jwtConfig);
    return token;
};

const decodifyToken = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        error.message = ERR_MESSAGE;
        throw error;
    }
};

module.exports = {
    createToken,
    decodifyToken,
};
