import { Request, Response } from 'express';

export default {
    handle: "/clipboard",
    method: "POST",
    description: "Clipboard route",
    route: (req: Request, res: Response) => {//=> besoin d'un id sheep
        res.json("coucou")
    }
};
