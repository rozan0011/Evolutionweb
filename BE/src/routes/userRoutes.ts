// routes/userRoutes.ts
import { Router } from 'express';
import { getAllUsers } from '../controllers/userController';

const router = Router();

// Route untuk mengambil semua pengguna
router.get('/users', getAllUsers);

export default router;