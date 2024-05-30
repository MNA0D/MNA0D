import { Request, Response } from 'express';
import User from '../../../../mongo/models/user';

export default {
    handle: "/all-users",
    method: "GET",
    description: "Route to get all users informations for admin",
    route: async (req: Request, res: Response) => {
        try {
            if (!res.locals.auth || !res.locals.auth.cookie.auth) return res.status(401).json({ success: false, message: 'No token provided' });
            if (!res.locals.auth.user) return res.status(404).json({ success: false, error: "User not found" });

            // Récupérer tous les utilisateurs
            const users = await User.find().catch(() => null);
            if (!users) return res.status(404).json({ success: false, error: "No users found" });

            // Renvoyez les détails des sheep
            res.status(200).json({ success: true, users });
        } catch (error) {
            res.status(500).json({ success: false, error: "An error occurred while retrieving the sheep" });
        }
    }
};
