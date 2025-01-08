// api/hello.ts
import { VercelRequest, VercelResponse } from '@vercel/node';

export default (req: VercelRequest, res: VercelResponse) => {
    res.status(200).json({ message: 'Hello from Vercel!' });
};