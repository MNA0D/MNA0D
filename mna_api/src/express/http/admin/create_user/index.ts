import { Request, Response } from 'express';
import User from '../../../../mongo/models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const SECRET_KEY = process.env.JWT_SECRET!;

export default {
    handle: "/user-create",
    method: "POST",
    description: "User create route",
    route: async (req: Request, res: Response) => {

        try {
            const authHeader = req.headers['authorization'];
            const { user, mail }: { user: string; mail: string } = req.body;

            if (!authHeader) {
                return res.status(401).json({ success: false, message: 'No token provided' });
            }

            // Séparez les deux tokens
            const tokens = authHeader.split(' ')[1].split(',');

            if (tokens.length !== 2) {
                return res.status(401).json({ success: false, message: 'Invalid token format' });
            }

            const [token, sessionid] = tokens;

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

                // Vérifiez si l'utilisateur ou l'email existe déjà
                const existingUser = await User.findOne({ $or: [{ user }, { mail }] }).catch((err) => {
                    return null;
                }
                );

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

                // Si l'utilisateur est admin, continuer le traitement
                res.status(200).json({ success: true, user: newUser, plainPassword: password });

            });

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