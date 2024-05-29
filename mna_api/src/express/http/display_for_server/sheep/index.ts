
/*
Region: 
    'North America': [40.7128, -74.0060], // New York
    'South America': [-23.5505, -46.6333], // São Paulo
    'Europe': [48.8566, 2.3522], // Paris
    'Asia': [35.6895, 139.6917], // Tokyo
    'Africa': [-1.2921, 36.8219], // Nairobi
    'Australia': [-33.8688, 151.2093], // Sydney
    'Antarctica': [-75.250973, -0.071389], // Antarctica
    'Central America': [9.9281, -84.0907], // San José
    'Middle East': [24.7136, 46.6753], // Riyadh
    'Caribbean': [18.1096, -77.2975], // Kingston
*/
import { Request, Response } from 'express';
import Sheep from '../../../../mongo/models/sheep';
import User from '../../../../mongo/models/user';

export default {
    handle: "/sheep-view",
    method: "GET",
    description: "Sheep view route",
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

            // Renvoyez les détails du Sheep
            res.status(200).json({ success: true, sheep });
        } catch (error) {
            res.status(500).json({ success: false, error: "An error occurred while retrieving the sheep" });
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
