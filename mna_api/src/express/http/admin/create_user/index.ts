import { Request, Response } from 'express';
import User from '../../../../mongo/models/user'; // Assurez-vous que le chemin vers votre modèle est correct
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export default {
    handle: "/user-create",
    method: "POST",
    description: "User create route",
    route: async (req: Request, res: Response) => {
        const { user, mail }: { user: string; mail: string } = req.body;
        const adminId: string = req.body.id;

        try {
            // Vérifiez si l'utilisateur admin existe et est admin
            const adminUser = await User.findById(adminId);
            if (!adminUser || !adminUser.admin) {
                res.status(403).json({ success: false, error: "Unauthorized: Admin privileges required" });
                return;
            }

            // Vérifiez si l'utilisateur ou l'email existe déjà
            const existingUser = await User.findOne({ $or: [{ user }, { mail }] });
            if (existingUser) {
                res.status(403).json({ success: false, error: "User or email already exists" });
                return;
            }

            // Générer un mot de passe aléatoire
            const password = uuidv4();
            const hashedPassword = await bcrypt.hash(password, 10);

            // Créez un nouvel utilisateur
            const newUser = new User({ user, password: hashedPassword, mail, admin: false });
            await newUser.save();

            res.status(200).json({ success: true, user: newUser, plainPassword: password });
        } catch (error) {
            res.status(500).json({ success: false, error: "An error occurred while creating the user" });
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