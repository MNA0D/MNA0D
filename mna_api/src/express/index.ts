import express from 'express';
import { router, initializeRoutes } from './routes';

import responseTimeMiddleware from './middleware/responseTime';

const run = async () => {
    const app = express();
    const port = 3000;

    app.use(express.json());

    app.use(responseTimeMiddleware);

    try {
        await initializeRoutes();
    } catch (err) {
        console.error('[╳] - Error initializing routes:', err);
        process.exit(1);
    }

    app.use('/', router);

    app.listen(port, () => {
        console.log(`
--------------------------------------------------
[🚀] - Server is running at http://localhost:${port}
--------------------------------------------------`);
    });
};

export default { run };
