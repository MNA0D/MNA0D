import { Request, Response } from 'express';

export default {
    handle: "/sheep",
    method: "POST",
    description: "Sheep route",
    route: (req: Request, res: Response) => {//=> Device name + update activity here
        res.json("coucou")
    }
};
