import { Request, Response } from 'express';

export default {
    handle: "/sheep-screenshot",
    method: "POST",
    description: "Sheep screenshot route",
    route: (req: Request, res: Response) => {//=> Device name
        res.json("coucou")
    }
};
