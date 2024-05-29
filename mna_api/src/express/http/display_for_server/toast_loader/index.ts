import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../../../mongo/models/user';
import Toast from '../../../../mongo/models/toast';

const SECRET_KEY = process.env.JWT_SECRET!;

export default {
    handle: "/toast",
    method: "GET",
    description: "Toast loader route for general users",
    route: async (req: Request, res: Response) => {
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
        jwt.verify(token, SECRET_KEY, async (sessionErr, decodedSession) => {
            if (sessionErr || !decodedSession || typeof decodedSession !== 'object' || !('id' in decodedSession)) {
                return res.status(401).json({ success: false, message: 'Failed to authenticate sessionid' });
            }
            try {
                // Vérifiez si l'utilisateur existe
                const user = await User.findById(sessionid);

                if (!user) {
                    res.status(404).json({ success: false, error: "User not found" });
                    return;
                }

                // Récupérez tous les toasts
                const toasts = await Toast.find();
                if (!toasts) {
                    res.status(404).json({ success: false, error: "No toasts found" });
                    return;
                }

                res.status(200).json({ success: true, toasts });
            } catch (error) {
                res.status(500).json({ success: false, error: "An error occurred while loading toasts" });
            }
        });
    }
};

/*
Exemple de requête:
{
    "userId": "60b8d6c8f8d2b5416c0a4b3c"
}
*/
