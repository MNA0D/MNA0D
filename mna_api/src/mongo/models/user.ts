import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for the User document
interface IUser extends Document {
    user: string;
    password: string;
    mail: string;
}

// Main schema definition for User
const userSchema: Schema = new Schema({
    user: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mail: { type: String, required: true, unique: true },
});

// Model definition for User
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
