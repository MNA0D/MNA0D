import { Request, Response } from 'express';

export default {
    handle: "/user-modify",
    method: "POST",
    description: "User modify route",
    route: (req: Request, res: Response) => {//=> besoin d'un id user
        res.json("coucou")
    }
};
