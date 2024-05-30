import { Request, Response } from 'express';
import User from '../../../../mongo/models/user';
import bcrypt from 'bcrypt';

export default {
    handle: "/update-user",
    method: "PUT",
    description: "User modify route",
    route: async (req: Request, res: Response) => {
        try {
            if (!res.locals.auth || !res.locals.auth.cookie.auth) return res.status(401).json({ success: false, message: 'No token provided' });
            if (!res.locals.auth.user) return res.status(404).json({ success: false, error: "User not found" });

            const { userId, newUserDetails }: { userId: string, newUserDetails: any } = req.body;

            // Vérifiez si l'utilisateur à modifier existe
            const userToModify = await User.findById(userId).catch(() => null);
            if (!userToModify) return res.status(404).json({ success: false, error: "User to modify not found" });

            // Vérifiez si l'utilisateur est admin ou s'il est lui-même
            if (!res.locals.auth.user.admin && res.locals.auth.user._id !== userId) {
                return res.status(403).json({ success: false, error: "Permission denied" });
            }

            // Mettre à jour les détails de l'utilisateur
            if (newUserDetails.password) newUserDetails.password = await bcrypt.hash(newUserDetails.password, 10);
            delete newUserDetails._id;
            delete newUserDetails.__v;

            Object.assign(userToModify, newUserDetails);
            await userToModify.save();

            res.status(200).json({ success: true, user: userToModify });
        } catch (error) {
            res.status(500).json({ success: false, error: "An error occurred while modifying the user" });
        }
    }
};
