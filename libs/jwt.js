const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function sign(data, options = {}) {
    return jwt.sign(data, JWT_SECRET, Object.assign({}, { expiresIn: 3600 }, options ));
}

function verify(toke, options = {}) {
    return jwt.verify(toke, JWT_SECRET, options);
}

module.exports = { sign, verify };
