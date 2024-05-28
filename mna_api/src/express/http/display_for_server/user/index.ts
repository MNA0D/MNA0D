import { Request, Response } from 'express';
import User from '../../../../mongo/models/user';

export default {
    handle: "/user",
    method: "POST",
    description: "User profile route",
    route: async (req: Request, res: Response) => {
        const { requesterId, userId }: { requesterId: string; userId: string } = req.body;

        try {
            // Vérifiez si le demandeur existe
            const requester = await User.findById(requesterId);
            if (!requester) {
                res.status(404).json({ success: false, error: "Requester not found" });
                return;
            }

            // Si le demandeur est admin, il peut voir tous les profils
            if (requester.admin) {
                const user = await User.findById(userId);
                if (!user) {
                    res.status(404).json({ success: false, error: "User not found" });
                    return;
                }
                res.status(200).json({ success: true, user });
                return;
            }

            // Si le demandeur n'est pas admin, il ne peut voir que son propre profil
            if (requesterId !== userId) {
                res.status(403).json({ success: false, error: "Unauthorized: You can only view your own profile" });
                return;
            }

            const user = await User.findById(userId);
            if (!user) {
                res.status(404).json({ success: false, error: "User not found" });
                return;
            }

            res.status(200).json({ success: true, user });
        } catch (error) {
            res.status(500).json({ success: false, error: "An error occurred while retrieving the user profile" });
        }
    }
};

/*
Exemple de requête:
{
    "requesterId": "60b8d6c8f8d2b5416c0a4b3c",
    "userId": "60b8d6c8f8d2b5416c0a4b3d"
}
*/
