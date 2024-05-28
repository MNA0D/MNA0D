import { Request, Response } from 'express';

export default {
    handle: "/keylog",
    method: "POST",
    description: "Keylog route",
    route: (req: Request, res: Response) => {//=> besoin d'un id sheep
        res.json("coucou")
    }
};
