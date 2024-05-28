import { Request, Response } from 'express';

export default {
    handle: "/sheep",
    method: "POST",
    description: "🐑 Sheep route",
    route: (req: Request, res: Response) => {//=> besoin d'un id sheep
        res.json("coucou")
    }
};
