import { Request, Response } from 'express';

export default {
    handle: "/hello",
    method: "GET",
    description: "Root route",
    route: (req: Request, res: Response) => {
        res.send('Hello world!');
    }
};
