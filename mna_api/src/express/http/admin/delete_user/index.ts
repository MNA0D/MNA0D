import { Request, Response } from 'express';
import User from '../../../../mongo/models/user';

export default {
    handle: "/user-delete",
    method: "DELETE",
    description: "Delete user route",
    route: async (req: Request, res: Response) => {

        try {
            if (!res.locals.auth || !res.locals.auth.cookie.auth) return res.status(401).json({ success: false, message: 'No token provided' });
            if (!res.locals.auth.user) return res.status(404).json({ success: false, error: "User not found" });
            if (!res.locals.auth.user.admin) return res.status(403).json({ success: false, error: "Admin access required" });

            // Vérifiez si l'utilisateur admin existe et est admin
            const { user, mail }: { user?: string; mail?: string } = req.body;

            // Vérifiez si l'utilisateur à supprimer existe
            const existingUser = await User.findOne({ $or: [{ user }, { mail }] }).catch(() => null);
            if (!existingUser) return res.status(404).json({ success: false, error: "User not found" });

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
    "userId":"66565c60dbed6a0ebc0d618c",
    "user": "newuser",
    "password": "securepassword",
    "mail": "newuser@example.com"
}
*/