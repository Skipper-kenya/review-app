import { ObjectId } from "mongodb";
import reviewsModel from "../models/reviews.js";

const addReviewController = async (req, res) => {
  const { userId, title, review } = req.body;

  try {
    const newReview = new reviewsModel({
      title,
      review,
      reviewOwner: new ObjectId(userId.userId),
    });

    await newReview.save();

    const reviews = await reviewsModel.find({}).sort({ createdAt: -1 });

    return res.send({ success: true, message: "review added", reviews });
  } catch (error) {
    console.log(error.message);
  }
};

export default addReviewController;
