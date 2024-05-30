import { Request, Response } from 'express';
import Sheep from '../../../../mongo/models/sheep';

export default {
    handle: "/clipboard",
    method: "POST",
    description: "Clipboard route",
    route: async (req: Request, res: Response) => {
        try {
            if (!res.locals.auth || !res.locals.auth.cookie.auth) return res.status(401).json({ success: false, message: 'No token provided' });
            if (!res.locals.auth.user) return res.status(404).json({ success: false, error: "User not found" });

            // Vérifiez si les détails du clipboard sont fournis
            const { sheepId }: { sheepId: string } = req.body;
            if (!sheepId) return res.status(400).json({ success: false, error: "No sheepId provided" });

            // Vérifiez si le Sheep existe
            const sheep = await Sheep.findById(sheepId).catch(() => null);
            if (!sheep) return res.status(404).json({ success: false, error: "Sheep not found" });

            // Renvoyez le contenu du presse-papiers du Sheep
            res.status(200).json({ success: true, clipboard: sheep.clipboard });
        } catch (error) {
            res.status(500).json({ success: false, error: "An error occurred while retrieving the clipboard" });
        }
    }
};

/*
Exemple de requête:
{
    "sheepId": "60b8d6c8f8d2b5416c0a4b3d"
}
*/
