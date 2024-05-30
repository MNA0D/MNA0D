import { Request, Response, NextFunction } from 'express';

const responseTimeMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const startTime = process.hrtime();
    res.locals.startTime = startTime;
    next();
};

export default responseTimeMiddleware;
