// импортируем необходимые модули
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import fileRoutes from './routes/fileRoutes';
import { authenticateToken } from './middlewares/authMiddleware';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// настраиваем middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// настраиваем пути
app.use('/', authRoutes);
app.use('/file', authenticateToken, fileRoutes);

// обрабатываем ошибки на сервере
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Сервер умер, что-то пошло не так...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту =  ${PORT}`));