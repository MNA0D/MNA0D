import { Request, Response } from 'express';
import User from '../../../../mongo/models/user';
import bcrypt from 'bcrypt';

export default {
    handle: "/user-modify",
    method: "POST",
    description: "User modify route",
    route: async (req: Request, res: Response) => {
        try {
            if (!res.locals.auth || !res.locals.auth.cookie.auth) return res.status(401).json({ success: false, message: 'No token provided' });
            if (!res.locals.auth.user) return res.status(404).json({ success: false, error: "User not found" });

            const { newUserDetails }: { newUserDetails: any } = req.body;

            // Vérifiez si l'utilisateur à modifier existe
            const userToModify = await User.findById(res.locals.auth.user._id).catch(() => null);
            if (!userToModify) return res.status(404).json({ success: false, error: "User to modify not found" });

            //Vérifiez si l'utilisateur est admin || Vérifiez si l'utilisateur à modifier
            if (!res.locals.auth.user.admin) if (!userToModify) return res.status(404).json({ success: false, error: "User to modify not found" });

            // Mettre à jour les détails de l'utilisateur
            if (newUserDetails.password) newUserDetails.password = await bcrypt.hash(newUserDetails.password, 10);

            Object.assign(userToModify, newUserDetails);
            await userToModify.save();

            res.status(200).json({ success: true, user: userToModify });
        } catch (error) {
            res.status(500).json({ success: false, error: "An error occurred while modifying the user" });
        }
    }
};
/*
{
    "requesterId": "66565c60dbed6a0ebc0d618c",
    "userId": "66565c60dbed6a0ebc0d618d",
    "newUserDetails": {
        "user": "modifieduser",
        "password": "newsecurepassword",
        "mail": "modifieduser@example.com"
    }
}
*/
