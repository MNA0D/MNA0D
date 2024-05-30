import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../../../mongo/models/user';

const SECRET_KEY = process.env.JWT_SECRET!;

export default {
    handle: "/authguard",
    method: "POST",
    description: "Route to check JWT token validity",
    route: async (req: Request, res: Response) => {
        try {
            // Vérifiez si le token est présent
            const authHeader = req.headers['authorization'];
            if (!authHeader) return res.status(401).json({ success: false, message: 'No token provided' });

            // Séparez les deux tokens
            const tokens = authHeader.split(' ')[1].split(',');
            if (tokens.length !== 2) return res.status(401).json({ success: false, message: 'Invalid token format' });

            const [token, sessionid] = tokens;

            // Vérifiez le token principal
            jwt.verify(token, SECRET_KEY, async (err, decodedToken) => {
                if (err || !decodedToken || typeof decodedToken !== 'object' || !('id' in decodedToken)) return res.status(401).json({ success: false, message: 'Failed to authenticate token' });

                const user = await User.findById(sessionid).catch(err => null);
                if (!user) return res.status(404).json({ success: false, message: 'User not found' });

                res.status(200).json({ success: true, message: 'Token is valid', user: { id: user._id, mail: user.mail, admin: user.admin } });
            });
        } catch (error) {
            res.status(500).json({ success: false, error: 'An error occurred while checking token validity' });
        }
    }
};
