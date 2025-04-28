import bcrypt from 'bcrypt';
import { generateTokens, verifyRefreshToken } from '../utils/jwtUtils';
import { findUserById, createUser } from '../models/userModel';

const signin = async(req, res) => {
    const { id, password } = req.body;
    const user = await findUserById(id);
    if (!user) return res.status(400).send(`Пользователь не найден!`);

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).send('Неверный пароль!');

    const tokens = generateTokens(id);
    res.json(tokens);
};

const signup = async(req, res) => {
    const { id, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    await createUser(id, passwordHash);

    const tokens = generateTokens(id);
    res.json(tokens);
};

const refresh = async(req, res) => {
    const { refreshToken } = req.body;
    try {
        const payload = verifyRefreshToken(refreshToken);
        const tokens = generateTokens(payload.id);
        res.json(tokens);
    } catch (err) {
        res.status(403).send('Проблемы с refresh_token');
    }
};

const info = (req, res) => {
    res.json({ id: req.user.id });
};

const logout = (req, res) => {
    // По-хорошему в базе надо бы хранить черный список токенов
    res.status(200).send('Выход из системы');
};

module.exports = { signin, signup, refresh, info, logout };