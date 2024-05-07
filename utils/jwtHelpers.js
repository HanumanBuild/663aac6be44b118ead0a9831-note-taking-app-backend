const jwt = require('jsonwebtoken');

const signToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

module.exports = { signToken };