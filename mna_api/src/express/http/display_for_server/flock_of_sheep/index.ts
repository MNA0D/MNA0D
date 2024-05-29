import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Sheep from '../../../../mongo/models/sheep';
import User from '../../../../mongo/models/user';
import { cp } from 'fs';

const SECRET_KEY = process.env.JWT_SECRET!;

export default {
    handle: "/flock-of-sheep",
    method: "GET",
    description: "Route to get all sheep data",
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

        // Vérifiez le token de session pour obtenir l'ID de l'utilisateur
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

                // Récupérez tous les sheep
                const sheep = await Sheep.find();
                if (!sheep) {
                    res.status(404).json({ success: false, error: "No sheep found" });
                    return;
                }

                // Renvoyez les détails des sheep
                res.status(200).json({ success: true, sheep });
            } catch (error) {
                res.status(500).json({ success: false, error: "An error occurred while retrieving the sheep" });
            }
        });
    }
};
