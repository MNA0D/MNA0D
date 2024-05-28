import { Request, Response } from 'express';

export default {
  handle: "/ping",
  method: "GET",
  description: "Ping route",
  route: (req: Request, res: Response) => {
    const endTime = process.hrtime(res.locals.startTime);
    const responseTimeInMs = (endTime[0] * 1000 + endTime[1] / 1e6).toFixed(3);
    res.json({
      message: 'pong',
      response_time: `${responseTimeInMs} ms`
    });
  }
};
