import { Request, Response } from 'express';

export default {
    handle: "/user-create",
    method: "POST",
    description: "User create route",
    route: (req: Request, res: Response) => {
        res.json("coucou")
    }
};
