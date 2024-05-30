import { Request, Response } from 'express';

export default {
    handle: "/panic",
    method: "POST",
    description: "Panic route ⚠️ this route removes everything, be careful, it is not possible to go back ⚠️",
    route: (req: Request, res: Response) => {//=> besoin d'un id user
        res.json("coucou")
    }
};
