import mongoose from "mongoose";

const schema = mongoose.Schema;

const stepSchema = new schema({
  date: {
    type: Date,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const StepModel = mongoose.model("step", stepSchema);
export { StepModel };
