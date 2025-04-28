import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateTokens = (userId) => {
    const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
    const refreshToken = jwt.sign({ id: userId }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

    return { accessToken, refreshToken };
};

const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.REFRESH_SECRET);
};

module.exports = { generateTokens, verifyRefreshToken };