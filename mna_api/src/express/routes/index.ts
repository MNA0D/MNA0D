import { Router } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';

const router = Router();

const loadRoutes = async (dir: string): Promise<void> => {
  const files = readdirSync(dir);
  for (const file of files) {
    const fullPath = join(dir, file);
    if (file.endsWith('.ts') || file.endsWith('.js')) {
      const routeConfig = await import(fullPath);
      const { handle, method, route, description } = routeConfig.default;
      if (handle && method && route) {
        if (typeof (router as any)[method.toLowerCase()] === 'function') {
          (router as any)[method.toLowerCase()](handle, route);
          console.log(`\n[✓] - Route loaded: ${description} on ${handle} [${method.toUpperCase()}] method \n ↳ ${fullPath}`);
        } else {
          console.error(`[╳] - Route config is missing required properties in file ${file} \n ↳ ${fullPath}`);
        }
      } else {
        console.error(`[╳] - Unsupported method ${method} in file ${file} \n ↳ ${fullPath}`);
      }
    } else if (readdirSync(fullPath).length > 0) {
      await loadRoutes(fullPath);
    }
  }
};

const initializeRoutes = async () => {
  console.log(`
--------------------------------------------------
[📂] - Initializing routes...
--------------------------------------------------\n`)

  await loadRoutes(join(__dirname, '../http'));
};

export { router, initializeRoutes };