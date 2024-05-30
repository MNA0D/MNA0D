import { Request, Response } from 'express';
import Sheep from '../../../../mongo/models/sheep';

export default {
    handle: "/sheep-screenshot",
    method: "POST",
    description: "Sheep screenshot route",
    route: async (req: Request, res: Response) => {
        try {
            const { _id, screenshot }: { _id: string; screenshot: { screenshotDate: Date; file: Buffer } } = req.body;
            if (!_id || !screenshot) return res.status(400).json({ success: false, error: "No _id or screenshot provided" });

            // Vérifiez si le Sheep existe
            const sheep = await Sheep.findById(_id);
            if (!sheep) return res.status(404).json({ success: false, error: "Sheep not found" });

            // Ajoutez la nouvelle capture d'écran
            sheep.screenshot.push(screenshot);
            sheep.lastActivity = new Date(); // Mettre à jour la dernière activité

            await sheep.save();

            res.status(200).json({ success: true, sheep: sheep._id });
        } catch (error) {
            res.status(500).json({ success: false, error: "An error occurred while adding the screenshot" });
        }
    }
};

/*
Exemple de requête:
{
    "_id": "60b8d6c8f8d2b5416c0a4b3c",
    "screenshot": {
        "screenshotDate": "2023-05-27T08:30:00Z",
        "file": "some binary data"
    }
}
*/
