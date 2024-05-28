import { Request, Response } from 'express';
import User from '../../../../mongo/models/user';
import Toast from '../../../../mongo/models/toast';

export default {
    handle: "/toast",
    method: "POST",
    description: "Toast loader route for general users",
    route: async (req: Request, res: Response) => {
        const { userId }: { userId: string } = req.body;

        try {
            // Vérifiez si l'utilisateur existe
            const user = await User.findById(userId);
            if (!user) {
                res.status(404).json({ success: false, error: "User not found" });
                return;
            }

            // Récupérez tous les toasts
            const toasts = await Toast.find();

            res.status(200).json({ success: true, toasts });
        } catch (error) {
            res.status(500).json({ success: false, error: "An error occurred while loading toasts" });
        }
    }
};

/*
Exemple de requête:
{
    "userId": "60b8d6c8f8d2b5416c0a4b3c"
}
*/
