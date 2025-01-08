// controllers/userController.ts
import { Request, Response } from 'express';
import { DBconnection } from '../config/db';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const [rows] = await DBconnection.query('SELECT * FROM Register');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};