import mongoose from 'mongoose';
import { Service } from 'typedi';

const User = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            index: true,
        },
        country: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

class UserModel {
    getModel() {
        return mongoose.model('user', User);
    }
}

export default UserModel;
