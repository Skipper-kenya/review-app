import reviewsModel from "../models/reviews.js";

export const getReviews = async (req, res) => {
  try {
    const reviews = await reviewsModel.find({}).sort({ createdAt: -1 });
    res.send({ success: true, allReviews: reviews });
  } catch (error) {
    console.log(error.message);
    res.send({ success: false });
  }
};
