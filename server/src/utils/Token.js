const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

// TODO: Adicionar o JWT_SECRET no arquivo .env
const secret = process.env.JWT_SECRET || 'secret';

function generateToken(payload) {
    const token = jwt.sign(payload, secret);

    return token;
}

function verifyToken(token) {
    const payload = jwt.verify(token, secret);

    if (!payload) {
        console.error('Token inválido');
        return null;
    }

    return payload;
}

module.exports = {
    generateToken,
    verifyToken
}