import mongoose from "mongoose";

const DifficultyLevelSchema =new mongoose.Schema(
  {
    level: {
      type: String,
      required: [true, "Level of Difficuilty is a Required Field"],
    },
  },
  {
    timestamps: true,
  }
);

const DifficultyLevelModel = mongoose.model(
  "DifficultyLevel",
  DifficultyLevelSchema
);

export default DifficultyLevelModel;
