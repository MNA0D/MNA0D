import { Request, Response, NextFunction } from 'express';
import User from '../../../mongo/models/user';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET!;

const authGuard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];

        res.locals.auth = {}; // Initialize res.locals.auth as an empty object

        if (!authHeader) {
            res.locals.auth.token = false;
            res.locals.auth.format = false;
            return next();
        }

        const tokens = authHeader.split(' ')[1].split(',');

        if (tokens.length !== 2) {
            res.locals.auth.format = false;
            return next();
        }

        res.locals.auth.format = true;

        const [token, sessionid] = tokens;
        res.locals.auth.cookie = {};
        res.locals.auth.cookie.auth = true;
        res.locals.auth.cookie.sessionid = sessionid;
        res.locals.auth.cookie.token = token;


        const decodedToken = await new Promise((resolve, reject) => {
            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                if (err) reject(err);
                else resolve(decoded);
            });
        });

        if (!decodedToken || typeof decodedToken !== 'object' || !('id' in decodedToken)) {
            res.locals.auth.token = false;
            return next();
        }

        res.locals.auth.token = true;

        const user = await User.findById(sessionid).catch(() => null);

        if (!user) {
            res.locals.auth.user = { auth: false };
            return next();
        }

        // Convert mongoose document to plain object and assign
        res.locals.auth.user = user.toObject();

        return next();
    } catch (err) {
        res.locals.auth.token = false;
        return next();
    }
};

export default authGuard;
