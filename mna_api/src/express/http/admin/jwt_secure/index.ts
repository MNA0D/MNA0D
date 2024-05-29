import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET!;

export default {
    handle: "/authguard",
    method: "POST",
    description: "Route to check JWT token validity",
    route: (req: Request, res: Response) => {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Failed to authenticate token' });
            }

            res.status(200).json({ success: true, message: 'Token is valid', decoded });
        });
    }
};
