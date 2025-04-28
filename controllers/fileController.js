import { addFile, getFiles, getFileById, deleteFileById } from '../models/fileModel';
import fs from 'fs';
import path from 'path';

const uploadFile = async(req, res) => {
    if (!req.file) return res.status(400).send('Нет файла для загрузки!');

    const fileData = {
        name: req.file.originalname,
        extension: path.extname(req.file.originalname),
        mimetype: req.file.mimetype,
        size: req.file.size,
        upload_date: new Date()
    };

    const fileId = await addFile(fileData);
    res.json({ id: fileId });
};

const listFiles = async(req, res) => {
    const list_size = parseInt(req.query.list_size) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * list_size;

    const files = await getFiles(list_size, offset);
    res.json(files);
};

const deleteFile = async(req, res) => {
    const file = await getFileById(req.params.id);
    if (!file) return res.status(404).send('Файл не найден!');

    await deleteFileById(req.params.id);

    fs.unlink(path.join(__dirname, '..', 'uploads', file.name), (err) => {
        if (err) console.error('Файл не был удален!');
    });

    res.send('Файл удален!');
};

const getFile = async(req, res) => {
    const file = await getFileById(req.params.id);
    if (!file) return res.status(404).send('Файл не найден');

    res.json(file);
};

const downloadFile = async(req, res) => {
    const file = await getFileById(req.params.id);
    if (!file) return res.status(404).send('Файл не найден!');

    res.download(path.join(__dirname, '..', 'uploads', file.name));
};

const updateFile = async(req, res) => {
    await deleteFile(req, res);
    await uploadFile(req, res);
};

module.exports = { uploadFile, listFiles, deleteFile, getFile, downloadFile, updateFile };