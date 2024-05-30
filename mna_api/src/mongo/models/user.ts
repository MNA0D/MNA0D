import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for the User document
interface IUser extends Document {
    user: string;
    password: string;
    mail: string;
    admin: boolean;
}

// Main schema definition for User
const userSchema: Schema = new Schema({
    user: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mail: { type: String, required: true, unique: true },
    admin: { type: Boolean, default: false }
});

// Middleware pre-save to ensure only one admin user exists
// userSchema.pre<IUser>('save', async function (next) {
//     const user = this;

//     if (user.admin) {
//         const existingAdmin = await User.findOne({ admin: true }) as IUser;

//         if (existingAdmin && existingAdmin !== user) {
//             const err = new Error('Only one admin user is allowed');
//             return next(err);
//         }
//     }

//     next();
// });

// Model definition for User
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
