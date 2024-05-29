import { Request, Response } from 'express';
import User from '../../../../mongo/models/user';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET!;

export default {
    handle: "/authguard-admin",
    method: "POST",
    description: "Admin authentication guard route",
    route: async (req: Request, res: Response) => {
        try {
            const authHeader = req.headers['authorization'];

            if (!authHeader) {
                return res.status(401).json({ success: false, message: 'No token provided' });
            }

            // Séparez les deux tokens
            const tokens = authHeader.split(' ')[1].split(',');

            if (tokens.length !== 2) {
                return res.status(401).json({ success: false, message: 'Invalid token format' });
            }

            const [token, sessionid] = tokens;

            // Vérifiez le token principal
            jwt.verify(token, SECRET_KEY, async (err, decodedToken) => {
                if (err || !decodedToken || typeof decodedToken !== 'object' || !('id' in decodedToken)) {
                    return res.status(401).json({ success: false, message: 'Failed to authenticate token' });
                }

                const user = await User.findById(sessionid).catch((err) => {
                    return null;
                }
                );

                if (!user) {
                    return res.status(404).json({ success: false, error: "User not found" });
                }

                if (!user.admin) {
                    return res.status(403).json({ success: false, error: "Admin access required" });
                }

                // Si l'utilisateur est admin, continuer le traitement
                res.status(200).json({ success: true, message: "Admin access granted" });

            });

        } catch (error) {
            res.status(500).json({ success: false, error: "An error occurred while checking admin status" });
        }
    }
};
