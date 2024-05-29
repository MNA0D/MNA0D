import { Request, Response } from 'express';
import User from '../../../../mongo/models/user';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET!;

export default {
    handle: "/user-delete",
    method: "DELETE",
    description: "Delete user route",
    route: async (req: Request, res: Response) => {

        try {
            // Vérifiez si l'utilisateur admin existe et est admin
            const { user, mail }: { user?: string; mail?: string } = req.body;

            if (!user && !mail) {
                res.status(400).json({ success: false, error: "No user or mail provided" });
                return;
            }

            const authHeader = req.headers['authorization'];

            if (!authHeader) {
                return res.status(401).json({ success: false, message: 'No token provided' });
            }

            // Séparez les deux tokens
            const tokens = authHeader.split(' ')[1].split(',');

            if (tokens.length !== 2) {
                return res.status(401).json({ success: false, message: 'Invalid token format' });
            }

            const [token, sessionid] = tokens;

            // Vérifiez le token principal
            jwt.verify(token, SECRET_KEY, async (err, decodedToken) => {
                if (err || !decodedToken || typeof decodedToken !== 'object' || !('id' in decodedToken)) {
                    return res.status(401).json({ success: false, message: 'Failed to authenticate token' });
                }

                const user = await User.findById(sessionid).catch((err) => {
                    return null;
                }
                );

                if (!user) {
                    return res.status(404).json({ success: false, error: "User not found" });
                }

                if (!user.admin) {
                    return res.status(403).json({ success: false, error: "Admin access required" });
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

            });

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