import mongoose from 'mongoose';

const Step = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: [true, 'Please enter the date for these steps'],
            index: true,
        },

        value: {
            type: Number,
            required: [true, 'Please enter the number of steps'],
        },
    },
    { timestamps: true },
);

export default mongoose.model('Step', Step);
