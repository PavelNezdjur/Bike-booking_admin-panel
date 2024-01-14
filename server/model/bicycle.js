import mongoose from "mongoose";

const BicycleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  color: { type: String, required: true },
  wheel_size: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  _id: { type: String },
  status: { type: String, default: "Available" },
});

export default mongoose.model("Bicycle", BicycleSchema);
