import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../../../mongo/models/user';
import clc from 'cli-color';

const SECRET_KEY = process.env.JWT_SECRET!;

export default {
    handle: "/login",
    method: "POST",
    description: "Login route",
    route: async (req: Request, res: Response) => {
        const { mailOrUsername, password }: { mailOrUsername: string; password: string } = req.body;

        try {
            // Vérifiez si l'utilisateur existe par email ou username
            const user = await User.findOne({
                $or: [{ mail: mailOrUsername }, { user: mailOrUsername }]
            });

            if (!user) {
                return res.status(404).json({ success: false, error: "Erreur de connexion" });
            }

            // Vérifiez le mot de passe
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ success: false, error: "Invalid password" });
            }

            // Créez le token JWT
            const token = jwt.sign(
                { id: user._id, mail: user.mail, admin: user.admin },
                SECRET_KEY,
                { expiresIn: '1d' }
            );



            console.log(`\n ${clc.yellowBright(`[🔐] - User ${user.mail} logged in`)}`);

            // Répondez avec succès et les tokens
            res.status(200).json({
                success: true,
                token,
                id: user._id
            });
        } catch (error) {
            res.status(500).json({ success: false, error: "An error occurred while logging in" });
        }
    }
};
