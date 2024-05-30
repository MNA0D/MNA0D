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
import Toast from '../../../../mongo/models/toast';

export default {
    handle: "/create-toast",
    method: "POST",
    description: "Toast create route",
    route: async (req: Request, res: Response) => {
        try {
            if (!res.locals.auth || !res.locals.auth.cookie.auth) return res.status(401).json({ success: false, message: 'No token provided' });
            if (!res.locals.auth.user) return res.status(404).json({ success: false, error: "User not found" });
            if (!res.locals.auth.user.admin) return res.status(403).json({ success: false, error: "Admin access required" });

            const { type, title, message, background } = req.body;
            console.log(req.body);

            if (!type || !title || !message || !background) return res.status(400).json({ success: false, error: "All toast details must be provided" });


            // Créez un nouveau toast
            const newToast = new Toast({
                type,
                title,
                message,
                background,
                date: new Date() // Ajoutez la date actuelle
            });

            await newToast.save();

            res.status(200).json({ success: true, toast: newToast });
        } catch (error) {
            res.status(500).json({ success: false, error: "An error occurred while creating the toast" });
        }
    }
};
