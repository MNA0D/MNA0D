import { Request, Response } from 'express';

export default {
    handle: "/toast-create",
    method: "POST",
    description: "Toast create route",
    route: (req: Request, res: Response) => {
        res.json("coucou")
    }
};
