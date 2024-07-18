import mongoose, { Types } from "mongoose";

const MeasurementSchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ["volume", "weight", "count", "miscellaneous", "specialized"],
  },
});

export default mongoose.model("Measurements", MeasurementSchema);
