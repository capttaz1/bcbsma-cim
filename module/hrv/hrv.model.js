import mongoose from "mongoose";

const schema = mongoose.Schema;

const hrvSchema = new schema({
  date: {
    type: Date,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const HRVModel = mongoose.model("hrv", hrvSchema);
export { HRVModel };
