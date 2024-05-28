import dotenv from 'dotenv';
import mongoose from 'mongoose';
import ascii from '../utils/ascii/index'
import clc from 'cli-color';
dotenv.config();

const run = async () => {
    console.log(clc.greenBright(`
--------------------------------------------------
[🔒] - Try connecting to the database
--------------------------------------------------`));
    const client = await mongoose.connect(process.env.MONGODB_URI || '')
    await ascii.front_api();

    if (!client) throw new Error("[╳] - Error connecting to database");

    console.log(clc.greenBright(`
--------------------------------------------------
[🔑] - Connected to the database successfully
--------------------------------------------------`));
};

export default { run };
