import dotenv from 'dotenv';
import mongoose from 'mongoose';
import ascii from '../utils/ascii/index'
dotenv.config();

const run = async () => {
    console.log(`
--------------------------------------------------
[🔒] - Try connecting to the database
--------------------------------------------------`);
    const client = await mongoose.connect(process.env.MONGODB_URI || '')
    await ascii.front_api();

    if (!client) throw new Error("[╳] - Error connecting to database");

    console.log(`
--------------------------------------------------
[🔑] - Connected to the database successfully
--------------------------------------------------`);
};

export default { run };
