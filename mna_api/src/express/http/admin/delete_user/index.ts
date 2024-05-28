import { Request, Response } from 'express';
import User from '../../../../mongo/models/user';

export default {
    handle: "/user-delete",
    method: "DELETE",
    description: "Delete user route",
    route: async (req: Request, res: Response) => {
        const { user, mail, id }: { user?: string; mail?: string; id: string } = req.body;

        try {
            // Vérifiez si l'utilisateur admin existe et est admin

            const admin = await User.findOne({ _id: id, admin: true });
            if (!admin) {
                res.status(403).json({ success: false, error: "Unauthorized: Admin privileges required" });
                return;
            }

            // Vérifiez si l'utilisateur à supprimer existe
            const existingUser = await User.findOne({ $or: [{ user }, { mail }] });
            if (!existingUser) {
                res.status(404).json({ success: false, error: "User not found" });
                return;
            }

            // Supprimer l'utilisateur
            await User.deleteOne({ _id: existingUser._id });

            res.status(200).json({ success: true, message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ success: false, error: "An error occurred while deleting the user" });
        }
    }
};

/*
{
    "id":"66565c60dbed6a0ebc0d618c",
    "user": "newuser",
    "password": "securepassword",
    "mail": "newuser@example.com"
}
*/