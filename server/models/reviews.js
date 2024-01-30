import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    review: {
      type: Number,
      required: true,
    },
    reviewOwner: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
  },
  { timestamps: true }
);

const reviewsModel = mongoose.model("reviews", reviewsSchema);

export default reviewsModel;
