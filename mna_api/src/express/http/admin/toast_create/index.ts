/*
Liste background-color :

.bg-primary
.bg-secondary
.bg-success
.bg-danger
.bg-warning
.bg-info
.bg-light
.bg-dark
.bg-body
.bg-white
.bg-transparent

LIste background-gradient-color :

.bg-primary.bg-gradient
.bg-secondary.bg-gradient
.bg-success.bg-gradient
.bg-danger.bg-gradient
.bg-warning.bg-gradient
.bg-info.bg-gradient
.bg-light.bg-gradient
.bg-dark.bg-gradient

Liste type :

Action => Avec deux boutons (ignoré et Confirmer)
Notification => Simple notification
Text => Simple texte
*/

import { Request, Response } from 'express';
import User from '../../../../mongo/models/user';
import Toast from '../../../../mongo/models/toast';
export default {
    handle: "/toast-create",
    method: "POST",
    description: "Toast create route",
    route: async (req: Request, res: Response) => {
        const { userId, toastDetails }: { userId: string; toastDetails: any } = req.body;

        try {
            // Vérifiez si l'utilisateur qui fait la demande existe et est admin
            const user = await User.findById(userId);
            if (!user || !user.admin) {
                res.status(403).json({ success: false, error: "Unauthorized: Admin privileges required" });
                return;
            }

            // Créez un nouveau toast
            const newToast = new Toast({
                ...toastDetails,
                date: new Date(toastDetails.date) // Assurez-vous que la date est bien formatée
            });

            await newToast.save();

            res.status(200).json({ success: true, toast: newToast });
        } catch (error) {
            res.status(500).json({ success: false, error: "An error occurred while creating the toast" });
        }
    }
};
/*
Exemple de requête:
{
    "userId": "66565c60dbed6a0ebc0d618c",
    "toastDetails": {
        "id": "1",
        "type": "action",
        "title": "Simple Text",
        "message": "Simple Text Toast",
        "background": "bg-light",
        "date": "2025-05-27T08:30:00Z"
    }
}
*/
