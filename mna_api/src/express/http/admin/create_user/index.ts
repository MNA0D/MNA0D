import { Request, Response } from 'express';
import User from '../../../../mongo/models/user';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export default {
    handle: "/create-user",
    method: "POST",
    description: "User create route",
    route: async (req: Request, res: Response) => {
        try {
            if (!res.locals.auth || !res.locals.auth.cookie.auth) return res.status(401).json({ success: false, message: 'No token provided' });
            if (!res.locals.auth.user) return res.status(404).json({ success: false, error: "User not found" });
            if (!res.locals.auth.user.admin) return res.status(403).json({ success: false, error: "Admin access required" });

            const defaultAdminUser = uuidv4();
            const plainPassword = uuidv4();
            const hashedPassword = await bcrypt.hash(plainPassword, 10);

            const newUser = new User({
                user: defaultAdminUser,
                password: hashedPassword,
                mail: `${defaultAdminUser}@example.com`,
                admin: false
            });

            await newUser.save();

            // Si l'utilisateur est admin, continuer le traitement
            res.status(200).json({ success: true, message: 'User created', newUser, plainPassword });
        } catch (error) {
            res.status(500).json({ success: false, error: "An error occurred while creating the user" });
        }

    }
};
/*
{
    "user": "newuser",
    "password": "securepassword",
    "mail": "newuser@example.com"
}
*/