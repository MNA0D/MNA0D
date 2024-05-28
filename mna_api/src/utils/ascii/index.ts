import * as fs from 'fs';
import * as readline from 'readline';
import clc from 'cli-color';

const filePath = __dirname + '/ascii.txt';

export const front_api = async () => {

    async function readAndPrintFile(filePath: string): Promise<void> {
        try {
            const fileStream = fs.createReadStream(filePath);
            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity,
            });

            for await (const line of rl) {
                console.log(clc.red(line));
            }
        } catch (error) {
            console.error(`[╳] - Error reading file: ${error}`);
        }
    }

    await readAndPrintFile(filePath);
};
export default { front_api };