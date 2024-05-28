import { Request, Response } from 'express';

export default {
    handle: "/ipchanger",
    method: "POST",
    description: "Change ip route for the flock of sheep ⚠️ this route removes everything, be careful, it is not possible to go back ⚠️",
    route: (req: Request, res: Response) => {
        res.json("coucou")
    }
};
