import mongoose from 'mongoose';

const schema = mongoose.Schema;

const healthIndexSchema = new schema({
	age: {
		type: Number,
		require: true,
	},
	steps: {
		type: Number,
		require: false,
	},
	water: {
		type: Number,
		require: false,
	},
	bmi: {
		type: Number,
		require: false,
	},
	hrv: {
		type: Number,
		require: false,
	},
	index: {
		type: Number,
		require: true,
	},
});

const HealthIndexModel = mongoose.model('healthIndex', healthIndexSchema);
export { HealthIndexModel };
