const jwt = require('jsonwebtoken');

const generateJWTTokens = (payload) => {
    const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "30m"
    });
    const refresh_token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d"
    });

    return {
        access_token,
        refresh_token
    }
}

module.exports = {
    generateJWTTokens
}