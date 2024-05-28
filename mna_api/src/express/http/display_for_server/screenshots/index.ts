import { Request, Response } from 'express';

export default {
    handle: "/screenshots",
    method: "POST",
    description: "Screenshots route",
    route: (req: Request, res: Response) => {//=> besoin d'un id sheep
        res.json("coucou")
    }
};
