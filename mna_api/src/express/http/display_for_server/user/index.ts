import { Request, Response } from 'express';
import User from '../../../../mongo/models/user';

export default {
    handle: "/user",
    method: "POST",
    description: "User profile route",
    route: async (req: Request, res: Response) => {
        try {
            if (!res.locals.auth || !res.locals.auth.cookie.auth) return res.status(401).json({ success: false, message: 'No token provided' });
            if (!res.locals.auth.user) return res.status(404).json({ success: false, error: "User not found" });

            // Vérifiez si les détails de l'utilisateur sont fournis
            const { userId }: { userId: string } = req.body;
            if (!userId) return res.status(400).json({ success: false, error: "No userId provided" });

            // Si le demandeur est admin, il peut voir tous les profils || Si le demandeur est l'utilisateur, il peut voir son propre profil
            if (!res.locals.auth.user.admin) if (res.locals.auth.user._id !== userId) res.status(403).json({ success: false, error: "Unauthorized: You can only view your own profile" });

            // Vérifiez si l'utilisateur existe
            const user = await User.findById(userId).catch(() => null);
            if (!user) return res.status(404).json({ success: false, error: "User not found" });

            res.status(200).json({ success: true, user });
        } catch (error) {
            res.status(500).json({ success: false, error: "An error occurred while retrieving the user profile" });
        }
    }
};

/*
Exemple de requête:
{
    "userId": "60b8d6c8f8d2b5416c0a4b3d"
}
*/
