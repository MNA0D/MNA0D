import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for the Toast document
interface IToast extends Document {
    type: string;
    title: string;
    message: string;
    background: string;
    date: Date;
}

// Main schema definition for Toast
const toastSchema: Schema = new Schema({
    type: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    background: { type: String, required: true },
    date: { type: Date, required: true },
});

// Model definition for Toast
const Toast: Model<IToast> = mongoose.model<IToast>('Toast', toastSchema);

export default Toast;
