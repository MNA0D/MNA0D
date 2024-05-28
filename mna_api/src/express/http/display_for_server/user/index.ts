import { Request, Response } from 'express';

export default {
    handle: "/user",
    method: "POST",
    description: "Toast loader route",
    route: (req: Request, res: Response) => {//besoin d'un id pour show le user
        res.json("coucou")
    }
};
