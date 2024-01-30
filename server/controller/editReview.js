import reviewsModel from "../models/reviews.js";

export const editReview = async (req, res) => {
  const { id, title, review } = req.body;

  const toBeUpdated = { title, review };

  try {
    const updatedReview = await reviewsModel.findOneAndUpdate(
      { _id: id },
      { $set: toBeUpdated },
      { new: true }
    );

    const updatedReviews = await reviewsModel.find({}).sort({ createdAt: -1 });

    return res.send({
      success: true,
      updatedReview,
      updatedReviews,
      message: "review updated",
    });
  } catch (error) {
    console.log(error.message);
  }
};
