import { Request, Response } from 'express';

export default {
    handle: "/sheep-ping",
    method: "POST",
    description: "Ping for the flock of sheep",
    route: (req: Request, res: Response) => {
        res.json("coucou")
    }
};
