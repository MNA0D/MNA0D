import { Request, Response } from 'express';
import Sheep from '../../../../mongo/models/sheep';

export default {
    handle: "/flock-of-sheep",
    method: "GET",
    description: "Route to get all sheep data",
    route: async (req: Request, res: Response) => {
        try {
            if (!res.locals.auth || !res.locals.auth.cookie.auth) return res.status(401).json({ success: false, message: 'No token provided' });
            if (!res.locals.auth.user) return res.status(404).json({ success: false, error: "User not found" });

            // Récupérez tous les sheep
            const sheep = await Sheep.find().catch(() => null);
            if (!sheep) return res.status(404).json({ success: false, error: "No sheep found" });

            // Renvoyez les détails des sheep
            res.status(200).json({ success: true, sheep });

        } catch (error) {
            res.status(500).json({ success: false, error: "An error occurred while retrieving the sheep" });
        }
    }
};
