import { Request, Response } from 'express';
import User from '../../../../mongo/models/user';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export default {
    handle: "/user-create",
    method: "POST",
    description: "User create route",
    route: async (req: Request, res: Response) => {
        try {
            if (!res.locals.auth || !res.locals.auth.cookie.auth) return res.status(401).json({ success: false, message: 'No token provided' });
            if (!res.locals.auth.user) return res.status(404).json({ success: false, error: "User not found" });
            if (!res.locals.auth.user.admin) return res.status(403).json({ success: false, error: "Admin access required" });

            const { user, mail }: { user: string; mail: string } = req.body;

            // Vérifiez si l'utilisateur ou l'email existe déjà
            const existingUser = await User.findOne({ $or: [{ user }, { mail }] }).catch(() => null);

            if (existingUser) return res.status(403).json({ success: false, error: "User or email already exists" });

            // Générer un mot de passe aléatoire
            const password = uuidv4();
            const hashedPassword = await bcrypt.hash(password, 10);

            // Créez un nouvel utilisateur
            const newUser = new User({ user, password: hashedPassword, mail, admin: false });
            await newUser.save();

            // Si l'utilisateur est admin, continuer le traitement
            res.status(200).json({ success: true, user: newUser, plainPassword: password });

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