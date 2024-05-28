import api from './express';
import database from './mongo';

async function main() {
    await database.run();
    await api.run();
}

main().catch(err => {
    console.error('[╳] - Failed to start server:', err);
});
