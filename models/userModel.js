import db from '../config/db';

const findUserById = async(id) => {
    const [rows] = await db.query(`SELECT * FROM users WHERE id = ${id};`);
    return rows[0];
};

const createUser = async(id, passwordHash) => {
    await db.query(`INSERT INTO users (id, password) VALUES (${id}, ${passwordHash});`);
};

module.exports = { findUserById, createUser };