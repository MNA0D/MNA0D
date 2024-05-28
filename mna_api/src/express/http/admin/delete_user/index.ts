import { Request, Response } from 'express';

export default {
    handle: "/user-delete",
    method: "POST",
    description: "Delete user route",
    route: (req: Request, res: Response) => {//=> besoin d'un id user
        res.json("coucou")
    }
};
