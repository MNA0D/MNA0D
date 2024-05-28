import { Router } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';
import clc from 'cli-color';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT_API || 3000;
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
          console.log(`\n ${clc.green('[✓]')} ${clc.cyan('Route loaded')}: ${clc.magenta(files)} \n ${clc.green('↳')} ${clc.cyan('Description')} : ${clc.magenta(description)} \n ${clc.green('↳')} ${clc.cyan('Path')} : ${clc.magenta('http://localhost:' + PORT + handle)} \n ${clc.green('↳')} ${clc.cyan('Method')} : ${clc.magenta(method.toUpperCase())} \n ${clc.green('↳')} ${clc.cyan('On ')} : ${clc.blackBright(fullPath)}`);
        } else {
          console.error(`\n ${clc.bgRedBright.white.bold(`[╳] - Route config is missing required properties in file ${file} \n ↳ ${fullPath}`)}`);
        }
      } else {
        console.error(`\n ${clc.bgRedBright.white.bold(`[╳] - Unsupported method ${method} in file ${file} \n ↳ ${fullPath}`)}`);
      }
    } else if (readdirSync(fullPath).length > 0) {
      await loadRoutes(fullPath);
    }
  }
};

const initializeRoutes = async () => {
  console.log(clc.greenBright(`
--------------------------------------------------
[📂] - Initializing routes...
--------------------------------------------------\n`))

  await loadRoutes(join(__dirname, '../http'));
};

export { router, initializeRoutes };