import dotenv from 'dotenv';
import express from 'express';
import { router, initializeRoutes } from './routes';
import responseTimeMiddleware from './middleware/responseTime';
import createDefaultAdmin from './middleware/createDefaultAdmin/'; // Assurez-vous que le chemin vers votre middleware est correct
import clc from 'cli-color';

dotenv.config();

const run = async () => {
    const app = express();
    const port = process.env.PORT_API || 3000;
    app.use(express.json());

    // Middleware pour créer un administrateur par défaut s'il n'y en a aucun


    // Middleware pour mesurer le temps de réponse
    app.use(responseTimeMiddleware);

    try {
        await initializeRoutes();
        await createDefaultAdmin();
    } catch (err) {
        console.error('[╳] - Error initializing routes:', err);
        process.exit(1);
    }

    app.use('/', router);


    app.listen(port, () => {

        console.log(clc.greenBright(`
--------------------------------------------------
[🚀] - Server is running at http://localhost:${port}
--------------------------------------------------`));
    })
};

export default { run };
