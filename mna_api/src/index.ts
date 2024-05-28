import api from './express';

async function main() {
    await api.run();
}

main().catch(err => {
    console.error('[╳] - Failed to start server:', err);
});
