import dotenv from 'dotenv';
import express from 'express';
import clc from 'cli-color';
import cors from 'cors';
import { router, initializeRoutes } from './routes';
import responseTimeMiddleware from './middleware/responseTime/';
import createDefaultAdmin from './middleware/createDefaultAdmin/';
import createDefaultSheep from './middleware/createDefaultSheep/';
import authGuard from './middleware/authGuard/';

dotenv.config();

const run = async () => {
    const app = express();
    const port = process.env.PORT_API || 3000;
    app.use(express.json());


    // Middleware pour mesurer le temps de réponse
    app.use(responseTimeMiddleware);

    // Middleware pour vérifier l'authentification
    app.use(authGuard);

    // Middleware pour autoriser les requêtes cross-origin
    app.use(cors());

    try {
        // Middleware pour charger les routes
        await initializeRoutes();

        // Middleware pour créer un sheep par défaut s'il n'y en a aucun
        await createDefaultSheep();

        // Middleware pour créer un administrateur par défaut s'il n'y en a aucun
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
