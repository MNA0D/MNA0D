import { Request, Response } from 'express';

export default {
    handle: "/toast",
    method: "POST",
    description: "Toast loader route",
    route: (req: Request, res: Response) => {
        res.json("coucou")
    }
};
