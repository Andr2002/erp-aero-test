import express from 'express';
import multer from 'multer';
import router from express.Router();
import { uploadFile, listFiles, deleteFile, getFile, downloadFile, updateFile } from '../controllers/fileController';

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), uploadFile);
router.get('/list', listFiles);
router.delete('/delete/:id', deleteFile);
router.get('/:id', getFile);
router.get('/download/:id', downloadFile);
router.put('/update/:id', upload.single('file'), updateFile);

module.exports = router;