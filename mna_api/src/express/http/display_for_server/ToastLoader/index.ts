import { Request, Response } from 'express';
import Toast from '../../../../mongo/models/toast';

export default {
    handle: "/toast",
    method: "GET",
    description: "Toast loader route for general users",
    route: async (req: Request, res: Response) => {
        try {
            if (!res.locals.auth || !res.locals.auth.cookie.auth) return res.status(401).json({ success: false, message: 'No token provided' });
            if (!res.locals.auth.user) return res.status(404).json({ success: false, error: "User not found" });

            // Récupérez tous les toasts
            const toasts = await Toast.find().catch(() => null);
            if (!toasts) return res.status(404).json({ success: false, error: "No toasts found" });

            res.status(200).json({ success: true, toasts });
        } catch (error) {
            res.status(500).json({ success: false, error: "An error occurred while loading toasts" });
        }
    }
};