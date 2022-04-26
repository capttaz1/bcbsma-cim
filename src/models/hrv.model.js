import mongoose from 'mongoose';

const HRV = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: [true, 'Please enter the date of this HRV entry'],
            index: true,
        },
        value: {
            type: Number,
            required: [true, 'Please enter the value for HRV'],
        },
    },
    { timestamps: true },
);

export default mongoose.model('HRV', HRV);
