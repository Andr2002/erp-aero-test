import express from 'express';
import router from express.Router();
import { signin, signup, refresh, info, logout } from '../controllers/authController';
import { authenticateToken } from '../middlewares/authMiddleware';

router.post('/signin', signin);
router.post('/signin/new_token', refresh);
router.post('/signup', signup);
router.get('/info', authenticateToken, info);
router.get('/logout', authenticateToken, logout);

module.exports = router;