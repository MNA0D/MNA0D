import { Request, Response } from 'express';
import User from '../../../../mongo/models/user'; // Assurez-vous que le chemin vers votre modèle est correct
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export default {
    handle: "/user-modify",
    method: "POST",
    description: "User modify route",
    route: async (req: Request, res: Response) => {
        const { userId, newUserDetails }: { userId: string; newUserDetails: any } = req.body;
        const requesterId: string = req.body.requesterId;

        try {
            // Vérifiez si l'utilisateur qui fait la demande existe
            const requester = await User.findById(requesterId);
            if (!requester) {
                res.status(403).json({ success: false, error: "Unauthorized: Requester not found" });
                return;
            }

            // Vérifiez si l'utilisateur qui fait la demande est admin ou si c'est le même utilisateur que celui à modifier
            if (!requester.admin && requesterId !== userId) {
                res.status(403).json({ success: false, error: "Unauthorized: Admin privileges or ownership required" });
                return;
            }

            // Vérifiez si l'utilisateur à modifier existe
            const userToModify = await User.findById(userId);
            if (!userToModify) {
                res.status(404).json({ success: false, error: "User to modify not found" });
                return;
            }

            // Mettre à jour les détails de l'utilisateur
            if (newUserDetails.password) {
                newUserDetails.password = await bcrypt.hash(newUserDetails.password, 10);
            }

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
