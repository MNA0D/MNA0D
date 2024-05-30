import { Request, Response } from 'express';

export default {
    handle: "/authguard-admin",
    method: "POST",
    description: "Admin authentication guard route",
    route: async (req: Request, res: Response) => {
        try {
            if (!res.locals.auth || !res.locals.auth.cookie.auth) return res.status(401).json({ success: false, message: 'No token provided' });
            if (!res.locals.auth.user) return res.status(404).json({ success: false, error: "User not found" });
            if (!res.locals.auth.user.admin) return res.status(403).json({ success: false, error: "Admin access required" });

            // Si l'utilisateur est admin, continuer le traitement
            res.status(200).json({ success: true, message: "Admin access granted" });
        } catch (error) {
            res.status(500).json({ success: false, error: "An error occurred while checking admin status" });
        }
    }
};
