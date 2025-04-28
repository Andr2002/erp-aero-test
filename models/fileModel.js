import db from '../config/db';

const addFile = async(fileData) => {
    const { name, extension, mimetype, size, upload_date } = fileData;
    const [result] = await db.query(`INSERT INTO files (name, extension, mimetype, size, upload_date) VALUES (${name}, ${extension}, ${mimetype}, ${size}, ${upload_date})`);
    return result.insertId;
};

const getFiles = async(limit, offset) => {
    const [rows] = await db.query(`SELECT * FROM files LIMIT ${limit} OFFSET ${offset}`);
    return rows;
};

const getFileById = async(id) => {
    const [rows] = await db.query(`SELECT * FROM files WHERE id = ${id}`);
    return rows[0];
};

const deleteFileById = async(id) => {
    await db.query(`DELETE FROM files WHERE id = ${id}`);
};

module.exports = { addFile, getFiles, getFileById, deleteFileById };